import { deleteCookie } from "cookies-next";
import { cookies } from "next/headers";

interface CookieInfo {
  name: string;
  value: string;
}

interface CookieOptions {
  expires: Date;
  path?: string;
}

// TODO: Переписать большинство методов на библиотеку cookies-next
export class CookiesManager {
  static get(name: string): string | undefined {
    const store = cookies();
    const res = store.get(name);
    return res ? res.value : undefined;
  }
  static getAll(): Array<CookieInfo> {
    const store = cookies();
    return store.getAll();
  }
  static put(name: string, value: string, options: CookieOptions): void {
    try {
      // client side :
      document.cookie = `${name}=${value};expires=${options.expires.toUTCString()};path=/;`;
    } catch {
      // server side :
      cookies().set(name, value, {
        expires: options.expires.getTime(),
        path: options.path || "/",
      });
    }
  }
  static remove(name: string) {
    try {
      // client side :
      document.cookie = `${name};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } catch {
      // server side :
      deleteCookie(name, { cookies });
    }
  }
}
