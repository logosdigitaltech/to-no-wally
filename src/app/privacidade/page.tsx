import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="app-shell max-w-3xl py-12">
        <h1 className="text-3xl font-extrabold text-[var(--wally-blue-dark)]">Política de privacidade</h1>
        <div className="mt-6 space-y-4 leading-7 text-[var(--wally-muted)]">
          <p>O Cartão Wally solicita nome profissional, profissão, cidade, estado, bio, serviços, região atendida e uma foto escolhida por você.</p>
          <p>Essas informações são usadas apenas para montar a arte no seu navegador. Nesta versão, não criamos conta, não salvamos permanentemente seus dados e não acessamos o banco de dados do aplicativo Wally.</p>
          <p>A foto não deve conter documentos, dados sensíveis ou informações que você não queira divulgar. Ao reiniciar o formulário ou fechar a página, os dados podem ser perdidos.</p>
          <p>Eventos de uso podem ser preparados sem incluir nome, foto, profissão, bio, cidade ou qualquer conteúdo digitado.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
