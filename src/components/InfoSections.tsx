import { Download, Palette, Send, UserRound } from "lucide-react";

export function InfoSections() {
  const steps = [
    [UserRound, "01", "Mostre quem você é", "Adicione foto, especialidade e a região onde atende."],
    [Palette, "02", "Dê o seu toque", "Escolha cores e um layout que combine com seu trabalho."],
    [Download, "03", "Baixe a imagem", "Receba versões prontas para Stories e feed."],
    [Send, "04", "Faça circular", "Compartilhe e leve novos clientes direto ao Wally."],
  ] as const;

  return (
    <section id="como-funciona" className="app-shell py-16 md:py-24">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">Do perfil para o mundo</p>
          <h2 className="font-display mt-2 max-w-xl text-4xl font-extrabold leading-none text-[var(--wally-blue-dark)] md:text-5xl">
            Sua vitrine profissional em quatro passos.
          </h2>
        </div>
        <p className="max-w-sm text-base leading-7 text-[var(--wally-muted)]">
          Você preenche. O Wally organiza. A arte fica pronta para chamar atenção e gerar conversa.
        </p>
      </div>
      <div className="steps-track">
        {steps.map(([Icon, number, title, text]) => (
          <article key={number} className="step-item">
            <div className="step-icon">
              <Icon size={23} aria-hidden />
            </div>
            <span className="step-number">{number}</span>
            <h3 className="font-display text-xl font-bold text-[var(--wally-blue-dark)]">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--wally-muted)]">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
