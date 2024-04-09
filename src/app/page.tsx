import { LoginForm } from "~/features/auth/ui";
import { CookiesManager } from "~/shared/lib/CookiesManager";

export default function Home() {
  const jwt = CookiesManager.get("jwt");
  if (!jwt) return <LoginForm />;

  return <></>;
}
