import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteLayout } from "./components/SiteLayout";
import { AdminGuard } from "./components/admin/AdminGuard";
import Home from "./pages/Home";
import Features from "./pages/Features";
import ForSchools from "./pages/ForSchools";
import ForParents from "./pages/ForParents";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import Fees from "./pages/Fees";
import HelpCenter from "./pages/HelpCenter";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CaseStudies from "./pages/CaseStudies";
import Status from "./pages/Status";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DataProtection from "./pages/DataProtection";
import Cookies from "./pages/Cookies";
import Auth from "./pages/Auth";
import AdminPosts from "./pages/admin/Posts";
import PostEditor from "./pages/admin/PostEditor";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route element={<SiteLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/for-schools" element={<ForSchools />} />
                  <Route path="/for-parents" element={<ForParents />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/fees" element={<Fees />} />
                  <Route path="/help" element={<HelpCenter />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/status" element={<Status />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/data-protection" element={<DataProtection />} />
                  <Route path="/cookies" element={<Cookies />} />
                </Route>
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<AdminGuard />}>
                  <Route index element={<AdminPosts />} />
                  <Route path="posts" element={<AdminPosts />} />
                  <Route path="posts/new" element={<PostEditor />} />
                  <Route path="posts/:id" element={<PostEditor />} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
