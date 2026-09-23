import type { Metadata, Viewport } from "next";
import "@fontsource/grandstander/400.css";
import "@fontsource/grandstander/600.css";
import "@fontsource/grandstander/700.css";
import "@fontsource/grandstander/800.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://to-no-wally.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Cartão Wally | Divulgue seus serviços",
  description:
    "Crie gratuitamente uma arte profissional para divulgar seus serviços e mostrar aos clientes que você está no Wally.",
  openGraph: {
    title: "Cartão Wally | Divulgue seus serviços",
    description:
      "Crie gratuitamente uma arte profissional para divulgar seus serviços e mostrar aos clientes que você está no Wally.",
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    images: [{ url: "/images/social-card.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartão Wally | Divulgue seus serviços",
    description:
      "Crie gratuitamente uma arte profissional para divulgar seus serviços e mostrar aos clientes que você está no Wally.",
    images: ["/images/social-card.svg"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1469ff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
