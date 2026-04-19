import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  aboutPage,
  processSteps,
  siteSettings,
  teamMembers,
} from "@/lib/it-services-content";

export const metadata: Metadata = {
  title: `About \u2014 ${siteSettings.siteName}`,
  description: aboutPage.lead,
};

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            {aboutPage.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl">
            {aboutPage.heading}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted-foreground)]">
            {aboutPage.lead}
          </p>
          {aboutPage.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={aboutPage.image}
            alt="Northstar IT Services team at work"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--muted)]/40 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {aboutPage.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                {stat.label}
              </dt>
              <dd className="mt-2 font-serif text-3xl text-[var(--foreground)]">
                {stat.value}
              </dd>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
              How we work
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
              A calm cadence, start to finish.
            </h2>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2">
            {processSteps.map((step, idx) => (
              <li
                key={step.title}
                className="rounded-lg border border-[var(--border)] bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Step {idx + 1}
                </p>
                <h3 className="mt-2 font-serif text-xl text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--muted)]/40 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
                Values
              </p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
                What our team actually argues about.
              </h2>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2">
              {aboutPage.values.map((value) => (
                <li
                  key={value.title}
                  className="rounded-lg border border-[var(--border)] bg-white p-6"
                >
                  <h3 className="font-serif text-lg text-[var(--foreground)]">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 md:max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            People
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
            A few of the humans you will actually work with.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((person) => (
            <article
              key={person.name}
              className="overflow-hidden rounded-lg border border-[var(--border)] bg-white"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 p-5">
                <p className="font-serif text-lg text-[var(--foreground)]">
                  {person.name}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary)]">
                  {person.role}
                </p>
                <p className="pt-2 text-sm text-[var(--muted-foreground)]">
                  {person.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 rounded-xl border border-[var(--border)] bg-white p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[var(--foreground)] sm:text-3xl">
              Let&rsquo;s talk about your team.
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Book a 30-minute intro. We will come back with a short written
              outline of what we could do together.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary)]/90"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
