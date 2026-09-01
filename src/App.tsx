import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import { SiteLayout } from "./components/SiteLayout";
import { CookieBanner } from "./components/CookieBanner";
import { AdminGuard } from "./components/admin/AdminGuard";
import Home from "./pages/Home";
import Features from "./pages/Features";
import ForSchools from "./pages/ForSchools";
import ForParents from "./pages/ForParents";
import ForTeachers from "./pages/ForTeachers";
import ForStudents from "./pages/ForStudents";
import Compare from "./pages/Compare";
import Trust from "./pages/Trust";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import Fees from "./pages/Fees";
import HelpCenter from "./pages/HelpCenter";
import HelpArticle from "./pages/HelpArticle";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Status from "./pages/Status";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DataProtection from "./pages/DataProtection";
import Cookies from "./pages/Cookies";
import Auth from "./pages/Auth";
import AdminPosts from "./pages/admin/Posts";
import PostEditor from "./pages/admin/PostEditor";
import AdminDemoRequests from "./pages/admin/DemoRequests";
import AdminCaseStudies from "./pages/admin/CaseStudies";
import CaseStudyEditor from "./pages/admin/CaseStudyEditor";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminHelpArticles from "./pages/admin/HelpArticles";
import HelpArticleEditor from "./pages/admin/HelpArticleEditor";
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
              <LanguageProvider>
              <Routes>
                <Route element={<SiteLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/for-schools" element={<ForSchools />} />
                  <Route path="/for-parents" element={<ForParents />} />
                  <Route path="/for-teachers" element={<ForTeachers />} />
                  <Route path="/for-students" element={<ForStudents />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/trust" element={<Trust />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/fees" element={<Fees />} />
                  <Route path="/help" element={<HelpCenter />} />
                  <Route path="/help/:slug" element={<HelpArticle />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
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
                  <Route path="demo-requests" element={<AdminDemoRequests />} />
                  <Route path="case-studies" element={<AdminCaseStudies />} />
                  <Route path="case-studies/new" element={<CaseStudyEditor />} />
                  <Route path="case-studies/:id" element={<CaseStudyEditor />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="help" element={<AdminHelpArticles />} />
                  <Route path="help/new" element={<HelpArticleEditor />} />
                  <Route path="help/:id" element={<HelpArticleEditor />} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieBanner />
              </LanguageProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
