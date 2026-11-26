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

/** Platforms shown on the media kit + rolled into combined audience. */
const MEDIA_KIT_PLATFORM_ORDER = [
  "linkedin",
  "facebook",
  "youtube",
  "instagram",
  "threads",
] as const;

const WINDOW_DAYS = 30;

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

function parseSheetDate(raw: string): Date | null {
  const value = raw.trim();
  if (!value) return null;
  // Sheet dates are YYYY-MM-DD
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return null;
  return new Date(
    Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])),
  );
}

function audienceValue(row: Record<string, string>): number | null {
  const status = (row.status || "active").trim().toLowerCase();
  if (status === "inactive") return null;
  const label = (row.metric_label || "").trim().toLowerCase();
  if (!AUDIENCE_LABELS.has(label)) return null;
  return parseNumber(row.metric_value);
}

function secondaryViews30d(row: Record<string, string>): number | null {
  const label = (row.secondary_label || "").trim().toLowerCase();
  if (label !== "views (30d)") return null;
  return parseNumber(row.secondary_value);
}

function secondaryTotalViews(row: Record<string, string>): number | null {
  const label = (row.secondary_label || "").trim().toLowerCase();
  if (!label.includes("total views")) return null;
  return parseNumber(row.secondary_value);
}

/**
 * Combined audience, 30d views, 30d avg ER, 30d audience growth %
 * from the full metrics history.
 */
function computeWindowMetrics(rows: Record<string, string>[]): {
  combinedAudience: number;
  views30d: number;
  avgEngagement30d?: number;
  audienceGrowth30dPct?: number;
  updatedAt: string;
} {
  const byPlatform = new Map<string, Record<string, string>[]>();
  for (const row of rows) {
    const id = (row.platform || "").trim().toLowerCase();
    if (!id) continue;
    const list = byPlatform.get(id) ?? [];
    list.push(row);
    byPlatform.set(id, list);
  }

  for (const list of byPlatform.values()) {
    list.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  }

  let latestDate: Date | null = null;
  let updatedAt = "";

  for (const id of MEDIA_KIT_PLATFORM_ORDER) {
    const list = byPlatform.get(id);
    if (!list?.length) continue;
    const last = list[list.length - 1];
    const d = parseSheetDate(last.date || "");
    if (d && (!latestDate || d > latestDate)) latestDate = d;
    const synced = (last.synced_at || "").trim();
    if (synced && synced > updatedAt) updatedAt = synced;
  }

  if (!latestDate) {
    return { combinedAudience: 0, views30d: 0, updatedAt };
  }

  const windowStart = new Date(latestDate);
  windowStart.setUTCDate(windowStart.getUTCDate() - WINDOW_DAYS);

  function rowOnOrBefore(
    list: Record<string, string>[],
    target: Date,
  ): Record<string, string> | null {
    let pick: Record<string, string> | null = null;
    for (const row of list) {
      const d = parseSheetDate(row.date || "");
      if (!d) continue;
      if (d <= target) pick = row;
      else break;
    }
    return pick ?? list[0] ?? null;
  }

  let combinedAudience = 0;
  let audienceThen = 0;
  let views30d = 0;
  const erSamples: number[] = [];

  for (const id of MEDIA_KIT_PLATFORM_ORDER) {
    const list = byPlatform.get(id);
    if (!list?.length) continue;
    const nowRow = list[list.length - 1];
    const thenRow = rowOnOrBefore(list, windowStart);

    const nowAud = audienceValue(nowRow);
    if (nowAud != null) combinedAudience += nowAud;
    if (thenRow) {
      const thenAud = audienceValue(thenRow);
      if (thenAud != null) audienceThen += thenAud;
    }

    // Direct Views (30d) — IG / Threads / Facebook
    const v30 = secondaryViews30d(nowRow);
    if (v30 != null) views30d += v30;

    // YouTube: derive 30d from cumulative Total views
    if (id === "youtube" && thenRow) {
      const nowTotal = secondaryTotalViews(nowRow);
      const thenTotal = secondaryTotalViews(thenRow);
      if (nowTotal != null && thenTotal != null && nowTotal >= thenTotal) {
        views30d += nowTotal - thenTotal;
      }
    }

    for (const row of list) {
      const d = parseSheetDate(row.date || "");
      if (!d || d < windowStart || d > latestDate) continue;
      const er = parseNumber(row.engagement_rate_pct);
      if (er != null) erSamples.push(er);
    }
  }

  const avgEngagement30d = erSamples.length
    ? erSamples.reduce((a, b) => a + b, 0) / erSamples.length
    : undefined;

  let audienceGrowth30dPct: number | undefined;
  if (audienceThen > 0 && combinedAudience > 0) {
    audienceGrowth30dPct =
      ((combinedAudience - audienceThen) / audienceThen) * 100;
  }

  return {
    combinedAudience,
    views30d,
    avgEngagement30d,
    audienceGrowth30dPct,
    updatedAt,
  };
}

function normalizePlatform(raw: string): ContentPlatform | null {
  const value = raw.trim().toLowerCase();
  if (value === "instagram") return "Instagram";
  if (value === "youtube") return "YouTube";
  if (value === "linkedin") return "LinkedIn";
  if (value === "facebook" || value === "fb") return "Facebook";
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
  if (value === "facebook" || value === "fb") return "Facebook";
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const BRAND_VIDEO_PLATFORMS = new Set([
  "instagram",
  "youtube",
  "facebook",
  "linkedin",
]);

/** Video types used to pick which brands make the cut. */
function isVideoDeliverable(type: string) {
  const value = type.trim().toLowerCase();
  return value === "reel" || value === "short" || value === "video";
}

function deliverableFromRow(
  row: Record<string, string>,
): BrandDeliverable | null {
  const platform = titleCasePlatform(row.platform || "");
  const type = (row.deliverable_type || "").trim();
  const url =
    (row.canonical_url || "").trim() || (row.link || "").trim() || undefined;
  if (!platform && !type && !url) return null;
  return {
    platform: platform || "Post",
    type,
    url,
    views: parseNumber(row.views) ?? undefined,
    engagementRate: parseNumber(row.engagement_rate_pct) ?? undefined,
  };
}

function sortDeliverables(a: BrandDeliverable, b: BrandDeliverable) {
  const viewsDelta = (b.views ?? 0) - (a.views ?? 0);
  if (viewsDelta !== 0) return viewsDelta;
  return (b.engagementRate ?? 0) - (a.engagementRate ?? 0);
}

/**
 * 1. Rank brands by their single best video views across IG / YT / FB / LinkedIn.
 * 2. Take the top brands, then show every deliverable made for them.
 */
function parseBrands(csv: string): Brand[] {
  const byBrand = new Map<
    string,
    { deliverables: BrandDeliverable[]; bestVideoViews: number }
  >();

  for (const row of csvToObjects(csv)) {
    const name = (row.brand || "").trim();
    if (!name) continue;
    const deliverable = deliverableFromRow(row);
    if (!deliverable) continue;

    const entry = byBrand.get(name) ?? {
      deliverables: [],
      bestVideoViews: 0,
    };
    entry.deliverables.push(deliverable);

    const platformId = (row.platform || "").trim().toLowerCase();
    if (
      BRAND_VIDEO_PLATFORMS.has(platformId) &&
      isVideoDeliverable(deliverable.type)
    ) {
      entry.bestVideoViews = Math.max(
        entry.bestVideoViews,
        deliverable.views ?? 0,
      );
    }

    byBrand.set(name, entry);
  }

  return [...byBrand.entries()]
    .filter(([, entry]) => entry.bestVideoViews > 0)
    .sort((a, b) => b[1].bestVideoViews - a[1].bestVideoViews)
    .slice(0, MEDIA_KIT_BRAND_LIMIT)
    .map(
      ([name, entry]) =>
        ({
          name,
          deliverables: [...entry.deliverables].sort(sortDeliverables),
        }) satisfies Brand,
    );
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
    const windowMetrics = computeWindowMetrics(rows);

    const platforms: PlatformStats[] = [];
    for (const id of MEDIA_KIT_PLATFORM_ORDER) {
      const row = latest.get(id);
      if (!row) continue;
      platforms.push(snapshotToPlatform(row));
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
      updatedAt: windowMetrics.updatedAt || new Date().toISOString(),
      combinedAudience: windowMetrics.combinedAudience,
      views30d: windowMetrics.views30d,
      avgEngagement30d: windowMetrics.avgEngagement30d,
      audienceGrowth30dPct: windowMetrics.audienceGrowth30dPct,
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
      views30d: 0,
      platforms: [],
      topPosts: [],
    };
  }
}
