import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Timezone Converter",
  description: "Convert times between timezones with automatic DST handling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8445672656091773"
        crossOrigin="anonymous"
      ></script>
      <body>{children}</body>
    </html>
  );
}
