import Link from "next/link";

export default function Nav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col sm:flex-row gap-4 text-lg">
      <li>
        <Link href="/" onClick={onNavigate}>Home</Link>
      </li>
      <li>
        <Link href="/about" onClick={onNavigate}>About</Link>
      </li>
      <li>
        <Link href="/contact" onClick={onNavigate}>Contact</Link>
      </li>
    </ul>
  );
}
