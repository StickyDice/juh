import { cookies } from "next/headers";

interface CookieInfo {
  name: string;
  value: string;
}

interface CookieOptions {
  expires: Date;
  path?: string;
}

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
    // client side :
    if (document && document.cookie) {
      document.cookie = `${name}=${value};expires=${options.expires.toUTCString()};path=/;`;
    } 
    // server side : 
    else {
      cookies().set(name, value, {
        expires: options.expires.getTime(),
        path: options.path || "/",
      });
    }
  }
}
