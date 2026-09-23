"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Loader2, WifiOff } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BR_STATES, gradients } from "@/lib/config";
import { exportCardNode } from "@/lib/export-image";
import { normalizeFileName } from "@/lib/files";
import { trackEvent } from "@/lib/analytics";
import { cardSchema, defaultValues, type CardFormValues } from "@/lib/schema";
import { CardPreview } from "./CardPreview";
import { FormProgress } from "./FormProgress";
import { PhotoUploader } from "./PhotoUploader";
import { ServicesInput } from "./ServicesInput";
import { ShareActions } from "./ShareActions";
import { Toast } from "./Toast";

type Notice = { message: string; kind?: "info" | "success" | "error" };

export function CardForm() {
  const [step, setStep] = useState(0);
  const [isResult, setIsResult] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<{ story?: string; feed?: string }>({});
  const storyExportRef = useRef<HTMLDivElement>(null);
  const feedExportRef = useRef<HTMLDivElement>(null);

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues,
    mode: "onBlur",
  });

  const values = form.watch();
  const storyFileName = useMemo(() => normalizeFileName(values.name, "stories"), [values.name]);
  const feedFileName = useMemo(() => normalizeFileName(values.name, "feed"), [values.name]);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const update = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (form.formState.isDirty && !generated.story) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [form.formState.isDirty, generated.story]);

  function showNotice(message: string, kind: Notice["kind"] = "info") {
    setNotice({ message, kind });
  }

  async function nextStep() {
    const fields =
      step === 0
        ? (["name", "profession", "city", "state"] as const)
        : (["bio", "services", "region"] as const);
    const valid = await form.trigger(fields);
    if (valid) setStep((current) => Math.min(current + 1, 2));
  }

  async function generateImages() {
    const valid = await form.trigger();
    if (!valid) {
      showNotice("Revise os campos destacados antes de gerar o cartão.", "error");
      return;
    }
    setGenerating(true);
    setNotice({ message: "Gerando suas artes em PNG...", kind: "info" });
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 120));
      if (!storyExportRef.current || !feedExportRef.current)
        throw new Error("Prévia indisponível.");
      const [story, feed] = await Promise.all([
        exportCardNode(storyExportRef.current, 1080, 1920),
        exportCardNode(feedExportRef.current, 1080, 1080),
      ]);
      setGenerated({ story, feed });
      setIsResult(true);
      trackEvent("complete_form");
      trackEvent("generate_story");
      trackEvent("generate_feed");
      showNotice("Seu Cartão Wally está pronto!", "success");
    } catch {
      showNotice(
        "Não foi possível gerar a imagem. Tente novamente ou use outro navegador.",
        "error",
      );
    } finally {
      setGenerating(false);
    }
  }

  function resetForm() {
    if (!window.confirm("Deseja apagar este cartão e começar outro?")) return;
    form.reset(defaultValues);
    setGenerated({});
    setIsResult(false);
    setStep(0);
    setPhotoError("");
    showNotice("Formulário reiniciado.", "success");
  }

  const fieldError = (name: keyof CardFormValues) =>
    form.formState.errors[name]?.message as string | undefined;

  return (
    <section id="criar" className="creator-band py-14 md:py-24">
      <div className="app-shell">
        <div className="mb-10 max-w-3xl">
          <p className="section-kicker">Agora é com você</p>
          <h2 className="font-display mt-2 text-4xl font-extrabold leading-none text-[var(--wally-blue-dark)] md:text-6xl">
            Crie algo impossível de ignorar.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--wally-muted)]">
            Preencha seus dados e acompanhe a arte ganhando forma ao lado. Tudo acontece aqui, sem
            cadastro.
          </p>
        </div>
        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:items-start">
          <div className="glass-panel min-w-0 p-5 sm:p-7">
            <div className="mb-6 space-y-3">
              <h3 className="font-display text-2xl font-extrabold text-[var(--wally-blue-dark)]">
                Seu perfil, suas regras
              </h3>
              <p className="text-sm leading-6 text-[var(--wally-muted)]">
                Seus dados são usados apenas no navegador para gerar a arte. Não pedimos CPF,
                telefone ou endereço completo.
              </p>
              {!isOnline && (
                <Toast
                  message="Você está sem conexão. O formulário continua aberto, mas QR Code e recursos externos podem falhar."
                  kind="error"
                />
              )}
              {notice && <Toast message={notice.message} kind={notice.kind} />}
            </div>

            {!isResult ? (
              <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                <FormProgress step={step} />
                {step === 0 && (
                  <div className="space-y-4">
                    <Input
                      label="Nome profissional"
                      maxLength={50}
                      error={fieldError("name")}
                      {...form.register("name")}
                    />
                    <Input
                      label="Profissão ou especialidade"
                      maxLength={50}
                      error={fieldError("profession")}
                      {...form.register("profession")}
                    />
                    <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
                      <Input
                        label="Cidade"
                        maxLength={50}
                        error={fieldError("city")}
                        {...form.register("city")}
                      />
                      <label className="space-y-2">
                        <span className="text-sm font-bold text-[var(--wally-blue-dark)]">
                          Estado
                        </span>
                        <select
                          className="field"
                          aria-invalid={!!fieldError("state")}
                          {...form.register("state")}
                        >
                          {BR_STATES.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <PhotoUploader
                      photoName={values.photoName}
                      error={photoError || fieldError("photoSize")}
                      onChange={(payload) => {
                        if (payload.error) {
                          setPhotoError(payload.error);
                          return;
                        }
                        setPhotoError(payload.dataUrl ? "" : "Foto removida.");
                        form.setValue("photoDataUrl", payload.dataUrl, { shouldDirty: true });
                        form.setValue("photoName", payload.name, { shouldDirty: true });
                        form.setValue("photoSize", payload.size, { shouldDirty: true });
                        if (payload.dataUrl) trackEvent("upload_photo");
                      }}
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <Textarea
                      label="Pequena apresentação ou bio"
                      maxLength={220}
                      value={values.bio}
                      error={fieldError("bio")}
                      {...form.register("bio")}
                    />
                    <Controller
                      control={form.control}
                      name="services"
                      render={({ field }) => (
                        <ServicesInput
                          services={field.value}
                          onChange={field.onChange}
                          error={fieldError("services")}
                        />
                      )}
                    />
                    <Input
                      label="Região atendida (máximo 60 caracteres)"
                      maxLength={60}
                      value={values.region}
                      error={fieldError("region")}
                      {...form.register("region")}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <RadioCard
                        label="Moderno"
                        checked={values.layout === "modern"}
                        onClick={() => form.setValue("layout", "modern")}
                      />
                      <RadioCard
                        label="Clássico"
                        checked={values.layout === "classic"}
                        onClick={() => form.setValue("layout", "classic")}
                      />
                    </div>
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-[var(--wally-blue-dark)]">
                        Gradiente oficial
                      </span>
                      <select className="field" {...form.register("gradient")}>
                        {Object.entries(gradients).map(([key, gradient]) => (
                          <option key={key} value={key}>
                            {gradient.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Range
                      label="Zoom da foto"
                      min={1}
                      max={2}
                      step={0.05}
                      value={values.photoZoom}
                      onChange={(value) => form.setValue("photoZoom", value)}
                    />
                    <Range
                      label="Mover foto na horizontal"
                      min={-50}
                      max={50}
                      value={values.photoX}
                      onChange={(value) => form.setValue("photoX", value)}
                    />
                    <Range
                      label="Mover foto na vertical"
                      min={-50}
                      max={50}
                      value={values.photoY}
                      onChange={(value) => form.setValue("photoY", value)}
                    />
                    <Toggle
                      label="Exibir cidade"
                      checked={values.showCity}
                      onChange={(checked) => form.setValue("showCity", checked)}
                    />
                    <Toggle
                      label="Exibir QR Code"
                      checked={values.showQr}
                      onChange={(checked) => form.setValue("showQr", checked)}
                    />
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                  {step > 0 && (
                    <button
                      className="btn-secondary w-full"
                      type="button"
                      onClick={() => setStep((current) => current - 1)}
                    >
                      <ArrowLeft size={18} aria-hidden /> Voltar
                    </button>
                  )}
                  {step < 2 ? (
                    <button
                      className="btn-primary w-full sm:col-start-2"
                      type="button"
                      onClick={() => void nextStep()}
                    >
                      Avançar <ArrowRight size={18} aria-hidden />
                    </button>
                  ) : (
                    <button
                      className="btn-primary w-full sm:col-start-2"
                      type="button"
                      onClick={() => void generateImages()}
                      disabled={generating}
                    >
                      {generating ? (
                        <Loader2 className="animate-spin" size={18} aria-hidden />
                      ) : (
                        <CheckCircle2 size={18} aria-hidden />
                      )}
                      {generating ? "Gerando..." : "Concluir e gerar"}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <ResultPanel
                generated={generated}
                values={values}
                storyFileName={storyFileName}
                feedFileName={feedFileName}
                onReset={resetForm}
                onNotice={showNotice}
              />
            )}
          </div>

          <aside className="min-w-0 lg:sticky lg:top-6">
            <div className="preview-panel min-w-0 p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-display text-xl font-extrabold text-[var(--wally-blue-dark)]">
                  Prévia ao vivo
                </h3>
                <span className="text-xs font-bold text-[var(--wally-muted)]">
                  {values.format === "story" ? "Stories" : "Feed"}
                </span>
              </div>
              <div className="flex gap-2 pb-4">
                <button
                  className={`btn-secondary flex-1 ${values.format === "story" ? "ring-2 ring-sky-200" : ""}`}
                  type="button"
                  onClick={() => form.setValue("format", "story")}
                >
                  Stories
                </button>
                <button
                  className={`btn-secondary flex-1 ${values.format === "feed" ? "ring-2 ring-sky-200" : ""}`}
                  type="button"
                  onClick={() => form.setValue("format", "feed")}
                >
                  Feed
                </button>
              </div>
              <div className="mx-auto flex min-h-[390px] w-full min-w-0 items-start justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(20,105,255,.08),rgba(0,211,255,.08))] py-5">
                <CardPreview values={values} previewFormat={values.format} />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="export-stage">
        <div ref={storyExportRef}>
          <CardPreview values={values} previewFormat="story" exportMode />
        </div>
        <div ref={feedExportRef}>
          <CardPreview values={values} previewFormat="feed" exportMode />
        </div>
      </div>
    </section>
  );
}

function ResultPanel({
  generated,
  values,
  storyFileName,
  feedFileName,
  onReset,
  onNotice,
}: {
  generated: { story?: string; feed?: string };
  values: CardFormValues;
  storyFileName: string;
  feedFileName: string;
  onReset: () => void;
  onNotice: (message: string, kind?: "info" | "success" | "error") => void;
}) {
  const [active, setActive] = useState<"story" | "feed">("story");

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-[var(--wally-soft)] p-5">
        <h3 className="text-xl font-extrabold text-[var(--wally-blue-dark)]">
          Seu Cartão Wally está pronto!
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--wally-muted)]">
          Agora é só compartilhar e mostrar aos clientes onde encontrar o seu trabalho.
        </p>
      </div>
      <div className="flex gap-2">
        <button
          className={`btn-secondary flex-1 ${active === "story" ? "ring-2 ring-sky-200" : ""}`}
          type="button"
          onClick={() => setActive("story")}
        >
          Stories
        </button>
        <button
          className={`btn-secondary flex-1 ${active === "feed" ? "ring-2 ring-sky-200" : ""}`}
          type="button"
          onClick={() => setActive("feed")}
        >
          Feed
        </button>
      </div>
      <div className="rounded-3xl bg-slate-50 p-3">
        {active === "story" && generated.story ? (
          <img
            className="mx-auto max-h-[520px] rounded-3xl"
            src={generated.story}
            alt="Prévia da arte para Stories"
          />
        ) : generated.feed ? (
          <img
            className="mx-auto max-h-[520px] rounded-3xl"
            src={generated.feed}
            alt="Prévia da arte para feed"
          />
        ) : (
          <div className="flex items-center gap-2 p-4 text-sm font-semibold text-[var(--wally-danger)]">
            <AlertTriangle size={18} aria-hidden /> A prévia gerada não está disponível.
          </div>
        )}
      </div>
      <ShareActions
        storyDataUrl={generated.story}
        feedDataUrl={generated.feed}
        storyFileName={storyFileName}
        feedFileName={feedFileName}
        activeFormat={active}
        onReset={onReset}
        onNotice={onNotice}
      />
      <p className="flex gap-2 rounded-2xl bg-white text-sm leading-6 text-[var(--wally-muted)]">
        <WifiOff className="mt-1 shrink-0 text-[var(--wally-blue)]" size={18} aria-hidden />
        Para publicar no Instagram, salve a imagem e escolha o arquivo dentro do aplicativo. Alguns
        navegadores não permitem anexar a arte automaticamente.
      </p>
      <p className="sr-only">{values.name}</p>
    </div>
  );
}

function Input({
  label,
  error,
  maxLength,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const value = String(props.value ?? "");
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-[var(--wally-blue-dark)]">{label}</span>
      <input className="field" maxLength={maxLength} aria-invalid={!!error} {...props} />
      <span className="flex justify-between gap-3 text-xs">
        <span className="font-semibold text-[var(--wally-danger)]">{error}</span>
        {maxLength && (
          <span className="ml-auto text-[var(--wally-muted)]">
            {value.length}/{maxLength}
          </span>
        )}
      </span>
    </label>
  );
}

function Textarea({
  label,
  error,
  maxLength,
  value,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-[var(--wally-blue-dark)]">{label}</span>
      <textarea
        className="field min-h-32 resize-y"
        maxLength={maxLength}
        aria-invalid={!!error}
        value={value}
        {...props}
      />
      <span className="flex justify-between gap-3 text-xs">
        <span className="font-semibold text-[var(--wally-danger)]">{error}</span>
        {maxLength && (
          <span className="ml-auto text-[var(--wally-muted)]">
            {String(value ?? "").length}/{maxLength}
          </span>
        )}
      </span>
    </label>
  );
}

function RadioCard({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`rounded-3xl border p-4 text-left font-bold ${checked ? "border-[var(--wally-blue)] bg-[var(--wally-soft)]" : "border-[var(--wally-border)] bg-white"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-3xl border border-[var(--wally-border)] bg-white p-4 font-bold">
      {label}
      <input
        className="size-5 accent-[var(--wally-blue)]"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

function Range({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-[var(--wally-blue-dark)]">{label}</span>
      <input
        className="w-full accent-[var(--wally-blue)]"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
