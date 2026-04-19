import type { Metadata } from "next";
import Link from "next/link";
import { siteSettings } from "@/lib/it-services-content";

export const metadata: Metadata = {
  title: `Privacy Policy \u2014 ${siteSettings.siteName}`,
  description: `Privacy policy for ${siteSettings.siteName}. How we collect, use, and protect your personal information.`,
};

type Section = { id: string; title: string; paragraphs: string[] };

const lastUpdated = "2026-01-01";

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      `${siteSettings.siteName} respects your privacy and is committed to protecting your personal data. This policy describes how we collect, use, and safeguard information when you use this website or contact us.`,
      "We do not sell, rent, or trade personal information about you with third parties for their promotional purposes.",
    ],
  },
  {
    id: "data-collected",
    title: "Data We Collect",
    paragraphs: [
      "Contact data: when you fill out our contact form, we collect your name, email, phone, company, and the content of your message.",
      "Usage data: we may collect information about how you interact with our site, including IP address, browser type, referring URLs, and pages viewed.",
      "Cookies and similar tracking technologies may be used to analyze traffic and improve the site experience.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Data",
    paragraphs: [
      "To respond to inquiries and fulfill your requests.",
      "To improve our website, services, and customer support.",
      "To detect and prevent fraud, abuse, or technical issues.",
      "To comply with legal obligations.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    paragraphs: [
      "We apply appropriate technical and organizational controls to protect personal data against loss, unauthorized access, or disclosure.",
      "Access to personal data is limited to staff who need it to do their work, and they are subject to a duty of confidentiality.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    paragraphs: [
      "We retain personal data only as long as needed for the purpose it was collected for, or as required by law. When no longer needed, we delete or anonymize it.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    paragraphs: [
      "Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict processing of your personal data, or to object to processing.",
      `To exercise any of these rights, please contact us at ${siteSettings.email}.`,
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    paragraphs: [
      `Email: ${siteSettings.email}`,
      `Address: ${siteSettings.address}`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="border-b border-[var(--border)] bg-[var(--muted)]/40">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            Legal
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[var(--muted-foreground)]">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <nav className="hidden lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            On this page
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <Link
                  href={`#${section.id}`}
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)]"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-10">
          {sections.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-serif text-2xl text-[var(--foreground)]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
