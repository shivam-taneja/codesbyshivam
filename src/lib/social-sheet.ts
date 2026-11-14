import type {
  Brand,
  BrandDeliverable,
  MediaKitData,
  PlatformStats,
} from "@/lib/media-kit";
import { MEDIA_KIT_BRAND_LIMIT } from "@/lib/media-kit";
import { mediaKitProfile } from "@/data/media-kit";
import {
  SHEET_TABS,
  csvToObjects,
  fetchSheetCsv,
  parseNumber,
} from "@/lib/sheets";
import type { ContentPlatform, SelectedContentItem } from "@/lib/content-types";

export type { ContentPlatform, SelectedContentItem } from "@/lib/content-types";
export { contentPlatforms } from "@/lib/content-types";

const AUDIENCE_LABELS = new Set(["followers", "subscribers"]);

const MEDIA_KIT_PLATFORM_ORDER = [
  "linkedin",
  "x",
  "youtube",
  "instagram",
  "threads",
] as const;

function snapshotToPlatform(row: Record<string, string>): PlatformStats {
  const id = (row.platform || "").trim().toLowerCase();
  const metricLabel = (row.metric_label || "Followers").trim();
  const secondaryLabel = (row.secondary_label || "").trim().toLowerCase();
  const secondaryValue = parseNumber(row.secondary_value);

  const platform: PlatformStats = {
    id,
    name: (row.name || id).trim(),
    handle: (row.handle || "").trim(),
    url: (row.url || "").trim() || undefined,
    followers: parseNumber(row.metric_value) ?? undefined,
    avgViews: parseNumber(row.avg_views) ?? undefined,
    engagementRate: parseNumber(row.engagement_rate_pct) ?? undefined,
    show: (row.status || "active").trim().toLowerCase() !== "inactive",
  };

  if (metricLabel.toLowerCase() === "subscribers") {
    platform.followerLabel = "subscribers";
  }

  if (secondaryLabel.includes("total views") && secondaryValue != null) {
    platform.totalViews = secondaryValue;
  }
  if (secondaryLabel === "posts" && secondaryValue != null) {
    platform.posts = secondaryValue;
  }

  if (id === "threads") {
    platform.show = false;
  }

  return platform;
}

function latestMetricsByPlatform(
  rows: Record<string, string>[],
): Map<string, Record<string, string>> {
  const latest = new Map<string, Record<string, string>>();
  for (const row of rows) {
    const id = (row.platform || "").trim().toLowerCase();
    if (!id) continue;
    const prev = latest.get(id);
    if (!prev || (row.date || "") >= (prev.date || "")) {
      latest.set(id, row);
    }
  }
  return latest;
}

function normalizePlatform(raw: string): ContentPlatform | null {
  const value = raw.trim().toLowerCase();
  if (value === "instagram") return "Instagram";
  if (value === "youtube") return "YouTube";
  if (value === "linkedin") return "LinkedIn";
  return null;
}

function parseTopPosts(csv: string): SelectedContentItem[] {
  return csvToObjects(csv)
    .map((row) => {
      const platform = normalizePlatform(row.platform || "");
      if (!platform) return null;
      const title = (row.title || "").trim();
      if (!title) return null;
      const url = (row.url || "").trim() || undefined;
      const image = (row.thumbnail_url || "").trim() || undefined;
      return {
        title,
        platform,
        url,
        image,
        views: parseNumber(row.views) ?? undefined,
        likes: parseNumber(row.likes) ?? undefined,
        comments: parseNumber(row.comments) ?? undefined,
        engagementRate: parseNumber(row.engagement_rate_pct) ?? undefined,
        rank: parseNumber(row.rank) ?? 999,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a!.platform !== b!.platform) {
        return a!.platform.localeCompare(b!.platform);
      }
      return a!.rank - b!.rank;
    }) as SelectedContentItem[];
}

function titleCasePlatform(raw: string) {
  const value = raw.trim().toLowerCase();
  if (value === "instagram") return "Instagram";
  if (value === "youtube") return "YouTube";
  if (value === "linkedin") return "LinkedIn";
  if (value === "x" || value === "twitter") return "X";
  if (value === "threads") return "Threads";
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function firstNonEmpty(
  rows: Record<string, string>[],
  key: string,
): string | undefined {
  for (const row of rows) {
    const value = (row[key] || "").trim();
    if (value) return value;
  }
  return undefined;
}

function brandScaleScore(rows: Record<string, string>[]) {
  return (
    (parseNumber(firstNonEmpty(rows, "app_downloads")) ?? 0) +
    (parseNumber(firstNonEmpty(rows, "brand_instagram_followers")) ?? 0) +
    (parseNumber(firstNonEmpty(rows, "brand_linkedin_followers")) ?? 0) +
    (parseNumber(firstNonEmpty(rows, "brand_x_followers")) ?? 0) +
    (parseNumber(firstNonEmpty(rows, "brand_youtube_subscribers")) ?? 0)
  );
}

function parseBrands(csv: string): Brand[] {
  const rows = csvToObjects(csv);
  const byBrand = new Map<string, Record<string, string>[]>();

  for (const row of rows) {
    const name = (row.brand || "").trim();
    if (!name) continue;
    const list = byBrand.get(name) ?? [];
    list.push(row);
    byBrand.set(name, list);
  }

  const ranked = [...byBrand.entries()].map(([name, brandRows]) => {
    const deliverables: BrandDeliverable[] = brandRows
      .map((row) => {
        const platform = titleCasePlatform(row.platform || "");
        const type = (row.deliverable_type || "").trim();
        const url =
          (row.canonical_url || "").trim() ||
          (row.link || "").trim() ||
          undefined;
        if (!platform && !type && !url) return null;
        return {
          platform: platform || "Post",
          type,
          url,
          views: parseNumber(row.views) ?? undefined,
          engagementRate: parseNumber(row.engagement_rate_pct) ?? undefined,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const viewsDelta = (b!.views ?? 0) - (a!.views ?? 0);
        if (viewsDelta !== 0) return viewsDelta;
        return (b!.engagementRate ?? 0) - (a!.engagementRate ?? 0);
      }) as BrandDeliverable[];

    const viralityScore = deliverables.reduce(
      (max, d) => Math.max(max, d.views ?? 0),
      0,
    );

    return {
      brand: {
        name,
        website: firstNonEmpty(brandRows, "brand_website"),
        category: firstNonEmpty(brandRows, "brand_category"),
        deliverables,
      } satisfies Brand,
      scaleScore: brandScaleScore(brandRows),
      viralityScore,
    };
  });

  return ranked
    .sort((a, b) => {
      if (b.scaleScore !== a.scaleScore) return b.scaleScore - a.scaleScore;
      return b.viralityScore - a.viralityScore;
    })
    .slice(0, MEDIA_KIT_BRAND_LIMIT)
    .map((entry) => entry.brand);
}

export async function getSelectedContent(): Promise<SelectedContentItem[]> {
  try {
    const csv = await fetchSheetCsv(SHEET_TABS.topPosts);
    return parseTopPosts(csv);
  } catch {
    return [];
  }
}

export async function getMediaKitData(): Promise<MediaKitData> {
  try {
    const [metricsCsv, topPostsCsv, brandsCsv] = await Promise.all([
      fetchSheetCsv(SHEET_TABS.metrics),
      fetchSheetCsv(SHEET_TABS.topPosts),
      fetchSheetCsv(SHEET_TABS.brands).catch(() => ""),
    ]);

    const rows = csvToObjects(metricsCsv);
    const latest = latestMetricsByPlatform(rows);
    const topPosts = parseTopPosts(topPostsCsv);
    const workedWith = brandsCsv ? parseBrands(brandsCsv) : [];

    const platforms: PlatformStats[] = [];
    for (const id of MEDIA_KIT_PLATFORM_ORDER) {
      const row = latest.get(id);
      if (!row) continue;
      platforms.push(snapshotToPlatform(row));
    }

    let combinedAudience = 0;
    let updatedAt = "";

    for (const row of latest.values()) {
      const status = (row.status || "active").trim().toLowerCase();
      const label = (row.metric_label || "").trim().toLowerCase();
      const value = parseNumber(row.metric_value);
      const id = row.platform.trim().toLowerCase();
      if (
        status === "active" &&
        value != null &&
        AUDIENCE_LABELS.has(label) &&
        MEDIA_KIT_PLATFORM_ORDER.includes(
          id as (typeof MEDIA_KIT_PLATFORM_ORDER)[number],
        ) &&
        id !== "threads"
      ) {
        combinedAudience += value;
      }
      const synced = (row.synced_at || "").trim();
      if (synced && synced > updatedAt) updatedAt = synced;
    }

    return {
      name: mediaKitProfile.name,
      handle: mediaKitProfile.handle,
      location: mediaKitProfile.location,
      bio: mediaKitProfile.bio,
      email: mediaKitProfile.email,
      links: mediaKitProfile.links,
      socials: mediaKitProfile.socials,
      workedWith,
      updatedAt: updatedAt || new Date().toISOString(),
      combinedAudience,
      platforms,
      topPosts,
    };
  } catch {
    return {
      name: mediaKitProfile.name,
      handle: mediaKitProfile.handle,
      location: mediaKitProfile.location,
      bio: mediaKitProfile.bio,
      email: mediaKitProfile.email,
      links: mediaKitProfile.links,
      socials: mediaKitProfile.socials,
      workedWith: [],
      updatedAt: new Date().toISOString(),
      combinedAudience: 0,
      platforms: [],
      topPosts: [],
    };
  }
}
