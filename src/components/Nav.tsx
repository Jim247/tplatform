import Link from "next/link";

export const instrumentLinks = [
  { href: "/instruments/guitar", label: "Guitar" },
  { href: "/instruments/piano", label: "Piano" },
  { href: "/instruments/singing", label: "Singing" },
];

export default function Nav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col sm:flex-row gap-4 text-lg">
      <li>
        <Link href="/" onClick={onNavigate}>Home</Link>
      </li>
      <li>
        <Link href="/about" onClick={onNavigate}>Instruments</Link>
      </li>
      <li>
        <Link href="/about" onClick={onNavigate}>Jobs</Link>
      </li>
      <li>
        <Link href="/contact" onClick={onNavigate}>Contact</Link>
      </li>
      {instrumentLinks.map((instrument) => (
        <li key={instrument.href}>
          <Link href={instrument.href} onClick={onNavigate}>
            {instrument.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
