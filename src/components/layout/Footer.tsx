import Link from "next/link";
import {
  footerColumns,
  siteSettings,
  socialLinks,
} from "@/lib/it-services-content";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--muted)]/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_repeat(3,1fr)] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--primary)] text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden
              >
                <polygon points="12 2 15 8 22 9 17 14 18 21 12 17.8 6 21 7 14 2 9 9 8 12 2" />
              </svg>
            </span>
            <span className="font-serif text-lg tracking-tight">
              {siteSettings.siteName}
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-[var(--muted-foreground)]">
            {siteSettings.description}
          </p>
          <div className="mt-6 space-y-1 text-sm text-[var(--muted-foreground)]">
            <p>{siteSettings.address}</p>
            <p>
              <a
                href={`mailto:${siteSettings.email}`}
                className="hover:text-[var(--foreground)]"
              >
                {siteSettings.email}
              </a>
            </p>
            <p>{siteSettings.phone}</p>
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]">
              {column.title}
            </p>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-[var(--muted-foreground)] sm:flex-row sm:px-6 lg:px-8">
          <p>{siteSettings.copyright}</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--foreground)]"
              >
                {social.label}
              </a>
            ))}
            <Link
              href="/legal/privacy-policy"
              className="hover:text-[var(--foreground)]"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
