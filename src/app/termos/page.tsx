import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="app-shell max-w-3xl py-12">
        <h1 className="text-3xl font-extrabold text-[var(--wally-blue-dark)]">Termos de uso</h1>
        <div className="mt-6 space-y-4 leading-7 text-[var(--wally-muted)]">
          <p>O Cartão Wally é uma ferramenta gratuita para criar uma arte de divulgação profissional vinculada à marca Wally.</p>
          <p>Você é responsável pelas informações e pela imagem enviadas. Não inclua conteúdo ofensivo, ilegal, enganoso ou que viole direitos de terceiros.</p>
          <p>O compartilhamento com Instagram, Facebook ou WhatsApp depende do navegador, sistema operacional e aplicativos instalados. Quando o compartilhamento direto não estiver disponível, baixe a imagem e anexe manualmente.</p>
          <p>Esta primeira versão não cria perfil público individual e não integra com o backend, autenticação ou banco de dados do aplicativo Wally.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
