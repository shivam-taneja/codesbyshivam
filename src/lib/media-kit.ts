export type PlatformStats = {
  id: string;
  name: string;
  handle: string;
  url?: string;
  show?: boolean;
  followers?: number;
  followerLabel?: string;
  avgViews?: number;
  totalViews?: number;
  posts?: number;
  engagementRate?: number;
};

export type Brand = { name: string; logoUrl?: string; postUrl?: string };

export type MediaKitData = {
  name: { first: string; last: string };
  handle: string;
  location: string;
  bio: string;
  email: string;
  updatedAt: string;
  combinedAudience: number;
  platforms: PlatformStats[];
  workedWith?: Brand[];
  links: string[];
};

/** Views headline when avg views are at least this many times followers. */
export const VIEWS_HEADLINE_RATIO = 3;

export function headlineFor(p: PlatformStats) {
  const followers = p.followers ?? 0;
  const views = p.avgViews ?? 0;
  const useViews = views > 0 && views >= followers * VIEWS_HEADLINE_RATIO;
  return useViews
    ? {
        value: views,
        label: "avg views",
        secondary: followers
          ? `${fmt(followers)} ${p.followerLabel ?? "followers"}`
          : undefined,
      }
    : {
        value: followers,
        label: p.followerLabel ?? "followers",
        secondary: views ? `${fmt(views)} avg views` : undefined,
      };
}

export function fmt(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

export function compact(n: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function avgEngagement(platforms: PlatformStats[]) {
  const ers = platforms
    .map((p) => p.engagementRate)
    .filter((v): v is number => typeof v === "number");
  return ers.length ? ers.reduce((a, b) => a + b, 0) / ers.length : undefined;
}

export function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
