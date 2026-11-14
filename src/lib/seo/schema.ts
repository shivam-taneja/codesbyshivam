import { siteConfig } from "./site";

export const creatorPerson = {
  "@type": "Person" as const,
  name: siteConfig.author,
  alternateName: siteConfig.handle,
  url: siteConfig.url,
  jobTitle: "Developer Content Creator",
  sameAs: [
    siteConfig.links.instagram,
    siteConfig.links.youtube,
    siteConfig.links.x,
    siteConfig.links.threads,
    siteConfig.links.portfolio,
  ],
};

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: siteConfig.title,
    mainEntity: creatorPerson,
  };
}
