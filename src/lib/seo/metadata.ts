import type { Metadata } from "next";
import { siteConfig } from "./site";

type PageSeoInput = {
  title: string;
  description?: string;
  path?: string;
  /** Use absolute title (skip the root template). */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

/** Build per-route metadata. Add OG images / canonicals here over time. */
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
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      title,
      description,
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : {}),
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180" }],
  },
};

export const homeMetadata = pageMetadata({
  title: "codesbyshivam | Shivam Taneja, Developer Content Creator",
  description:
    "Videos on AI tools, developer life, and tech with personality. Explore content by Shivam Taneja and get in touch for brand partnerships.",
  path: "/",
  absoluteTitle: true,
});

export const mediaKitMetadata = pageMetadata({
  title: "Media kit",
  description: "Media kit for Shivam Taneja / codesbyshivam.",
  path: "/media-kit",
});

export const notFoundMetadata = pageMetadata({
  title: "Page Not Found",
  path: "/404",
  noIndex: true,
});
