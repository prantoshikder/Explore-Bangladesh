/**
 * Root layout. Sets <html lang>, fonts, site-wide SEO defaults, structured
 * data and the I18nProvider that client components read UI text from.
 */
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollHelpers } from "@/components/layout/ScrollHelpers";
import { I18nProvider } from "@/i18n/client";
import { LOCALE_META, localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { SITE, absoluteUrl, jsonLd } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Fraunces, Hind_Siliguri, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/* Display serif for headings, friendly geometric sans for body copy. */
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});
/* Bangla script fallback (used only for Bangla glyphs; English text keeps the fonts above). */
const hind = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Site-wide SEO defaults. Pages override title/description/canonical
 * via pageMetadata(). Note: a page that sets `openGraph` replaces this object.
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t.meta.siteTitle, template: `%s | ${SITE.name}` },
    description: t.meta.siteDescription,
    applicationName: SITE.name,
    keywords: [...SITE.keywords],
    category: "travel",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: LOCALE_META[locale].ogLocale,
      url: localizePath(locale, "/"),
      title: t.meta.siteTitle,
      description: t.meta.siteDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.siteTitle,
      description: t.meta.siteDescription,
      ...(SITE.twitter ? { site: SITE.twitter, creator: SITE.twitter } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

/** Colours the mobile browser bar in brand green. */
export const viewport: Viewport = {
  themeColor: SITE.themeColor,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const t = getDictionary(locale);

  /** Organization + WebSite structured data (enables the Google sitelinks search box). */
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: SITE.name,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/icon.svg"),
        ...(SITE.socials.length ? { sameAs: SITE.socials } : {}),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl(`${localizePath(locale, "/")}#website`),
        name: SITE.name,
        url: absoluteUrl(localizePath(locale, "/")),
        inLanguage: LOCALE_META[locale].htmlLang,
        publisher: { "@id": absoluteUrl("/#organization") },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: absoluteUrl(
              `${localizePath(locale, "/explore")}?q={search_term_string}`,
            ),
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html
      lang={LOCALE_META[locale].htmlLang}
      className={`${fraunces.variable} ${jakarta.variable} ${hind.variable} h-full antialiased`}
    >
      <body
        suppressContentEditableWarning
        suppressHydrationWarning
        className="flex min-h-full flex-col font-sans"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteJsonLd) }}
        />
        <I18nProvider locale={locale}>
          {/* Keyboard users can jump straight past the navigation */}
          <a
            href="#main"
            className="sr-only rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100"
          >
            {t.nav.skip}
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollHelpers />
        </I18nProvider>
      </body>
    </html>
  );
}
