import LoginForm from "~/components/LoginForm";
import { CookiesManager } from "~/lib/CookiesManager";

export default function Home() {
  const jwt = CookiesManager.get("jwt");
  console.log(jwt);

  if (!jwt) return <LoginForm />;

  return <></>;
}
