import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services, siteSettings } from "@/lib/it-services-content";

export const metadata: Metadata = {
  title: `Services \u2014 ${siteSettings.siteName}`,
  description:
    "Managed IT, cloud migration, cybersecurity, custom software, data automation, and support desk services.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
          Services
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl">
          The work we do, described without marketing fluff.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
          Every engagement starts with a short discovery. We are deliberate
          about scope so the work we commit to is work we can be proud of six
          months later.
        </p>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--muted)]/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12">
            {services.map((service, idx) => (
              <article
                key={service.slug}
                id={service.slug}
                className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-2"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-lg ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
                    Service {idx + 1}
                  </p>
                  <h2 className="mt-3 font-serif text-3xl text-[var(--foreground)]">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
                    {service.summary}
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-[var(--foreground)]">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-1 text-[var(--primary)]">→</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--primary)]/90"
                    >
                      Scope this engagement
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
