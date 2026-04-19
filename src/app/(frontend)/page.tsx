import Link from "next/link";
import Image from "next/image";
import {
  faqs,
  hero,
  logos,
  processSteps,
  services,
  siteSettings,
  testimonials,
} from "@/lib/it-services-content";

export default function HomePage() {
  const heroLines = hero.heading.split("\n");

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={hero.backgroundImage}
            alt=""
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28 lg:pb-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            {heroLines.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
            {hero.subheading}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--primary)]/90"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--muted)]"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-10 sm:grid-cols-4">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-serif text-2xl text-[var(--foreground)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--muted)]/40 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 md:max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            Services
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
            A focused set of services we run every day.
          </h2>
          <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
            We are not generalists pretending to do everything. Here is what our
            teams ship best, with clients you can actually talk to.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="group flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-white transition hover:border-[var(--primary)]/60 hover:shadow-md"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-serif text-xl text-[var(--foreground)]">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {service.summary}
                </p>
                <ul className="mt-auto space-y-1.5 pt-4 text-sm text-[var(--foreground)]">
                  {service.bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[var(--primary)]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--muted)]/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
              How we work
            </p>
            <h2 className="font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
              Four short phases. No surprises.
            </h2>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 md:max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            Client stories
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
            What clients say after a year with us.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col gap-6 rounded-lg border border-[var(--border)] bg-white p-6"
            >
              <blockquote className="text-base leading-relaxed text-[var(--foreground)]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto border-t border-[var(--border)] pt-4 text-sm">
                <p className="font-semibold text-[var(--foreground)]">
                  {item.name}
                </p>
                <p className="text-[var(--muted-foreground)]">
                  {item.title} · {item.company}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-[var(--muted)]/40 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
              Questions
            </p>
            <h2 className="font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
              The ones we get asked most often.
            </h2>
          </div>
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col items-start gap-8 rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--primary)]/95 to-[var(--primary)] p-10 text-white lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              Ready to hand off the infrastructure grind?
            </h2>
            <p className="mt-3 text-base text-white/85">
              Tell us what is on fire or what you are planning next. First call
              is free, and you will talk to an engineer, not a sales rep.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] shadow-sm transition hover:bg-white/90"
            >
              Book a call
            </Link>
            <Link
              href={`mailto:${siteSettings.email}`}
              className="inline-flex items-center justify-center rounded-md border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Email us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
