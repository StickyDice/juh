import { deleteCookie, getCookie, hasCookie, setCookie, getCookies } from "cookies-next";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

interface CookieOptions {
  expires: Date;
  path?: string;
}

/**
 * Caution: if used with RSC, then cookies from next/headers should be passed as context
 */
export class CookiesManager {
  static get(name: string, context?: CookieOptions): string | undefined {
    return getCookie(name, context);
  }

  static put(
    name: string,
    value: string,
    options: CookieOptions,
    context?: () => ReadonlyRequestCookies,
  ): void {
    context
      ? setCookie(name, value, { ...options, cookies: context })
      : setCookie(name, value, options);
  }

  static remove(name: string, context?: () => ReadonlyRequestCookies) {
    deleteCookie(name, { cookies: context });
  }

  static isCookie(name: string, context?: () => ReadonlyRequestCookies): boolean {
    return hasCookie(name, { cookies: context });
  }

  static toString() {
    const res = getCookies();
    return Object.keys(res)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(res[key] as string)}`)
      .join(";");
  }
}
