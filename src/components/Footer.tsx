import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" },
      { label: "Fees & Payments", to: "/fees" },
      { label: "Pricing", to: "/pricing" },
      { label: "Request Demo", to: "/demo" },
      { label: "Log in", href: "https://lituhub.lovable.app" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "For Schools", to: "/for-schools" },
      { label: "For Parents", to: "/for-parents" },
      { label: "About", to: "/" },
      { label: "Contact", to: "/demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", to: "/help" },
      { label: "Blog", to: "/blog" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Status", to: "/status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Data Protection", to: "/data-protection" },
      { label: "Cookies", to: "/cookies" },
    ],
  },
];

export const Footer = () => {
  const onSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    toast.success("Thanks! You're on the list.");
    form.reset();
  };

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-wide py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The modern Learning Management System built for African education — schools, universities, and tutoring centers.
            </p>
            <form onSubmit={onSubscribe} className="mt-6 flex max-w-sm gap-2">
              <Input type="email" required placeholder="you@school.edu" aria-label="Email" />
              <Button type="submit" variant="secondary">Subscribe</Button>
            </form>
            <div className="mt-6 flex gap-3">
              <a href="https://lituhub.lovable.app" aria-label="Twitter" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://lituhub.lovable.app" aria-label="LinkedIn" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://lituhub.lovable.app" aria-label="GitHub" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {"href" in link && link.href ? (
                        <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={(link as { to: string }).to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Litu Hub. Made with care in Nairobi for schools across Africa.
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="inline-flex h-2 w-2 -translate-y-px items-center rounded-full bg-primary-glow" /> All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
};
