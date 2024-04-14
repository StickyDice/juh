import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CookiesManager } from "~/shared/lib/CookiesManager";
import { Upload } from "~/views";

export default function Home() {
  if (CookiesManager.isCookie("jwt", cookies)) return <Upload />;
  redirect("/auth");
}
