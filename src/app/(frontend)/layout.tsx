import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { siteSettings } from "@/lib/it-services-content";

const DEFAULT_SITE_URL = "http://localhost:3000";

function getMetadataBase() {
  const rawUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? DEFAULT_SITE_URL;

  try {
    return new URL(rawUrl);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: `${siteSettings.siteName} \u2014 ${siteSettings.tagline}`,
  description: siteSettings.description,
  keywords: [
    "managed IT",
    "cloud migration",
    "cybersecurity",
    "custom software",
    "IT services",
    "B2B IT partner",
  ],
  openGraph: {
    title: siteSettings.siteName,
    description: siteSettings.tagline,
    siteName: siteSettings.siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteSettings.siteName,
    description: siteSettings.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500;8..60,600&display=swap"
        />
      </head>
      <body
        className="min-h-screen flex flex-col antialiased bg-[var(--background)] text-[var(--foreground)]"
        suppressHydrationWarning
      >
        <JsonLdScript />
        <Navbar />
        <div className="flex-1 pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
