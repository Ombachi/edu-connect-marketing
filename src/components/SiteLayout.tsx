import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export const SiteLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
