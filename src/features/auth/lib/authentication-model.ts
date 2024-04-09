export function checkIsAuthenticated() {}

export async function login(params: { login: string; password: string }) {
  const authResult = await fetch("fakedUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(params),
  });
}
