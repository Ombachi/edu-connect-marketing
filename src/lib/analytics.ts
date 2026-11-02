/**
 * Privacy-first analytics. Nothing loads or is sent until the visitor accepts cookies
 * AND an admin has configured a GA4 ID and/or PostHog key in Admin → Settings.
 */
import type { PublicSettings } from "./siteSettings";

export const CONSENT_KEY = "litu_cookie_consent";
export const CONSENT_EVENT = "litu:consent";

type Cfg = Pick<PublicSettings, "ga4_measurement_id" | "posthog_key" | "posthog_host">;
let cfg: Cfg | null = null;
let gaLoaded = false;

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void }
}

export const hasConsent = () =>
  typeof window !== "undefined" && localStorage.getItem(CONSENT_KEY) === "accepted";

const anonId = () => {
  let id = sessionStorage.getItem("litu_anon_id");
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem("litu_anon_id", id); }
  return id;
};

export const initAnalytics = (c: Cfg) => {
  cfg = c;
  if (!hasConsent()) return;
  if (c.ga4_measurement_id && !gaLoaded) {
    gaLoaded = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(c.ga4_measurement_id)}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    window.gtag = function () { window.dataLayer!.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", c.ga4_measurement_id, { anonymize_ip: true, send_page_view: false });
  }
};

export const track = (event: string, props: Record<string, unknown> = {}) => {
  if (!cfg || !hasConsent()) return;
  if (cfg.ga4_measurement_id && window.gtag) window.gtag("event", event, props);
  if (cfg.posthog_key) {
    const host = (cfg.posthog_host || "https://eu.i.posthog.com").replace(/\/$/, "");
    fetch(`${host}/i/v0/e/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        api_key: cfg.posthog_key,
        event,
        distinct_id: anonId(),
        properties: { ...props, $current_url: location.href, $process_person_profile: false },
      }),
    }).catch(() => {});
  }
};
