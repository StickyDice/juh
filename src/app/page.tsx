import LoginForm from "~/features/LoginForm";
import { CookiesManager } from "~/lib/CookiesManager";

export default function Home() {
  const jwt = CookiesManager.get("jwt");
  if (!jwt) return <LoginForm />;

  return <></>;
}
