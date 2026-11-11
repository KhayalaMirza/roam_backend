import * as bcrypt from 'bcryptjs';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { loadConfig } from '../config/env';
import { cities, countries, exchangeRates, places, regions, stays, tourCities, tours, users } from './schema';
import * as schema from './schema';
import { CITIES, COUNTRIES, PLACES, REGIONS, STAYS, TOURS } from './seed-data';
import { CITY_IMAGES, COUNTRY_IMAGES, PLACE_IMAGES, STAY_IMAGES, TOUR_HERO_IMAGES } from './seed-images';

/** Idempotent: upserts the starter catalog; never touches user data except creating the admin. */
export async function seed(databaseUrl: string, opts: { adminEmail?: string; adminPassword?: string; log?: boolean } = {}) {
  const pool = new Pool({ connectionString: databaseUrl, max: 1 });
  const db = drizzle(pool, { schema });
  const log = (m: string) => opts.log !== false && console.log(m);
  try {
    await db.transaction(async (tx) => {
      for (const r of REGIONS) await tx.insert(regions).values(r).onConflictDoUpdate({ target: regions.id, set: r });
      for (const country of COUNTRIES) {
        const c = { ...country, imageUrl: COUNTRY_IMAGES[country.id] ?? null };
        await tx.insert(countries).values(c).onConflictDoUpdate({ target: countries.id, set: c });
      }
      for (const c of CITIES) {
        const [stay, food, transport, activities] = c.b;
        const v = {
          id: c.id,
          countryId: c.countryId,
          name: c.name,
          shortDescription: c.shortDescription,
          description: c.shortDescription,
          recommendedDays: c.recommendedDays,
          dailyBudgetAZN: stay + food + transport + activities,
          dailyBudgetBreakdown: { stay, food, transport, activities },
          transport: c.transport,
          lat: c.lat,
          lng: c.lng,
          imageUrl: CITY_IMAGES[c.id] ?? null,
        };
        await tx.insert(cities).values(v).onConflictDoUpdate({ target: cities.id, set: v });
      }
      for (const [id, cityId, name, category, durationHours, priceAZN, lat, lng] of PLACES) {
        const v = { id, cityId, name, category, durationHours, priceAZN, lat, lng, imageUrl: PLACE_IMAGES[id] ?? null };
        await tx.insert(places).values(v).onConflictDoUpdate({ target: places.id, set: v });
      }
      for (const [id, cityId, name, stars, pricePerNightAZN, lat, lng] of STAYS) {
        const v = { id, cityId, name, stars, pricePerNightAZN, lat, lng, kind: 'Hotel', imageUrl: STAY_IMAGES[id] ?? null };
        await tx.insert(stays).values(v).onConflictDoUpdate({ target: stays.id, set: v });
      }
      for (const t of TOURS) {
        const { cityIds, ...rest } = t;
        // Gallery: the tour's own cover first, then each of its cities' photos.
        const images = [...new Set([TOUR_HERO_IMAGES[t.id], ...cityIds.map((id) => CITY_IMAGES[id])].filter((u): u is string => !!u))];
        const v = { ...rest, images, childPriceAZN: rest.childPriceAZN ?? null, operatorName: rest.operatorName ?? null, updatedAt: new Date() };
        await tx.insert(tours).values(v).onConflictDoUpdate({ target: tours.id, set: v });
        await tx.delete(tourCities).where(sql`${tourCities.tourId} = ${t.id}`);
        await tx.insert(tourCities).values(cityIds.map((cityId, position) => ({ tourId: t.id, cityId, position })));
      }
      const [{ n }] = await tx.select({ n: sql<number>`count(*)`.mapWith(Number) }).from(exchangeRates);
      if (n === 0) await tx.insert(exchangeRates).values({ aznPerUsd: 1.7, aznPerEur: 1.98, source: 'seed', rateDate: new Date().toISOString().slice(0, 10) });
    });
    log(`Seeded ${REGIONS.length} regions, ${COUNTRIES.length} countries, ${CITIES.length} cities, ${PLACES.length} places, ${STAYS.length} stays, ${TOURS.length} tours`);

    if (opts.adminEmail && opts.adminPassword) {
      const hash = await bcrypt.hash(opts.adminPassword, 11);
      const email = opts.adminEmail.toLowerCase();
      const updated = await db.update(users).set({ role: 'admin', passwordHash: hash }).where(sql`lower(${users.email}) = ${email}`).returning({ id: users.id });
      if (!updated.length)
        await db.insert(users).values({ fullName: 'Roam Admin', email, passwordHash: hash, role: 'admin', termsAcceptedAt: new Date() });
      log(`Admin ready: ${opts.adminEmail}`);
    }
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  const cfg = loadConfig();
  seed(cfg.databaseUrl, { adminEmail: cfg.admin.email, adminPassword: cfg.admin.password }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
