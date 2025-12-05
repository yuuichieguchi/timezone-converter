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
      <body>{children}</body>
    </html>
  );
}
