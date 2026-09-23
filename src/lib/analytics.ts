export type AnalyticsEvent =
  | "start_card"
  | "upload_photo"
  | "complete_form"
  | "generate_story"
  | "generate_feed"
  | "download_story"
  | "download_feed"
  | "share_card"
  | "share_whatsapp"
  | "copy_caption"
  | "click_download_wally";

export function trackEvent(name: AnalyticsEvent) {
  window.dispatchEvent(new CustomEvent("wally:analytics", { detail: { name } }));
}
