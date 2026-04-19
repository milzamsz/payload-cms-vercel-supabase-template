import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, siteSettings } from "@/lib/it-services-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: `Post not found \u2014 ${siteSettings.siteName}`,
    };
  }
  return {
    title: `${post.title} \u2014 ${siteSettings.siteName}`,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Link
          href="/blog"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]"
        >
          ← Back to blog
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
          {post.category}
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-6 text-sm text-[var(--muted-foreground)]">
          By {post.author.name} · {post.author.role} · {formatDate(post.date)} ·{" "}
          {post.readTime}
        </p>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-neutral mt-10 max-w-none space-y-6 text-base leading-relaxed text-[var(--foreground)]">
          {post.body.split(/\n\s*\n/).map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="border-t border-[var(--border)] bg-[var(--muted)]/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-serif text-2xl tracking-tight text-[var(--foreground)] sm:text-3xl">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-white transition hover:border-[var(--primary)]/60 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-lg text-[var(--foreground)]">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
