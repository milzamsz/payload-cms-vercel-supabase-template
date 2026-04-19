import type { Metadata } from "next";
import Link from "next/link";
import { faqs, pricingTiers, siteSettings } from "@/lib/it-services-content";

export const metadata: Metadata = {
  title: `Pricing \u2014 ${siteSettings.siteName}`,
  description:
    "Simple, published pricing for managed IT and cloud engagements. Custom pricing for enterprise and regulated customers.",
};

export default function PricingPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
          Pricing
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl">
          Simple pricing. No per-ticket surprises.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
          Our pricing scales with team size and coverage, not with how many
          things broke that month. Custom pricing for regulated environments or
          multi-region deployments.
        </p>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--muted)]/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <article
                key={tier.slug}
                className={`flex flex-col rounded-xl border p-8 ${
                  tier.highlight
                    ? "border-[var(--primary)] bg-white shadow-lg"
                    : "border-[var(--border)] bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl text-[var(--foreground)]">
                      {tier.name}
                    </h2>
                    {tier.highlight ? (
                      <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--primary)]">
                        Most common
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="font-serif text-4xl text-[var(--foreground)]">
                      {tier.price}
                    </span>
                    {tier.cadence ? (
                      <span className="text-sm text-[var(--muted-foreground)]">
                        {tier.cadence}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-4 text-sm text-[var(--muted-foreground)]">
                    {tier.description}
                  </p>
                </div>
                <ul className="mt-8 flex-1 space-y-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--foreground)]">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="text-[var(--primary)]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.ctaHref}
                  className={`mt-8 inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition ${
                    tier.highlight
                      ? "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                      : "border border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-[var(--muted)]"
                  }`}
                >
                  {tier.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
          Pricing questions
        </h2>
        <dl className="mt-10 divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] bg-white">
          {faqs.map((faq) => (
            <div key={faq.question} className="px-6 py-6">
              <dt className="font-serif text-lg text-[var(--foreground)]">
                {faq.question}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
