export class CookiesManagerClient {
  static remove(name: string) {
    console.log(name);
    document.cookie = `${name};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}