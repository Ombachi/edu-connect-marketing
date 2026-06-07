import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Home, LifeBuoy, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

const helpfulLinks = [
  { to: "/", icon: Home, label: "Homepage", desc: "Back to the start" },
  { to: "/features", icon: BookOpen, label: "Features", desc: "Explore the product" },
  { to: "/help", icon: LifeBuoy, label: "Help Center", desc: "Guides & FAQs" },
  { to: "/demo", icon: MessageSquare, label: "Talk to us", desc: "Book a demo" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved. Explore Litu Hub or jump back to a useful page."
        path={location.pathname}
      />
      <section className="container-wide flex min-h-[80vh] flex-col items-center justify-center py-20 text-center">
        <div className="relative mx-auto h-48 w-48">
          <div className="absolute inset-0 rounded-full bg-gradient-hero opacity-20 blur-2xl" aria-hidden />
          <svg viewBox="0 0 200 200" className="relative h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="g404" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontFamily="var(--font-display, ui-sans-serif)"
              fontSize="84"
              fontWeight="800"
              fill="url(#g404)"
            >
              404
            </text>
            <circle cx="160" cy="40" r="6" fill="hsl(var(--accent))" opacity="0.6" />
            <circle cx="40" cy="170" r="4" fill="hsl(var(--primary))" opacity="0.5" />
            <circle cx="180" cy="160" r="3" fill="hsl(var(--accent))" opacity="0.7" />
          </svg>
        </div>

        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          We can't find that page
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          The link may be broken or the page may have moved. Try one of these instead.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/">Back to home <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/help">Visit Help Center</Link>
          </Button>
        </div>

        <div className="mt-14 grid w-full max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {helpfulLinks.map((l) => (
            <Link key={l.to} to={l.to} className="group block">
              <Card className="h-full border-border p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <l.icon className="h-4 w-4" />
                </div>
                <p className="mt-3 text-sm font-semibold">{l.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{l.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default NotFound;
