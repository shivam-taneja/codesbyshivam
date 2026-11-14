import { creatorSocials } from "@/components/creator/creator-data";

const socialShortLabels: Record<string, string> = {
  YouTube: "YT",
  Instagram: "Insta",
  LinkedIn: "LinkedIn",
  X: "X",
  Threads: "Threads",
};

const socialOrder = ["YouTube", "Instagram", "LinkedIn", "X", "Threads"];

/** Identity / copy only — audience + top posts come from the published sheet. */
export const mediaKitProfile = {
  name: { first: "Shivam", last: "Taneja" },
  handle: "codesbyshivam",
  location: "Bengaluru, IN",
  bio: "Software engineer who ships end-to-end products and documents every step. I make honest, hands-on content for developers and builders.",
  email: "business.shivamtaneja@gmail.com",
  links: [
    {
      label: "shivamtaneja.com",
      href: "https://www.shivamtaneja.com",
    },
    {
      label: "theguyshetoldyouabout.com",
      href: "https://theguyshetoldyouabout.com",
    },
    {
      label: "codesbyshivam.com",
      href: "https://www.codesbyshivam.com",
    },
  ],
  socials: socialOrder
    .map((name) => creatorSocials.find((s) => s.name === name))
    .filter(Boolean)
    .map((s) => ({
      label: socialShortLabels[s!.name] ?? s!.name,
      href: s!.url,
    })),
};
