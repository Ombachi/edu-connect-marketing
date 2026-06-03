import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, FileText, Inbox, Briefcase, Quote } from "lucide-react";

const NAV = [
  { to: "/admin/posts", label: "Blog posts", icon: FileText },
  { to: "/admin/demo-requests", label: "Demo requests", icon: Inbox },
  { to: "/admin/case-studies", label: "Case studies", icon: Briefcase },
  { to: "/admin/testimonials", label: "Testimonials", icon: Quote },
];

export const AdminGuard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const loc = useLocation();

  if (loading) {
    return <div className="container-wide py-20 text-sm text-muted-foreground">Loading…</div>;
  }
  if (!user) return <Navigate to="/auth" replace state={{ from: loc }} />;

  if (!isAdmin) {
    return (
      <section className="container-wide flex min-h-[60vh] items-center justify-center py-16">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="font-display text-xl font-bold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user.email}) is signed in but doesn't have the admin role.
            Ask an existing admin to grant you the role from the backend dashboard
            (user_roles table → add a row with your user id and role <code>admin</code>).
          </p>
          <Button variant="outline" className="mt-6" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </Card>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="border-b border-border bg-background">
        <div className="container-wide flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/" className="font-display text-sm font-bold">Litu Hub</Link>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin</span>
            {NAV.map((n) => {
              const active = loc.pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary ${
                    active ? "text-primary" : "text-foreground"
                  }`}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">{user.email}</span>
            <Button size="sm" variant="ghost" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main className="container-wide py-8">
        <Outlet />
      </main>
    </div>
  );
};
