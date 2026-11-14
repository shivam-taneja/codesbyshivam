import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MixpanelProvider } from "@/components/providers/mixpanel-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const fontDisplay = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = rootMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col font-sans">
        <MixpanelProvider>{children}</MixpanelProvider>
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
