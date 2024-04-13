export function checkIsAuthenticated() {}

type SignParamsType = {
  login: string;
  password: string;
};

async function login(params: SignParamsType): Promise<boolean> {
  const authResult = await fetch("http://localhost:8000/users/login", {
    method: "POST",
    body: JSON.stringify(params),
  }).then((response) => response.json());
  return authResult;
}

async function register(params: SignParamsType): Promise<boolean> {
  const registerResult = await fetch("http://localhost:8000/users/register", {
    method: "POST",
    body: JSON.stringify(params),
  }).then((response) => response.json());
  return registerResult;
}

export async function authenticationStrategy(
  params: SignParamsType,
  strategy: "login" | "register",
) {
  if (strategy === "login") return login(params);
  return register(params);
}
