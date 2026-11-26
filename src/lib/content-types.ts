export type ContentPlatform =
  | "Instagram"
  | "YouTube"
  | "LinkedIn"
  | "Facebook";

export type SelectedContentItem = {
  title: string;
  platform: ContentPlatform;
  image?: string;
  url?: string;
  views?: number;
  likes?: number;
  comments?: number;
  engagementRate?: number;
  rank: number;
};

export const contentPlatforms: ContentPlatform[] = [
  "Instagram",
  "YouTube",
  "LinkedIn",
  "Facebook",
];

export const contentPlatformUrls: Record<ContentPlatform, string> = {
  Instagram: "https://www.instagram.com/codesbyshivam/",
  YouTube: "https://www.youtube.com/@codesbyshivam",
  LinkedIn: "https://www.linkedin.com/in/shivam-taneja/",
  Facebook: "https://www.facebook.com/people/Shivam-Taneja/100010113163950/",
};
