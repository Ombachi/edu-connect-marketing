import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();
  const next = lang === "en" ? "sw" : "en";
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(next)}
      aria-label={`Switch language to ${next === "sw" ? "Swahili" : "English"}`}
      className="gap-1.5 px-2 text-xs font-semibold uppercase tracking-wider"
    >
      <Languages className="h-4 w-4" />
      {lang.toUpperCase()}
    </Button>
  );
};
