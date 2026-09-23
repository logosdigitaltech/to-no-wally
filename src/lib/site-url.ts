const DEFAULT_SITE_URL = "https://to-no-wally.vercel.app";

export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return value || DEFAULT_SITE_URL;
}
