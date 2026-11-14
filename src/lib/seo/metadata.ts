import type { Metadata } from "next";
import { siteConfig } from "./site";

const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 640,
  alt: "Shivam Taneja, full stack developer in Bangalore (codesbyshivam)",
} as const;

type PageSeoInput = {
  title: string;
  description?: string;
  path?: string;
  /** Use absolute title (skip the root template). */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

/** Build per-route metadata with canonical + social tags. */
export function pageMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  absoluteTitle = false,
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: siteConfig.locale,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title,
      description,
      images: [ogImage.url],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {
          robots: {
            index: true,
            follow: true,
          },
        }),
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  keywords: [
    "codesbyshivam",
    "Shivam Taneja",
    "full stack developer",
    "Bangalore",
    "Bengaluru",
    "developer content creator",
    "AI tools",
    "build in public",
    "tech YouTuber",
    "developer Instagram",
    "brand partnerships",
  ],
  category: "technology",
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    images: [ogImage.url],
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png", sizes: "256x256" },
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "16x16 32x32 48x48 64x64",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const homeMetadata = pageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export const mediaKitMetadata = pageMetadata({
  title: "Media Kit — Brand Partnerships",
  description:
    "Audience, platforms, top posts, and collaboration formats for brands working with Shivam Taneja / codesbyshivam.",
  path: "/media-kit",
});

export const notFoundMetadata: Metadata = {
  title: "Page Not Found",
  description: "This page does not exist on codesbyshivam.",
  robots: {
    index: false,
    follow: false,
  },
};
