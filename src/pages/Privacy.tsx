import { SEO } from "@/components/SEO";
import { LegalLayout } from "@/components/LegalLayout";

const Privacy = () => (
  <>
    <SEO
      title="Privacy Policy"
      description="How Litu Hub collects, uses, and protects personal information for students, parents, tutors, and administrators."
      path="/privacy"
    />
    <LegalLayout
      title="Privacy Policy"
      updated="April 1, 2026"
      intro="This Privacy Policy explains how Litu Hub Limited ('we', 'us') handles personal information when you use our learning management platform and related services."
    >
      <h2>1. Information we collect</h2>
      <p>We collect information you provide directly (such as name, email, institution, and role), information your school provides about you (such as class enrollment, grades, and attendance), and limited technical information (such as device type, browser, and IP address) needed to operate the service securely.</p>

      <h2>2. How we use information</h2>
      <ul>
        <li>To provide, maintain, and improve the platform</li>
        <li>To enable communication between students, parents, tutors, and administrators</li>
        <li>To generate analytics and reports for your institution</li>
        <li>To detect, prevent, and respond to abuse, fraud, and security incidents</li>
        <li>To comply with legal obligations under Kenyan and applicable international law</li>
      </ul>

      <h2>3. Lawful basis</h2>
      <p>We process personal data under the Kenya Data Protection Act, 2019. Where we operate in other jurisdictions, additional bases such as legitimate interests, contract performance, and consent may apply.</p>

      <h2>4. Children's data</h2>
      <p>Litu Hub is used by schools that enroll minors. We act as a data processor on behalf of the institution. Schools are responsible for obtaining any required parental consent and for assigning appropriate roles and permissions.</p>

      <h2>5. Sharing</h2>
      <p>We do not sell personal data. We share information only with: (a) your institution, (b) sub-processors that help us run the service (hosting, email, analytics) under written data processing agreements, and (c) authorities when legally required.</p>

      <h2>6. Data retention</h2>
      <p>We retain personal data for as long as the institution maintains an active subscription and for a reasonable period afterwards to support audits, dispute resolution, and legal compliance. Institutions may request earlier deletion.</p>

      <h2>7. Your rights</h2>
      <p>Subject to local law, you may request access, correction, deletion, restriction, or portability of your personal data. Requests should first be sent to your school administrator. You may also contact us directly at <a href="mailto:privacy@lituhub.com">privacy@lituhub.com</a>.</p>

      <h2>8. Security</h2>
      <p>We use encryption in transit and at rest, role-based access controls, regular security testing, and least-privilege principles for our team. Despite these measures, no system can be guaranteed perfectly secure.</p>

      <h2>9. International transfers</h2>
      <p>Data is primarily processed in regions close to our customers. Where data is transferred outside Kenya, we use appropriate safeguards such as standard contractual clauses.</p>

      <h2>10. Changes</h2>
      <p>We may update this Policy from time to time. Material changes will be communicated through the platform or via email at least 30 days before they take effect.</p>

      <h2>11. Contact</h2>
      <p>Litu Hub Limited, Nairobi, Kenya — <a href="mailto:privacy@lituhub.com">privacy@lituhub.com</a></p>
    </LegalLayout>
  </>
);

export default Privacy;
