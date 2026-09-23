import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="app-shell relative z-40 flex min-h-20 items-center justify-between gap-3 py-4">
      <Link href="/" aria-label="Ir para o início">
        <Logo />
      </Link>
      <nav className="flex items-center gap-2 text-sm font-semibold">
        <a
          className="hidden px-3 py-2 text-[var(--wally-blue-dark)] sm:inline-flex"
          href="#como-funciona"
        >
          Como funciona
        </a>
        <a className="btn-primary" href="#criar">
          Criar cartão <ArrowUpRight size={18} aria-hidden />
        </a>
      </nav>
    </header>
  );
}
