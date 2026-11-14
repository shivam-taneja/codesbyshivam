export type ContentPlatform = "Instagram" | "YouTube" | "LinkedIn";

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
];
