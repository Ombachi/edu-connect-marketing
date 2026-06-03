import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, FileText, Inbox, Briefcase, Quote, LayoutDashboard, ChevronRight } from "lucide-react";

const NAV = [
  { to: "/admin/posts", label: "Blog Posts", icon: FileText },
  { to: "/admin/demo-requests", label: "Demo Requests", icon: Inbox },
  { to: "/admin/case-studies", label: "Case Studies", icon: Briefcase },
  { to: "/admin/testimonials", label: "Testimonials", icon: Quote },
];

export const AdminGuard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const loc = useLocation();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Loading…</div>;
  }
  if (!user) return <Navigate to="/auth" replace state={{ from: loc }} />;

  if (!isAdmin) {
    return (
      <section className="flex min-h-screen items-center justify-center px-4">
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
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-border bg-card">
        {/* Sidebar header */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <div>
            <Link to="/" className="font-display text-sm font-bold text-foreground hover:text-primary">
              Litu Hub
            </Link>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((n) => {
            const active = loc.pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <n.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{n.label}</span>
                {active && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-border px-3 py-4">
          <div className="flex items-center gap-3 rounded-lg bg-accent/50 px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-xs font-bold uppercase">{user.email?.charAt(0) || "A"}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-foreground">{user.email}</p>
              <p className="text-[10px] text-muted-foreground">Administrator</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="mt-2 w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container-wide py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
