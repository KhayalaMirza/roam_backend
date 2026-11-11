/**
 * Starter photos for the catalog. The files live in `public/images/` and are served by this API at
 * `/images/...`; the database stores the relative path and responses turn it into a full URL
 * (see common/asset-url.interceptor.ts). Sources and licences: public/images/CREDITS.md.
 * Operators can replace any of them with an external URL through the admin API (`imageUrl` / `images`).
 */

const img = (dir: 'countries' | 'cities' | 'tours' | 'places' | 'stays', id: string) => `/images/${dir}/${id}.jpg`;

/** Country hero image (by country id). */
export const COUNTRY_IMAGES: Record<string, string> = {
  'georgia': img('countries', 'georgia'), // Ananuri
  'turkey': img('countries', 'turkey'), // Göreme
  'italy': img('countries', 'italy'), // Cinque Terre
  'japan': img('countries', 'japan'), // Mount Fuji
  'indonesia': img('countries', 'indonesia'), // Mount Bromo
  'thailand': img('countries', 'thailand'), // Phi Phi Islands
  'uae': img('countries', 'uae'), // Burj Al Arab
  'jordan': img('countries', 'jordan'), // Dead Sea
  'egypt': img('countries', 'egypt'), // Giza pyramid complex
  'morocco': img('countries', 'morocco'), // Aït Benhaddou
  'kenya': img('countries', 'kenya'), // Mount Kenya
  'tanzania': img('countries', 'tanzania'), // Mount Kilimanjaro
};

/** City hero image (by city id). */
export const CITY_IMAGES: Record<string, string> = {
  'tbilisi': img('cities', 'tbilisi'), // Narikala
  'kazbegi': img('cities', 'kazbegi'), // Gergeti Trinity Church
  'batumi': img('cities', 'batumi'), // Ali and Nino (sculpture)
  'istanbul': img('cities', 'istanbul'), // Sultan Ahmed Mosque
  'cappadocia': img('cities', 'cappadocia'), // Cappadocia
  'antalya': img('cities', 'antalya'), // Kaleiçi
  'rome': img('cities', 'rome'), // Trevi Fountain
  'florence': img('cities', 'florence'), // Florence Cathedral
  'tokyo': img('cities', 'tokyo'), // Shibuya Crossing
  'kyoto': img('cities', 'kyoto'), // Fushimi Inari-taisha
  'osaka': img('cities', 'osaka'), // Osaka Castle
  'bali': img('cities', 'bali'), // Pura Ulun Danu Bratan
  'nusa-penida': img('cities', 'nusa-penida'), // Nusa Penida
  'bangkok': img('cities', 'bangkok'), // Grand Palace
  'phuket': img('cities', 'phuket'), // Patong
  'dubai': img('cities', 'dubai'), // Dubai Marina
  'abu-dhabi': img('cities', 'abu-dhabi'), // Sheikh Zayed Grand Mosque
  'amman': img('cities', 'amman'), // Amman Citadel
  'petra': img('cities', 'petra'), // Al-Khazneh
  'cairo': img('cities', 'cairo'), // Mosque of Muhammad Ali
  'luxor': img('cities', 'luxor'), // Karnak
  'hurghada': img('cities', 'hurghada'), // Hurghada
  'marrakech': img('cities', 'marrakech'), // Jemaa el-Fnaa
  'chefchaouen': img('cities', 'chefchaouen'), // Chefchaouen
  'nairobi': img('cities', 'nairobi'), // Nairobi National Park
  'maasai-mara': img('cities', 'maasai-mara'), // Maasai Mara
  'zanzibar': img('cities', 'zanzibar'), // Stone Town
  'arusha': img('cities', 'arusha'), // Mount Meru (Tanzania)
};

/** Tour cover image (by tour id); the tour gallery adds its cities’ images after it. */
export const TOUR_HERO_IMAGES: Record<string, string> = {
  'pyramids-nile-cruise': img('tours', 'pyramids-nile-cruise'), // Great Pyramid of Giza
  'red-sea-escape': img('tours', 'red-sea-escape'), // Giftun Islands
  'marrakech-sahara': img('tours', 'marrakech-sahara'), // High Atlas
  'blue-city-hikes': img('tours', 'blue-city-hikes'), // Rif
  'kenya-big-five': img('tours', 'kenya-big-five'), // Lake Nakuru
  'zanzibar-serengeti': img('tours', 'zanzibar-serengeti'), // Ngorongoro Conservation Area
  'tbilisi-kazbegi': img('tours', 'tbilisi-kazbegi'), // Mount Kazbek
  'batumi-weekend': img('tours', 'batumi-weekend'), // Batumi Botanical Garden
  'istanbul-cappadocia': img('tours', 'istanbul-cappadocia'), // Hagia Sophia
  'antalya-coast': img('tours', 'antalya-coast'), // Düden Waterfalls
  'roman-holiday': img('tours', 'roman-holiday'), // Colosseum
  'japan-golden-route': img('tours', 'japan-golden-route'), // Kinkaku-ji
  'bali-island-hopping': img('tours', 'bali-island-hopping'), // Tanah Lot
  'thailand-temples-beaches': img('tours', 'thailand-temples-beaches'), // Wat Arun
  'dubai-desert': img('tours', 'dubai-desert'), // Burj Khalifa
  'petra-wadi-rum': img('tours', 'petra-wadi-rum'), // Wadi Rum
};

/** Place photo (by place id). */
export const PLACE_IMAGES: Record<string, string> = {
  'narikala': img('places', 'narikala'),
  'abanotubani': img('places', 'abanotubani'),
  'dry-bridge-market': img('places', 'dry-bridge-market'),
  'georgian-national-museum': img('places', 'georgian-national-museum'),
  'mtatsminda': img('places', 'mtatsminda'),
  'gergeti-trinity': img('places', 'gergeti-trinity'),
  'gveleti-waterfall': img('places', 'gveleti-waterfall'),
  'jvari-pass': img('places', 'jvari-pass'),
  'kazbegi-horse': img('places', 'kazbegi-horse'),
  'batumi-boulevard': img('places', 'batumi-boulevard'),
  'batumi-botanical': img('places', 'batumi-botanical'),
  'batumi-beach': img('places', 'batumi-beach'),
  'hagia-sophia': img('places', 'hagia-sophia'),
  'topkapi': img('places', 'topkapi'),
  'grand-bazaar': img('places', 'grand-bazaar'),
  'bosphorus-cruise': img('places', 'bosphorus-cruise'),
  'balloon-ride': img('places', 'balloon-ride'),
  'goreme-open-air': img('places', 'goreme-open-air'),
  'red-valley': img('places', 'red-valley'),
  'kaleici': img('places', 'kaleici'),
  'duden-falls': img('places', 'duden-falls'),
  'konyaalti': img('places', 'konyaalti'),
  'colosseum': img('places', 'colosseum'),
  'vatican': img('places', 'vatican'),
  'trastevere': img('places', 'trastevere'),
  'uffizi': img('places', 'uffizi'),
  'piazzale-michelangelo': img('places', 'piazzale-michelangelo'),
  'senso-ji': img('places', 'senso-ji'),
  'shibuya': img('places', 'shibuya'),
  'tsukiji': img('places', 'tsukiji'),
  'teamlab': img('places', 'teamlab'),
  'fushimi-inari': img('places', 'fushimi-inari'),
  'arashiyama': img('places', 'arashiyama'),
  'kinkaku-ji': img('places', 'kinkaku-ji'),
  'dotonbori': img('places', 'dotonbori'),
  'osaka-castle': img('places', 'osaka-castle'),
  'tegallalang': img('places', 'tegallalang'),
  'uluwatu': img('places', 'uluwatu'),
  'seminyak-beach': img('places', 'seminyak-beach'),
  'mount-batur': img('places', 'mount-batur'),
  'kelingking': img('places', 'kelingking'),
  'manta-snorkel': img('places', 'manta-snorkel'),
  'grand-palace': img('places', 'grand-palace'),
  'chatuchak': img('places', 'chatuchak'),
  'phi-phi': img('places', 'phi-phi'),
  'old-phuket': img('places', 'old-phuket'),
  'burj-khalifa': img('places', 'burj-khalifa'),
  'desert-safari': img('places', 'desert-safari'),
  'gold-souk': img('places', 'gold-souk'),
  'grand-mosque': img('places', 'grand-mosque'),
  'louvre-ad': img('places', 'louvre-ad'),
  'amman-citadel': img('places', 'amman-citadel'),
  'rainbow-street': img('places', 'rainbow-street'),
  'petra-treasury': img('places', 'petra-treasury'),
  'monastery': img('places', 'monastery'),
  'giza': img('places', 'giza'),
  'egyptian-museum': img('places', 'egyptian-museum'),
  'khan-el-khalili': img('places', 'khan-el-khalili'),
  'old-cairo': img('places', 'old-cairo'),
  'camel-ride': img('places', 'camel-ride'),
  'karnak': img('places', 'karnak'),
  'valley-of-kings': img('places', 'valley-of-kings'),
  'felucca': img('places', 'felucca'),
  'giftun-island': img('places', 'giftun-island'),
  'hurghada-marina': img('places', 'hurghada-marina'),
  'jemaa-el-fnaa': img('places', 'jemaa-el-fnaa'),
  'majorelle': img('places', 'majorelle'),
  'atlas-day': img('places', 'atlas-day'),
  'blue-medina': img('places', 'blue-medina'),
  'akchour': img('places', 'akchour'),
  'giraffe-centre': img('places', 'giraffe-centre'),
  'nairobi-np': img('places', 'nairobi-np'),
  'mara-game-drive': img('places', 'mara-game-drive'),
  'maasai-village': img('places', 'maasai-village'),
  'stone-town': img('places', 'stone-town'),
  'spice-farm': img('places', 'spice-farm'),
  'nungwi': img('places', 'nungwi'),
  'ngorongoro': img('places', 'ngorongoro'),
};

/** Stay photo (by stay id). Hotel names are illustrative, so these show the hotel type/area, not a specific property. */
export const STAY_IMAGES: Record<string, string> = {
  'rooms-tbilisi': img('stays', 'rooms-tbilisi'),
  'kazbegi-lodge': img('stays', 'kazbegi-lodge'),
  'batumi-seaside': img('stays', 'batumi-seaside'),
  'sultanahmet-inn': img('stays', 'sultanahmet-inn'),
  'goreme-cave': img('stays', 'goreme-cave'),
  'antalya-resort': img('stays', 'antalya-resort'),
  'rome-centro': img('stays', 'rome-centro'),
  'florence-duomo': img('stays', 'florence-duomo'),
  'tokyo-shinjuku': img('stays', 'tokyo-shinjuku'),
  'kyoto-ryokan': img('stays', 'kyoto-ryokan'),
  'ubud-villa': img('stays', 'ubud-villa'),
  'penida-bungalow': img('stays', 'penida-bungalow'),
  'bangkok-riverside': img('stays', 'bangkok-riverside'),
  'phuket-kata': img('stays', 'phuket-kata'),
  'dubai-marina': img('stays', 'dubai-marina'),
  'abu-dhabi-corniche': img('stays', 'abu-dhabi-corniche'),
  'amman-downtown': img('stays', 'amman-downtown'),
  'petra-guesthouse': img('stays', 'petra-guesthouse'),
  'nile-view': img('stays', 'nile-view'),
  'luxor-winter': img('stays', 'luxor-winter'),
  'hurghada-reef': img('stays', 'hurghada-reef'),
  'marrakech-riad': img('stays', 'marrakech-riad'),
  'chefchaouen-riad': img('stays', 'chefchaouen-riad'),
  'nairobi-garden': img('stays', 'nairobi-garden'),
  'mara-camp': img('stays', 'mara-camp'),
  'zanzibar-beach': img('stays', 'zanzibar-beach'),
  'arusha-lodge': img('stays', 'arusha-lodge'),
};
