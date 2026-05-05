import { SEO } from "@/components/SEO";
import { LegalLayout } from "@/components/LegalLayout";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Litu Hub a data controller or data processor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Institutions are the data controllers for their users' personal data. Litu Hub Limited acts as a data processor, handling personal data only on documented instructions from the institution and as needed to deliver the service.",
      },
    },
    {
      "@type": "Question",
      name: "Does Litu Hub sign a Data Processing Agreement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We enter into a DPA with every paying institution covering subject matter, duration, nature, purpose, types of personal data, and categories of data subjects. Email dpo@lituhub.com to request a copy.",
      },
    },
    {
      "@type": "Question",
      name: "What security controls protect Litu Hub data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TLS 1.2+ in transit and AES-256 at rest, role-based access control with mandatory MFA for staff, daily encrypted backups with point-in-time recovery, annual independent penetration testing, and 24/7 monitoring with on-call incident response.",
      },
    },
    {
      "@type": "Question",
      name: "Where is data stored, and what about international transfers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Data is hosted primarily in regions serving African customers. Where transfers outside Kenya occur, we rely on appropriate safeguards such as standard contractual clauses, and only with sub-processors bound by equivalent obligations.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to data after a subscription ends?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Customer data is retained for 30 days to allow for export, then permanently deleted from production systems within a further 30 days. Backups are purged on a rolling cycle not exceeding 90 days.",
      },
    },
    {
      "@type": "Question",
      name: "How do I contact the Data Protection Officer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our DPO can be reached at dpo@lituhub.com. Postal address: Litu Hub Limited, Nairobi, Kenya.",
      },
    },
  ],
};

const DataProtection = () => (
  <>
    <SEO
      title="Data Protection · Litu Hub"
      description="How Litu Hub safeguards student, parent, and staff data — security controls, sub-processors, DPO contacts, and Kenya DPA 2019 compliance."
      path="/data-protection"
      jsonLd={faqJsonLd}
    />
    <LegalLayout
      title="Data Protection"
      updated="April 1, 2026"
      intro="Litu Hub processes data on behalf of educational institutions. This page describes our data protection program, security controls, and the rights of data subjects under the Kenya Data Protection Act, 2019 and comparable laws."
    >
      <h2>1. Roles</h2>
      <p>Institutions are the data controllers for their users' personal data. Litu Hub Limited acts as a data processor, handling personal data only on documented instructions from the institution and as needed to deliver the Service.</p>

      <h2>2. Data Processing Agreement (DPA)</h2>
      <p>We enter into a DPA with every paying institution. The DPA describes the subject matter, duration, nature, purpose, types of personal data, and categories of data subjects involved. Contact <a href="mailto:dpo@lituhub.com">dpo@lituhub.com</a> to request a copy.</p>

      <h2>3. Security controls</h2>
      <ul>
        <li>TLS 1.2+ for data in transit and AES-256 for data at rest</li>
        <li>Role-based access control with mandatory MFA for staff</li>
        <li>Daily encrypted backups with point-in-time recovery</li>
        <li>Independent annual penetration testing</li>
        <li>24/7 monitoring with on-call incident response</li>
        <li>Least-privilege internal access reviewed quarterly</li>
      </ul>

      <h2>4. Sub-processors</h2>
      <p>We use a small set of vetted sub-processors for hosting, email delivery, error monitoring, and customer support. A current list, including each provider's location and purpose, is available on request and updated whenever it changes.</p>

      <h2>5. International transfers</h2>
      <p>Data is hosted primarily in regions serving African customers. Where transfers outside Kenya occur, we rely on appropriate safeguards (such as standard contractual clauses) and only with sub-processors bound by equivalent obligations.</p>

      <h2>6. Data subject rights</h2>
      <p>Students, parents, and staff may exercise their rights — access, correction, deletion, restriction, portability, and objection — by contacting their institution. Litu Hub will assist controllers in responding to such requests within statutory timelines.</p>

      <h2>7. Incident response</h2>
      <p>If we discover a personal data breach affecting an institution, we notify the institution without undue delay and provide the information needed for the institution to meet its own notification obligations.</p>

      <h2>8. Retention and deletion</h2>
      <p>Upon termination of an institution's subscription, customer data is retained for 30 days to allow for export, then permanently deleted from production systems within a further 30 days. Backups are purged on a rolling cycle not exceeding 90 days.</p>

      <h2>9. Data Protection Officer</h2>
      <p>Our DPO can be reached at <a href="mailto:dpo@lituhub.com">dpo@lituhub.com</a>. Postal address: Litu Hub Limited, Nairobi, Kenya.</p>
    </LegalLayout>
  </>
);

export default DataProtection;
