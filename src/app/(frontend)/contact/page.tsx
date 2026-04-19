import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactPage, siteSettings } from "@/lib/it-services-content";

export const metadata: Metadata = {
  title: `Contact \u2014 ${siteSettings.siteName}`,
  description: contactPage.subheading,
};

export default function ContactPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
              Contact
            </p>
            <h1 className="mt-4 font-serif text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl">
              {contactPage.heading}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted-foreground)]">
              {contactPage.subheading}
            </p>

            <dl className="mt-10 space-y-6 border-t border-[var(--border)] pt-8">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Email
                </dt>
                <dd className="mt-1 text-base text-[var(--foreground)]">
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="hover:text-[var(--primary)]"
                  >
                    {siteSettings.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Support
                </dt>
                <dd className="mt-1 text-base text-[var(--foreground)]">
                  <a
                    href={`mailto:${siteSettings.supportEmail}`}
                    className="hover:text-[var(--primary)]"
                  >
                    {siteSettings.supportEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Phone
                </dt>
                <dd className="mt-1 text-base text-[var(--foreground)]">
                  {siteSettings.phone}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Office
                </dt>
                <dd className="mt-1 text-base text-[var(--foreground)]">
                  {siteSettings.address}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Response time
                </dt>
                <dd className="mt-1 text-base text-[var(--foreground)]">
                  {contactPage.responseTime}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              What is this about?
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {contactPage.reasons.map((reason) => (
                <li
                  key={reason}
                  className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs text-[var(--muted-foreground)]"
                >
                  {reason}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--muted)]/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <iframe
            src={siteSettings.mapsEmbedUrl}
            className="h-[360px] w-full rounded-xl border border-[var(--border)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${siteSettings.siteName} office location`}
          />
        </div>
      </section>
    </main>
  );
}
