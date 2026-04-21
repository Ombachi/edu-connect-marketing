import { SEO } from "@/components/SEO";
import { LegalLayout } from "@/components/LegalLayout";
import { Card } from "@/components/ui/card";

const cookieTypes = [
  {
    name: "Strictly necessary",
    purpose: "Authentication, security, load balancing, and remembering your preferences.",
    examples: "session_id, csrf_token, locale",
    duration: "Session – 12 months",
  },
  {
    name: "Functional",
    purpose: "Remembering choices like theme, language, and last-viewed course.",
    examples: "theme, last_course",
    duration: "12 months",
  },
  {
    name: "Analytics",
    purpose: "Aggregated usage to help us improve the product. No advertising profiling.",
    examples: "_ph (PostHog), _ga (Google Analytics)",
    duration: "12 – 24 months",
  },
];

const Cookies = () => (
  <>
    <SEO
      title="Cookie Policy"
      description="What cookies and similar technologies Litu Hub uses, why we use them, and how to manage your preferences."
      path="/cookies"
    />
    <LegalLayout
      title="Cookie Policy"
      updated="April 1, 2026"
      intro="This Cookie Policy explains how Litu Hub uses cookies and similar technologies on lituhub.com and the Litu Hub platform."
    >
      <h2>1. What are cookies?</h2>
      <p>Cookies are small text files placed on your device by a website. They help sites remember information about your visit, which can make your next visit easier and the site more useful.</p>

      <h2>2. Categories of cookies we use</h2>
      <Card className="not-prose my-6 overflow-hidden border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/40">
              <tr className="text-left">
                <th className="px-5 py-3 font-semibold text-foreground">Type</th>
                <th className="px-5 py-3 font-semibold text-foreground">Purpose</th>
                <th className="px-5 py-3 font-semibold text-foreground">Examples</th>
                <th className="px-5 py-3 font-semibold text-foreground">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cookieTypes.map((c) => (
                <tr key={c.name}>
                  <td className="px-5 py-4 font-medium text-foreground">{c.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{c.purpose}</td>
                  <td className="px-5 py-4 text-muted-foreground">{c.examples}</td>
                  <td className="px-5 py-4 text-muted-foreground">{c.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <h2>3. Third-party cookies</h2>
      <p>Some pages may include content from third parties (for example, embedded videos). These third parties may set their own cookies, which we do not control. Review their policies for details.</p>

      <h2>4. Managing your preferences</h2>
      <p>You can control cookies through your browser settings — most browsers let you block or delete them. Note that blocking strictly necessary cookies will affect core functionality such as signing in. Where required by local law, we display a consent banner so you can opt in to analytics cookies.</p>

      <h2>5. Do Not Track</h2>
      <p>Our platform does not currently respond to Do Not Track signals because no industry standard has been finalized.</p>

      <h2>6. Changes</h2>
      <p>We will update this Cookie Policy when our practices change. Material changes will be communicated through the platform.</p>

      <h2>7. Contact</h2>
      <p>Questions? Email <a href="mailto:privacy@lituhub.com">privacy@lituhub.com</a>.</p>
    </LegalLayout>
  </>
);

export default Cookies;
