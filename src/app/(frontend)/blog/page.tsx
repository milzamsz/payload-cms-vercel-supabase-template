import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  blogPosts,
  blogCategories,
  siteSettings,
} from "@/lib/it-services-content";

export const metadata: Metadata = {
  title: `Blog \u2014 ${siteSettings.siteName}`,
  description:
    "Practical notes from the field on cloud migration, security, automation, and running platforms at scale.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
          Blog
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl">
          Short, useful notes from real projects.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
          No &ldquo;10 things you need to know&rdquo; listicles. Just the
          playbooks, post-mortems, and tradeoffs we have found worth writing
          down.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid gap-8 overflow-hidden rounded-xl border border-[var(--border)] bg-white lg:grid-cols-[1.2fr_1fr]"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
              {featured.category}
            </p>
            <h2 className="font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
              {featured.title}
            </h2>
            <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
              {featured.excerpt}
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">
              {formatDate(featured.date)} · {featured.readTime}
            </p>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-white transition hover:border-[var(--primary)]/60 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
                  {post.category}
                </p>
                <h3 className="font-serif text-xl leading-tight text-[var(--foreground)]">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {post.excerpt}
                </p>
                <p className="mt-auto pt-4 text-xs text-[var(--muted-foreground)]">
                  {formatDate(post.date)} · {post.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
