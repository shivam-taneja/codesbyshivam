import { formatInTimeZone } from "date-fns-tz";

const INDIA_TZ = "Asia/Kolkata";

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

export type BrandDeliverable = {
  platform: string;
  type: string;
  url?: string;
  views?: number;
  engagementRate?: number;
};

/** Brand selected by best video views; `deliverables` is everything shipped for them. */
export type Brand = {
  name: string;
  deliverables: BrandDeliverable[];
};

/** How many brands to surface — picked by best cross-platform video views. */
export const MEDIA_KIT_BRAND_LIMIT = 3;

export type TopPost = {
  title: string;
  platform: string;
  url?: string;
  image?: string;
  views?: number;
  likes?: number;
  comments?: number;
  engagementRate?: number;
  rank: number;
};

export type MediaKitData = {
  name: { first: string; last: string };
  handle: string;
  location: string;
  bio: string;
  email: string;
  updatedAt: string;
  combinedAudience: number;
  /** Views in the last ~30 days (Views (30d) + YouTube Total views diff). */
  views30d: number;
  /** Mean of daily engagement_rate_pct over the last ~30 days. */
  avgEngagement30d?: number;
  /** Combined-audience growth over the last ~30 days (percent). */
  audienceGrowth30dPct?: number;
  platforms: PlatformStats[];
  topPosts?: TopPost[];
  workedWith?: Brand[];
  links: { label: string; href: string }[];
  socials?: { label: string; href: string }[];
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

/** Display stamp from metrics `synced_at` — date + time in IST. */
export function formatUpdatedAt(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return formatInTimeZone(date, INDIA_TZ, "d MMM yyyy, h:mm a 'IST'");
}

export function updatedAtYear(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return new Date().getFullYear();
  return Number(formatInTimeZone(date, INDIA_TZ, "yyyy"));
}
