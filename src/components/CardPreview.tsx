"use client";

import { MapPin, Sparkles, Zap } from "lucide-react";
import type { CSSProperties } from "react";
import { WALLY_DOWNLOAD_URL, gradients } from "@/lib/config";
import type { CardFormValues } from "@/lib/schema";
import { QrCode } from "./QrCode";

type CardPreviewProps = {
  values: CardFormValues;
  previewFormat: "story" | "feed";
  scale?: number;
  exportMode?: boolean;
};

export function CardPreview({
  values,
  previewFormat,
  scale,
  exportMode = false,
}: CardPreviewProps) {
  const isStory = previewFormat === "story";
  const width = 1080;
  const height = isStory ? 1920 : 1080;
  const previewScale = scale ?? (isStory ? 0.28 : 0.33);
  const responsive = scale === undefined;
  const artwork = <Artwork values={values} format={previewFormat} width={width} height={height} />;

  if (exportMode) return artwork;

  return (
    <div
      className={`relative shrink-0 ${responsive ? "card-preview-responsive" : ""}`}
      data-format={previewFormat}
      style={
        responsive
          ? ({
              "--card-width": `${width}px`,
              "--card-height": `${height}px`,
              "--card-scale": previewScale,
            } as CSSProperties)
          : { width: width * previewScale, height: height * previewScale }
      }
    >
      <div
        className="card-preview-artwork absolute left-0 top-0 origin-top-left"
        style={responsive ? undefined : { transform: `scale(${previewScale})` }}
      >
        {artwork}
      </div>
    </div>
  );
}

function Artwork({
  values,
  format,
  width,
  height,
}: {
  values: CardFormValues;
  format: "story" | "feed";
  width: number;
  height: number;
}) {
  const isStory = format === "story";
  const gradient = gradients[values.gradient];
  const services = values.services.filter(Boolean).slice(0, 4);
  const cityText = values.showCity
    ? `${values.city || "Sua cidade"} · ${values.state}`
    : values.state;
  const name = values.name || "Seu nome profissional";
  const profession = values.profession || "Sua especialidade";
  const bio = values.bio || "Conte em poucas palavras como seu trabalho ajuda seus clientes.";
  const nameSize = fitFontSize(name, isStory ? 82 : 58, isStory ? 48 : 34, 18, 1.45);
  const professionSize = fitFontSize(profession, isStory ? 38 : 28, isStory ? 26 : 19, 26, 0.75);
  const bioSize = fitFontSize(bio, isStory ? 29 : 21, isStory ? 22 : 16, 100, 0.12);
  const classic = values.layout === "classic";

  return (
    <div
      data-testid={`card-${format}`}
      data-export-card={format}
      className="card-shadow relative isolate overflow-hidden bg-[var(--wally-blue)] text-white"
      style={{
        width,
        height,
        background: `linear-gradient(145deg, ${gradient.from}, ${gradient.to})`,
      }}
    >
      <div className="absolute -left-[120px] top-[250px] h-[330px] w-[720px] rotate-[-14deg] bg-[var(--wally-orange)]/95" />
      <div className="absolute -right-[100px] top-[70px] h-[260px] w-[520px] rotate-[12deg] bg-cyan-300/35" />
      <div className="absolute bottom-[-120px] right-[-80px] h-[420px] w-[620px] rotate-[-8deg] border-[46px] border-white/12" />

      <BrandRow isStory={isStory} />

      <div
        className={`absolute overflow-hidden border-[6px] border-white/80 bg-cyan-100 shadow-2xl ${classic ? "rounded-[34px]" : "rounded-[72px]"}`}
        style={
          isStory
            ? { left: 64, right: 64, top: 180, height: 675 }
            : { left: 62, top: 164, width: 480, height: 840 }
        }
      >
        <ProfessionalPhoto values={values} />
        <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-t from-[var(--wally-blue-dark)]/75 to-transparent" />
        <span
          className="absolute z-30 inline-flex rotate-[-3deg] items-center gap-3 rounded-[18px] bg-[var(--wally-orange)] px-6 py-4 text-[24px] font-extrabold text-white shadow-xl"
          style={isStory ? { bottom: 34, left: 38 } : { bottom: 28, left: 38 }}
        >
          <Zap size={26} fill="currentColor" aria-hidden /> Disponível no Wally
        </span>
      </div>

      <section
        className={`absolute z-10 border border-white/50 bg-white/[.88] text-[var(--wally-ink)] shadow-2xl backdrop-blur-xl ${classic ? "rounded-[34px]" : "rounded-[64px]"}`}
        style={
          isStory
            ? { left: 64, right: 64, top: 800, bottom: 62, padding: "72px 58px 42px" }
            : { left: 470, right: 54, top: 120, bottom: 54, padding: "58px 42px 34px" }
        }
      >
        <div className="flex h-full flex-col">
          <div className={isStory ? "space-y-5" : "space-y-4"}>
            <p
              className="font-display font-extrabold leading-[0.96] text-[var(--wally-blue-dark)]"
              style={{ ...clampStyle(2), fontSize: nameSize, overflowWrap: "anywhere" }}
            >
              {name}
            </p>
            <p
              className="font-extrabold leading-tight text-[var(--wally-blue)]"
              style={{ ...clampStyle(2), fontSize: professionSize, overflowWrap: "anywhere" }}
            >
              {profession}
            </p>
            <p
              className={`${isStory ? "text-[27px]" : "text-[20px]"} flex items-center gap-3 font-bold text-[var(--wally-muted)]`}
            >
              <MapPin className="shrink-0" size={isStory ? 30 : 22} aria-hidden />
              <span className="break-all">{cityText}</span>
            </p>
          </div>

          <p
            className={`${isStory ? "mt-10" : "mt-8"} leading-[1.34] text-[var(--wally-ink)]`}
            style={{ ...clampStyle(isStory ? 4 : 5), fontSize: bioSize, overflowWrap: "anywhere" }}
          >
            {bio}
          </p>

          <div
            className={`${isStory ? "mt-10 gap-x-10 gap-y-4" : "mt-8 gap-x-6 gap-y-3"} grid grid-cols-2`}
          >
            {(services.length ? services : ["Seu principal serviço"]).map((service, index) => (
              <div
                key={`${service}-${index}`}
                className="flex items-start gap-3 border-t border-[var(--wally-blue)]/25 pt-3 font-extrabold leading-snug text-[var(--wally-blue-dark)]"
                style={{ fontSize: isStory ? 23 : 17, overflowWrap: "anywhere" }}
              >
                <span className="mt-[0.48em] h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--wally-orange)]" />
                <span style={clampStyle(2)}>{service}</span>
              </div>
            ))}
          </div>

          <p
            className={`${isStory ? "mt-7 text-[22px]" : "mt-6 text-[17px]"} font-bold leading-tight text-[var(--wally-muted)]`}
            style={{ ...clampStyle(2), overflowWrap: "anywhere" }}
          >
            Atendo {values.region || "na sua região"}
          </p>

          <div
            className={`${isStory ? "pt-6" : "pt-5"} mt-auto grid items-center gap-5 border-t-[3px] border-dashed border-[var(--wally-border)]`}
            style={{
              gridTemplateColumns: values.showQr ? (isStory ? "1fr 150px" : "1fr 128px") : "1fr",
            }}
          >
            <div>
              <p
                className={`${isStory ? "text-[36px]" : "text-[27px]"} font-black leading-tight text-[var(--wally-blue-dark)]`}
              >
                Tô no Wally!
              </p>
              <p
                className={`${isStory ? "mt-3 text-[24px]" : "mt-2 text-[17px]"} font-bold leading-tight text-[var(--wally-blue-dark)]`}
              >
                Conheça meu trabalho e solicite seu orçamento pelo app.
              </p>
            </div>
            {values.showQr && (
              <div className="rounded-[20px] bg-white p-3 text-center shadow-lg">
                <QrCode value={WALLY_DOWNLOAD_URL} size={isStory ? 126 : 104} />
                <p
                  className={`${isStory ? "text-[13px]" : "text-[10px]"} mt-2 font-black leading-tight text-[var(--wally-blue-dark)]`}
                >
                  Escaneie o QR Code para baixar.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function fitFontSize(text: string, max: number, min: number, threshold: number, decay: number) {
  return Math.max(min, Math.round(max - Math.max(0, text.length - threshold) * decay));
}

function clampStyle(lines: number): CSSProperties {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

function BrandRow({ isStory }: { isStory: boolean }) {
  return (
    <div
      className="absolute z-20 flex items-center justify-between"
      style={{ left: 66, right: 66, top: isStory ? 64 : 52 }}
    >
      <span className="font-display text-[46px] font-extrabold leading-none text-white drop-shadow-md">
        wally
      </span>
      <span className="rounded-[14px] border border-white/45 bg-white/20 px-5 py-3 text-[19px] font-extrabold tracking-wide text-white backdrop-blur-md">
        MEU PERFIL
      </span>
    </div>
  );
}

function ProfessionalPhoto({ values }: { values: CardFormValues }) {
  if (values.photoDataUrl) {
    return (
      <img
        src={values.photoDataUrl}
        alt=""
        className="h-full w-full object-cover"
        style={{
          transform: `translate(${values.photoX}px, ${values.photoY}px) scale(${values.photoZoom})`,
        }}
      />
    );
  }

  return (
    <div className="grid h-full place-items-center bg-gradient-to-br from-cyan-100 via-white to-blue-100 p-14 text-center">
      <div className="space-y-5 text-[var(--wally-blue-dark)]">
        <Sparkles className="mx-auto text-[var(--wally-orange)]" size={72} aria-hidden />
        <p className="font-display text-[42px] font-extrabold leading-tight">Sua foto entra aqui</p>
      </div>
    </div>
  );
}
