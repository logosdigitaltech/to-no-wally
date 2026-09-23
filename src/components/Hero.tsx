import { ArrowDown, Sparkles, Star, Zap } from "lucide-react";
import { CardPreview } from "./CardPreview";
import { defaultValues } from "@/lib/schema";

const sample = {
  ...defaultValues,
  name: "Maria Silva",
  profession: "Eletricista residencial",
  city: "Campinas",
  state: "SP" as const,
  bio: "Atendimento rápido para instalações, manutenção e reparos elétricos com cuidado e segurança.",
  services: ["Instalações", "Manutenção", "Chuveiros"],
  region: "Campinas e região",
};

export function Hero() {
  return (
    <section className="hero-band overflow-hidden">
      <div className="app-shell relative grid min-h-[650px] items-center gap-10 py-12 md:grid-cols-[minmax(0,1fr)_390px] md:py-16">
        <div className="hero-shape hero-shape-one" aria-hidden />
        <div className="hero-shape hero-shape-two" aria-hidden />
        <div className="relative z-10 space-y-7">
          <span className="sticker sticker-white rotate-[-2deg]">
            <Sparkles size={17} aria-hidden /> Seu trabalho, do seu jeito
          </span>
          <div className="space-y-5">
            <h1 className="font-display max-w-[760px] text-[clamp(3rem,7vw,6.5rem)] font-extrabold leading-[0.9] text-white">
              Mostre que você está no <span className="text-white">Wally.</span>
            </h1>
            <p className="max-w-xl text-lg font-semibold leading-8 text-white/82 sm:text-xl">
              Monte uma arte com a sua cara, publique nas redes e transforme visualização em pedido
              de orçamento.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a className="btn-accent" href="#criar">
              Criar minha arte <ArrowDown size={19} aria-hidden />
            </a>
            <span className="text-sm font-bold text-white/70">
              Grátis. Sem cadastro. Pronta em minutos.
            </span>
          </div>
        </div>
        <div className="hero-preview relative z-10 mx-auto w-full max-w-[330px]" aria-hidden>
          <span className="sticker sticker-orange absolute -right-4 top-16 z-20 rotate-[7deg]">
            <Zap size={18} fill="currentColor" /> Vem orçamento
          </span>
          <span className="sticker sticker-cyan absolute -left-8 bottom-28 z-20 rotate-[-8deg]">
            <Star size={18} fill="currentColor" /> Encontre meu perfil
          </span>
          <CardPreview values={sample} previewFormat="story" />
        </div>
      </div>
    </section>
  );
}
