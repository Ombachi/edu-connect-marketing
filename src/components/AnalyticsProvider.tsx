import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePublicSettings } from "@/lib/siteSettings";
import { CONSENT_EVENT, initAnalytics, track } from "@/lib/analytics";

const LMS_HOST = "lituhub.lovable.app";

export const AnalyticsProvider = () => {
  const s = usePublicSettings();
  const { pathname } = useLocation();

  useEffect(() => {
    const init = () => initAnalytics(s);
    init();
    window.addEventListener(CONSENT_EVENT, init);
    return () => window.removeEventListener(CONSENT_EVENT, init);
  }, [s]);

  useEffect(() => { track("page_view", { page_path: pathname }); }, [pathname, s]);

  // Every link to the LMS counts as a "Log in" click — no need to tag each button.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (a && a.href.includes(LMS_HOST)) track("login_click", { from: location.pathname, label: a.textContent?.trim() });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
};
