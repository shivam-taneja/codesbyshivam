import { siteConfig } from "./site";

type ProfileStats = {
  combinedAudience?: number;
  updatedAt?: string;
};

export function creatorPerson(stats?: ProfileStats) {
  const person: Record<string, unknown> = {
    "@type": "Person",
    name: siteConfig.author,
    alternateName: [siteConfig.brandName, siteConfig.handle],
    url: siteConfig.url,
    image: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    knowsAbout: [
      "Software engineering",
      "AI tools",
      "Tech content",
      "Build in public",
    ],
    sameAs: [...siteConfig.sameAs],
  };

  if (stats?.combinedAudience && stats.combinedAudience > 0) {
    person.interactionStatistic = {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/FollowAction",
      userInteractionCount: stats.combinedAudience,
    };
  }

  return person;
}

export function profilePageSchema(stats?: ProfileStats) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: creatorPerson(stats),
    ...(stats?.updatedAt ? { dateModified: stats.updatedAt } : {}),
  };
}

export function mediaKitPageSchema(stats?: ProfileStats) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Media Kit — Brand Partnerships | codesbyshivam",
    url: `${siteConfig.url}/media-kit`,
    description:
      "Audience, platforms, top posts, and collaboration formats for brands working with Shivam Taneja / codesbyshivam.",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: creatorPerson(stats),
    ...(stats?.updatedAt ? { dateModified: stats.updatedAt } : {}),
  };
}
