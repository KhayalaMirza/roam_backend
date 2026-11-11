import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request } from 'express';
import { map, Observable } from 'rxjs';

/** URL path under which `public/images/` is served (see setup.ts). */
export const IMAGES_PATH = '/images';

const SINGLE_KEYS = new Set(['imageUrl', 'coverImageUrl']);
const LIST_KEYS = new Set(['images']);

/**
 * The catalog stores bundled photos as relative paths (`/images/cities/cairo.jpg`) so the same data works on
 * localhost and in production. This turns them into absolute URLs in every JSON response, using
 * PUBLIC_BASE_URL or, if unset, the request's own scheme + host. External URLs are left untouched.
 */
@Injectable()
export class AssetUrlInterceptor implements NestInterceptor {
  constructor(private readonly publicBaseUrl: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') return next.handle();
    const req = context.switchToHttp().getRequest<Request>();
    const base = this.publicBaseUrl || `${req.protocol}://${req.get('host')}`;
    return next.handle().pipe(map((body) => absolutize(body, base)));
  }
}

const toAbsolute = (v: unknown, base: string) => (typeof v === 'string' && v.startsWith(`${IMAGES_PATH}/`) ? base + v : v);

export function absolutize<T>(value: T, base: string): T {
  if (Array.isArray(value)) return value.map((v) => absolutize(v, base)) as T;
  if (!value || typeof value !== 'object' || value instanceof Date) return value;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) {
    if (SINGLE_KEYS.has(k)) out[k] = toAbsolute(v, base);
    else if (LIST_KEYS.has(k) && Array.isArray(v)) out[k] = v.map((x) => toAbsolute(x, base));
    else out[k] = absolutize(v, base);
  }
  return out as T;
}
