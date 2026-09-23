export function Toast({ message, kind = "info" }: { message: string; kind?: "info" | "success" | "error" }) {
  const color =
    kind === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : kind === "error"
        ? "border-red-200 bg-red-50 text-red-900"
        : "border-sky-200 bg-sky-50 text-sky-900";

  return (
    <div role="status" className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${color}`}>
      {message}
    </div>
  );
}
