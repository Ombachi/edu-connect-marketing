import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "sw";

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  en: {
    "nav.features": "Features",
    "nav.forSchools": "For Schools",
    "nav.forParents": "For Parents",
    "nav.fees": "Fees",
    "nav.pricing": "Pricing",
    "nav.resources": "Resources",
    "nav.login": "Log in",
    "nav.requestDemo": "Request Demo",
    "hero.titleA": "The Modern LMS Built for",
    "hero.titleB": "African Education",
    "hero.subtitle":
      "Run your entire institution — admissions, classes, grading, and parent communication — from one fast, offline-ready platform designed for the way African schools actually teach.",
    "cta.requestDemo": "Request a Demo",
    "cta.login": "Log in to Litu Hub",
    "section.trustedBy": "Trusted by schools across Kenya",
    "footer.tagline":
      "The modern Learning Management System built for African education — schools, universities, and tutoring centers.",
    "footer.subscribe": "Subscribe",
    "footer.emailPlaceholder": "you@school.edu",
    "lang.label": "Language",
  },
  sw: {
    "nav.features": "Vipengele",
    "nav.forSchools": "Kwa Shule",
    "nav.forParents": "Kwa Wazazi",
    "nav.fees": "Ada",
    "nav.pricing": "Bei",
    "nav.resources": "Rasilimali",
    "nav.login": "Ingia",
    "nav.requestDemo": "Omba Onesho",
    "hero.titleA": "Mfumo wa Kisasa wa LMS Uliojengwa kwa",
    "hero.titleB": "Elimu ya Afrika",
    "hero.subtitle":
      "Endesha taasisi yako yote — udahili, madarasa, alama, na mawasiliano ya wazazi — kupitia jukwaa moja la haraka linalofanya kazi hata bila intaneti, lililoundwa kwa jinsi shule za Afrika zinavyofundisha.",
    "cta.requestDemo": "Omba Onesho",
    "cta.login": "Ingia kwa Litu Hub",
    "section.trustedBy": "Inaaminika na shule kote Kenya",
    "footer.tagline":
      "Mfumo wa kisasa wa usimamizi wa kujifunza uliojengwa kwa elimu ya Afrika — shule, vyuo vikuu, na vituo vya mafunzo.",
    "footer.subscribe": "Jisajili",
    "footer.emailPlaceholder": "wewe@shule.ac.ke",
    "lang.label": "Lugha",
  },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<Ctx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem("litu-lang") as Lang | null;
    return stored === "sw" || stored === "en" ? stored : "en";
  });

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    window.localStorage.setItem("litu-lang", lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback(
    (key: string) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key,
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
