import { SEO } from "@/components/SEO";
import { LegalLayout } from "@/components/LegalLayout";

const Terms = () => (
  <>
    <SEO
      title="Terms of Service"
      description="The terms governing your use of the Litu Hub platform, including acceptable use, subscriptions, and liability."
      path="/terms"
    />
    <LegalLayout
      title="Terms of Service"
      updated="April 1, 2026"
      intro="These Terms govern access to and use of the Litu Hub platform. By using the service, you agree to these Terms on behalf of yourself and, where applicable, your institution."
    >
      <h2>1. Definitions</h2>
      <p>"Service" means the Litu Hub web platform, mobile applications, and APIs. "Institution" means a school, university, or tutoring organization that subscribes to the Service. "User" means any individual authorized to use the Service.</p>

      <h2>2. Accounts</h2>
      <p>Users must keep credentials confidential and notify us promptly of any unauthorized access. Institutions are responsible for the actions of users they invite or provision.</p>

      <h2>3. Acceptable use</h2>
      <ul>
        <li>Do not upload unlawful, harmful, or infringing content</li>
        <li>Do not attempt to disrupt, reverse engineer, or probe the Service</li>
        <li>Do not use the Service to harass, defame, or discriminate against any person</li>
        <li>Comply with the policies of your institution</li>
      </ul>

      <h2>4. Subscriptions and billing</h2>
      <p>Paid plans renew on the agreed cadence (monthly or annually) until cancelled. Fees are non-refundable except where required by law. We may adjust pricing with at least 30 days' notice.</p>

      <h2>5. Content ownership</h2>
      <p>Institutions and users retain ownership of content they upload. By using the Service, you grant Litu Hub a limited license to host, process, and display that content solely to provide the Service.</p>

      <h2>6. Service availability</h2>
      <p>We target 99.9% uptime measured monthly. Planned maintenance is announced in advance where possible. Service credits, where applicable, are described in the institution's order form.</p>

      <h2>7. Suspension and termination</h2>
      <p>We may suspend or terminate access for material breach of these Terms or non-payment, with reasonable notice where practical. Institutions may terminate by following the cancellation flow in account settings.</p>

      <h2>8. Disclaimers</h2>
      <p>The Service is provided "as is" without warranties of any kind, express or implied, except as required by applicable law.</p>

      <h2>9. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, Litu Hub's aggregate liability arising out of or related to the Service shall not exceed the fees paid in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.</p>

      <h2>10. Governing law</h2>
      <p>These Terms are governed by the laws of Kenya. Disputes shall be resolved in the courts of Nairobi, unless otherwise agreed in writing.</p>

      <h2>11. Changes</h2>
      <p>We may update these Terms. Material changes take effect 30 days after notice. Continued use of the Service constitutes acceptance.</p>

      <h2>12. Contact</h2>
      <p>Questions? Email <a href="mailto:legal@lituhub.com">legal@lituhub.com</a>.</p>
    </LegalLayout>
  </>
);

export default Terms;
