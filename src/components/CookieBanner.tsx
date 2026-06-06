import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEY = "litu_cookie_consent";

export const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const v = typeof window !== "undefined" ? localStorage.getItem(KEY) : "set";
    if (!v) setShow(true);
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    localStorage.setItem(KEY, value);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-elevated backdrop-blur sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Cookie className="h-4 w-4" />
        </div>
        <p className="flex-1 text-sm text-muted-foreground">
          We use cookies to keep you signed in, remember your preferences, and improve the product.{" "}
          <Link to="/cookies" className="underline underline-offset-2 hover:text-foreground">Learn more</Link>.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="ghost" size="sm" onClick={() => decide("rejected")}>Reject</Button>
          <Button size="sm" onClick={() => decide("accepted")}>Accept</Button>
          <Button variant="ghost" size="icon" aria-label="Close" onClick={() => decide("rejected")}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
