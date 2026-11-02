import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PublicSettings = {
  calendly_url: string | null;
  whatsapp_number: string | null;
  whatsapp_enabled: boolean;
  ga4_measurement_id: string | null;
  posthog_key: string | null;
  posthog_host: string | null;
};

export const DEFAULT_SETTINGS: PublicSettings = {
  calendly_url: null,
  whatsapp_number: null,
  whatsapp_enabled: true,
  ga4_measurement_id: null,
  posthog_key: null,
  posthog_host: "https://eu.i.posthog.com",
};

export const WHATSAPP_MESSAGE =
  "Hi Litu Hub team, I'd like to learn more about implementing Litu Hub for our school";

/** Digits only, e.g. "+254 712 345 678" -> "254712345678". */
export const normalizePhone = (raw: string | null | undefined) => (raw ?? "").replace(/\D/g, "");

export const whatsappLink = (phone: string | null | undefined, message = WHATSAPP_MESSAGE) => {
  const digits = normalizePhone(phone);
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

export const fetchPublicSettings = async (): Promise<PublicSettings> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any).rpc("get_public_settings");
  if (error || !data) return DEFAULT_SETTINGS;
  const row = Array.isArray(data) ? data[0] : data;
  return { ...DEFAULT_SETTINGS, ...(row ?? {}) };
};

export const usePublicSettings = () =>
  useQuery({ queryKey: ["public-settings"], queryFn: fetchPublicSettings, staleTime: 5 * 60_000, retry: false })
    .data ?? DEFAULT_SETTINGS;
