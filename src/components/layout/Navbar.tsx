"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, siteSettings } from "@/lib/it-services-content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = navLinks.filter((l) => !l.isButton);
  const ctaItems = navLinks.filter((l) => l.isButton);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border)] bg-white/95 backdrop-blur-md"
          : "bg-white/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
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

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((link) => (
            <Button
              key={link.label}
              asChild
              variant="ghost"
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          {ctaItems.map((cta) => (
            <Button
              key={cta.label}
              asChild
              size="sm"
              className="ml-3 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
            >
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[28rem] border-t border-[var(--border)]" : "max-h-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6 lg:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm ${
                link.isButton
                  ? "bg-[var(--primary)] text-center font-semibold text-white"
                  : "text-[var(--foreground)] hover:bg-[var(--muted)]"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
