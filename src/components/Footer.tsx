import Link from "next/link";
import { WALLY_DOWNLOAD_URL } from "@/lib/config";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/30 bg-[var(--wally-blue-dark)] py-10 text-white">
      <div className="app-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-white/65">Wally, a rede social de serviços locais</p>
        </div>
        <nav className="flex flex-col gap-3 text-sm font-semibold text-white/80 sm:flex-row">
          <a href={WALLY_DOWNLOAD_URL}>Download do aplicativo</a>
          <Link href="/privacidade">Política de privacidade</Link>
          <Link href="/termos">Termos de uso</Link>
        </nav>
      </div>
    </footer>
  );
}
