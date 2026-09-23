import { z } from "zod";
import { BR_STATES, MAX_PHOTO_BYTES } from "./config";

const serviceSchema = z
  .string()
  .trim()
  .min(2, "Informe um serviço.")
  .max(40, "Cada serviço pode ter no máximo 40 caracteres.");

export const cardSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome profissional.")
    .max(50, "O nome pode ter no máximo 50 caracteres."),
  profession: z
    .string()
    .trim()
    .min(2, "Informe sua profissão ou especialidade.")
    .max(50, "A profissão pode ter no máximo 50 caracteres."),
  city: z
    .string()
    .trim()
    .min(2, "Informe sua cidade.")
    .max(50, "A cidade pode ter no máximo 50 caracteres."),
  state: z.enum(BR_STATES, { message: "Selecione um estado." }),
  photoDataUrl: z.string().optional(),
  photoName: z.string().optional(),
  photoSize: z.number().max(MAX_PHOTO_BYTES, "A foto ultrapassa o limite permitido.").optional(),
  bio: z
    .string()
    .trim()
    .min(20, "Escreva uma apresentação um pouco mais completa.")
    .max(220, "A bio pode ter no máximo 220 caracteres."),
  services: z
    .array(serviceSchema)
    .min(1, "Informe pelo menos um serviço.")
    .max(4, "Informe no máximo quatro serviços."),
  region: z
    .string()
    .trim()
    .min(2, "Informe a região atendida.")
    .max(60, "A região atendida pode ter no máximo 60 caracteres."),
  layout: z.enum(["modern", "classic"]),
  gradient: z.enum(["ocean", "deep", "bright", "dark", "orange"]),
  showCity: z.boolean(),
  showQr: z.boolean(),
  photoZoom: z.number().min(1).max(2),
  photoX: z.number().min(-50).max(50),
  photoY: z.number().min(-50).max(50),
  format: z.enum(["story", "feed"]),
});

export type CardFormValues = z.infer<typeof cardSchema>;

export const defaultValues: CardFormValues = {
  name: "",
  profession: "",
  city: "",
  state: "SP",
  photoDataUrl: undefined,
  photoName: undefined,
  photoSize: undefined,
  bio: "",
  services: [""],
  region: "",
  layout: "modern",
  gradient: "ocean",
  showCity: true,
  showQr: true,
  photoZoom: 1,
  photoX: 0,
  photoY: 0,
  format: "story",
};
