import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";
import { usePublicSettings, whatsappLink, WHATSAPP_MESSAGE } from "@/lib/siteSettings";
import { track } from "@/lib/analytics";

const KEY = "litu_wa_dismissed";

export const WhatsAppWidget = () => {
  const s = usePublicSettings();
  const { pathname } = useLocation();
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(KEY) === "1");
  const [open, setOpen] = useState(false);
  const href = whatsappLink(s.whatsapp_number);

  if (!href || !s.whatsapp_enabled || dismissed || pathname.startsWith("/admin") || pathname === "/auth") return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {open && (
        <div className="w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-4 shadow-elevated">
          <div className="flex items-start justify-between gap-2">
            <p className="font-display text-sm font-semibold">Chat with our Nairobi team</p>
            <button
              aria-label="Hide WhatsApp chat"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => { sessionStorage.setItem(KEY, "1"); setDismissed(true); }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">"{WHATSAPP_MESSAGE}"</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { from: pathname, placement: "widget" })}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <MessageCircle className="h-4 w-4" /> Start WhatsApp chat
          </a>
        </div>
      )}
      <button
        aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};
