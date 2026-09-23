export const WALLY_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_WALLY_DOWNLOAD_URL?.trim() || "https://www.appwally.com/links/";

export const MAX_PHOTO_MB = Number(process.env.NEXT_PUBLIC_MAX_PHOTO_MB || 5);
export const MAX_PHOTO_BYTES = MAX_PHOTO_MB * 1024 * 1024;

export const BR_STATES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

export const gradients = {
  ocean: {
    label: "Azul oceano",
    from: "#0d63f3",
    to: "#10bfe8",
  },
  deep: {
    label: "Azul profundo",
    from: "#06306f",
    to: "#0d63f3",
  },
  bright: {
    label: "Ciano vivo",
    from: "#075be8",
    to: "#12d7d1",
  },
  dark: {
    label: "Preto",
    from: "#05070b",
    to: "#18243a",
  },
  orange: {
    label: "Laranja Wally",
    from: "#f45d16",
    to: "#ff9a32",
  },
} as const;

export const defaultServices = [
  "Instalações elétricas",
  "Troca de tomadas",
  "Manutenção residencial",
];
