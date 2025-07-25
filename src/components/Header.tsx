import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full py-8 bg-background text-white flex items-center justify-center gap-4 font-bold text-2xl font-[Montserrat]">
      <span>TEMPO</span>
      <Image
        src="/logo.svg"
        alt="Tempo Tuition Logo"
        width={48}
        height={48}
      />
      <span>TUITION</span>
    </header>
  );
}
