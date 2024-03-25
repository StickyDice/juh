import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Некорректный URL</h2>
      <Link href="/">На главную</Link>
    </div>
  );
}
