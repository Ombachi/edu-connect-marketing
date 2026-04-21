import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { to: "/features", label: "Features" },
  { to: "/for-schools", label: "For Schools" },
  { to: "/for-parents", label: "For Parents" },
  { to: "/pricing", label: "Pricing" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm">
            <a href="https://app.lituhub.com">Log in</a>
          </Button>
          <Button asChild size="sm" variant="default">
            <Link to="/demo">Request Demo</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-2 flex flex-col gap-1">
                {links.map((l) => (
                  <SheetClose asChild key={l.to}>
                    <Link
                      to={l.to}
                      className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6">
                  <Button asChild variant="outline">
                    <a href="https://app.lituhub.com">Log in to Litu Hub</a>
                  </Button>
                  <SheetClose asChild>
                    <Button asChild>
                      <Link to="/demo">Request Demo</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
