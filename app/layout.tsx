import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Timezone Converter - Convert Times Between Timezones",
  description:
    "Convert times between timezones with automatic DST handling. Free online timezone converter supporting 300+ timezones worldwide.",
  keywords: [
    "timezone converter",
    "time zone converter",
    "world clock",
    "time conversion",
    "DST converter",
    "daylight saving time",
    "international time",
    "time difference",
    "タイムゾーン変換",
    "時差計算",
    "世界時計",
    "時間変換",
  ],
  metadataBase: new URL("https://timezone-converter-liart.vercel.app/"),
  alternates: {
    canonical: "https://timezone-converter-liart.vercel.app/",
    languages: {
      en: "https://timezone-converter-liart.vercel.app/en",
      ja: "https://timezone-converter-liart.vercel.app/ja",
    },
  },
  openGraph: {
    title: "Timezone Converter",
    description:
      "Convert times between timezones with automatic DST handling. Free online tool.",
    type: "website",
    url: "https://timezone-converter-liart.vercel.app/",
    siteName: "Timezone Converter",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timezone Converter",
    description: "Convert times between timezones with automatic DST handling",
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌐</text></svg>',
  },
  verification: {
    google: "qDjNwUaLfOwddmNI75rPqLANJJNBCRsKXySsNayn_ZI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Timezone Converter",
  description:
    "Convert times between timezones with automatic DST handling. Free online timezone converter supporting 300+ timezones worldwide.",
  url: "https://timezone-converter-liart.vercel.app/",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Convert times between 300+ timezones",
    "Automatic DST (Daylight Saving Time) handling",
    "Support for multiple languages (English, Japanese)",
    "Real-time conversion",
    "Dark mode support",
  ],
  inLanguage: ["en", "ja"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8445672656091773"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
