import { redirect } from "next/navigation";
import { LoginForm } from "~/features/auth/ui";
import { CookiesManager } from "~/shared/lib/CookiesManager";

export default function Home() {
  const jwt = CookiesManager.get("jwt");
  if (!jwt) return <LoginForm />;
  redirect("/main");
}
