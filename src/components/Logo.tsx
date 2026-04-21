import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

export const Logo = ({ className = "", variant = "default" }: LogoProps) => {
  const textColor = variant === "light" ? "text-primary-foreground" : "text-foreground";
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`} aria-label="Litu Hub home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft transition-transform group-hover:scale-105">
        <GraduationCap className="h-5 w-5" strokeWidth={2.25} />
      </span>
      <span className={`font-display text-lg font-bold tracking-tight ${textColor}`}>
        Litu<span className="text-accent">Hub</span>
      </span>
    </Link>
  );
};
