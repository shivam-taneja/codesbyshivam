import { Link, Page, Text, View } from "@react-pdf/renderer";
import {
  compact,
  fmt,
  headlineFor,
  type Brand,
  type PlatformStats,
  type TopPost,
} from "@/lib/media-kit";
import { pillars } from "../media-kit-content";
import { PdfSectionHeading } from "./section-heading";
import { pdfStyles as styles } from "./styles";

export function MediaKitPdfPageOne({
  year,
  location,
  updated,
  handle,
  firstName,
  lastName,
  bio,
  combinedAudience,
  platforms,
  totalViews,
  avgEngagement,
  topPosts,
  brands,
  postsSection,
  brandsSection,
}: {
  year: number;
  location: string;
  updated: string;
  handle: string;
  firstName: string;
  lastName: string;
  bio: string;
  combinedAudience: number;
  platforms: PlatformStats[];
  totalViews: number;
  avgEngagement?: number;
  topPosts: TopPost[];
  brands: Brand[];
  postsSection: string;
  brandsSection: string;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.labelDark}>Media Kit • {year}</Text>
        <View>
          <Text style={[styles.label, { textAlign: "right" }]}>{location}</Text>
          <Text style={[styles.label, { textAlign: "right" }]}>
            Updated {updated}
          </Text>
        </View>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroMain}>
          <Text style={styles.handle}>&lt;{handle} /&gt;</Text>
          <Text style={styles.name}>{firstName}</Text>
          <Text style={styles.nameAccent}>{lastName}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
        <View style={styles.audienceBox}>
          <Text style={[styles.label, { color: "#f2eee699" }]}>
            Combined audience
          </Text>
          <View>
            <Text style={styles.audienceValue}>
              {compact(combinedAudience)}
            </Text>
            <Text style={styles.audienceMeta}>
              followers across {platforms.length} platforms
            </Text>
          </View>
          <View style={styles.audienceStats}>
            {totalViews > 0 ? (
              <View>
                <Text style={styles.signal}>{compact(totalViews)}</Text>
                <Text style={styles.audienceMeta}>total views</Text>
              </View>
            ) : null}
            {avgEngagement !== undefined ? (
              <View>
                <Text style={styles.signal}>{avgEngagement.toFixed(1)}%</Text>
                <Text style={styles.audienceMeta}>avg. engagement</Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <PdfSectionHeading n="A" title="Platforms" />
      <View style={styles.platforms}>
        {platforms.map((p, i) => {
          const h = headlineFor(p);
          return (
            <View
              key={p.id}
              style={[
                styles.platformCol,
                i === 0 ? styles.platformColFirst : {},
              ]}
            >
              <Text style={styles.labelDark}>{p.name}</Text>
              <Text style={styles.monoTiny}>{p.handle}</Text>
              <Text style={styles.platformValue}>{fmt(h.value)}</Text>
              <Text style={styles.monoTiny}>{h.label}</Text>
              {h.secondary ? (
                <Text style={styles.monoTiny}>{h.secondary}</Text>
              ) : null}
              {p.totalViews ? (
                <Text style={styles.monoTiny}>
                  {compact(p.totalViews)} total views
                </Text>
              ) : null}
              {p.posts ? (
                <Text style={styles.monoTiny}>{compact(p.posts)} posts</Text>
              ) : null}
              {p.engagementRate !== undefined ? (
                <Text style={styles.accentTiny}>
                  {p.engagementRate.toFixed(2)}% ER
                </Text>
              ) : null}
            </View>
          );
        })}
      </View>

      <PdfSectionHeading n="B" title="Content pillars" />
      <View style={styles.pillars}>
        {pillars.map(([n, t, d]) => (
          <View key={n} style={styles.pillar}>
            <Text style={styles.accentTiny}>{n}</Text>
            <Text style={styles.pillarTitle}>{t}</Text>
            <Text style={styles.pillarBody}>{d}</Text>
          </View>
        ))}
      </View>

      {topPosts.length > 0 ? (
        <View>
          <PdfSectionHeading n={postsSection} title="Top posts" />
          <View style={styles.posts}>
            {topPosts.map((post) => {
              const meta = [
                post.views != null ? `${compact(post.views)} views` : null,
                post.engagementRate != null
                  ? `${post.engagementRate.toFixed(2)}% ER`
                  : null,
              ]
                .filter(Boolean)
                .join(" • ");

              const inner = (
                <View>
                  <Text style={styles.labelDark}>{post.platform}</Text>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  {meta ? <Text style={styles.accentTiny}>{meta}</Text> : null}
                </View>
              );

              return post.url ? (
                <Link
                  key={`${post.platform}-${post.rank}-${post.title}`}
                  src={post.url}
                  style={styles.post}
                >
                  {inner}
                </Link>
              ) : (
                <View
                  key={`${post.platform}-${post.rank}-${post.title}`}
                  style={styles.post}
                >
                  {inner}
                </View>
              );
            })}
          </View>
        </View>
      ) : null}

      {brands.length > 0 ? (
        <View style={{ marginTop: 14 }}>
          <PdfSectionHeading n={brandsSection} title="Worked with" />
          <Text style={styles.monoTiny}>
            {brands.map((b) => b.name).join("  ·  ")}
          </Text>
        </View>
      ) : null}
    </Page>
  );
}
