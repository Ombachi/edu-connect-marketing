import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { to: "/features", label: "Features" },
  { to: "/for-schools", label: "For Schools" },
  { to: "/for-parents", label: "For Parents" },
  { to: "/pricing", label: "Pricing" },
];

const resources = [
  { to: "/help", label: "Help Center", desc: "Guides, tutorials and FAQs" },
  { to: "/blog", label: "Blog", desc: "Product updates and insights" },
  { to: "/case-studies", label: "Case Studies", desc: "Stories from real schools" },
  { to: "/status", label: "Status", desc: "Live system uptime" },
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
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Resources
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {resources.map((r) => (
                <DropdownMenuItem key={r.to} asChild>
                  <Link to={r.to} className="flex flex-col items-start gap-0.5 py-2">
                    <span className="text-sm font-medium text-foreground">{r.label}</span>
                    <span className="text-xs text-muted-foreground">{r.desc}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm">
            <a href="https://lituhub.lovable.app">Log in</a>
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
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary [&[data-state=open]>svg]:rotate-180">
                    Resources
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-2 mt-1 flex flex-col gap-1 border-l border-border pl-3">
                    {resources.map((r) => (
                      <SheetClose asChild key={r.to}>
                        <Link
                          to={r.to}
                          className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          {r.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6">
                  <Button asChild variant="outline">
                    <a href="https://lituhub.lovable.app">Log in to Litu Hub</a>
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
