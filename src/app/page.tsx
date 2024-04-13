import { redirect } from "next/navigation";
import { CookiesManager } from "~/shared/lib/CookiesManager";
import { Upload } from "~/views";

export default function Home() {
  const jwt = CookiesManager.get("jwt");
  if (jwt) return <Upload />;
  redirect("/auth");
}
