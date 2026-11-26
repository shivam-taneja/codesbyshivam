import { Image, Page, Path, Svg, Text, View } from "@react-pdf/renderer";
import { compact, fmt, headlineFor, type PlatformStats } from "@/lib/media-kit";
import { pillars } from "../media-kit-content";
import { PdfSectionHeading } from "./section-heading";
import { pdfColors, pdfStyles as styles } from "./styles";
import { pdfSafeText } from "./text";

function publicSrc(path: string) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}${path}`;
}

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
  views30d,
  avgEngagement30d,
  audienceGrowth30dPct,
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
  views30d: number;
  avgEngagement30d?: number;
  audienceGrowth30dPct?: number;
}) {
  const showGrowth = audienceGrowth30dPct != null && audienceGrowth30dPct > 0;
  const growthLabel = showGrowth
    ? `+${audienceGrowth30dPct.toFixed(audienceGrowth30dPct >= 10 ? 0 : 1)}% / 30d`
    : null;

  return (
    <Page size="A4" style={styles.page} wrap={false}>
      <View style={styles.header} wrap={false}>
        <Text style={styles.labelDark}>Media Kit • {year}</Text>
        <View>
          <Text style={[styles.label, { textAlign: "right" }]}>{location}</Text>
          <Text style={[styles.label, { textAlign: "right" }]}>
            Updated {updated}
          </Text>
        </View>
      </View>

      <View style={styles.hero} wrap={false}>
        <View style={styles.heroMain}>
          <View style={styles.handleRow}>
            {/* @react-pdf/renderer Image — not an HTML <img> */}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={publicSrc("/avatar-no-bg.png")} style={styles.avatar} />
            <Text style={styles.handle}>&lt;{handle} /&gt;</Text>
          </View>
          <Text style={styles.name}>{firstName}</Text>
          <Text style={styles.nameAccent}>{lastName}</Text>
          <Text style={styles.bio}>{pdfSafeText(bio)}</Text>
        </View>

        <View style={styles.audienceBox}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            src={publicSrc("/audience-card-bg.png")}
            style={styles.audienceBg}
          />
          <View style={styles.audienceContent}>
            <Text style={styles.audienceMeta}>Combined audience</Text>
            <Text style={styles.audienceValue}>
              {compact(combinedAudience)}
            </Text>

            <View style={styles.audienceBlock}>
              <Text style={styles.audienceMeta}>Combined views</Text>
              <Text style={styles.audienceViewsValue}>{compact(views30d)}</Text>
            </View>

            {avgEngagement30d != null ? (
              <View style={styles.audienceDivider}>
                <Text style={styles.audienceMeta}>Avg. engagement</Text>
                <View style={styles.audienceErValueWrap}>
                  <Text style={styles.audienceErValue}>
                    {avgEngagement30d.toFixed(1)}%
                  </Text>
                </View>
              </View>
            ) : null}
          </View>

          {growthLabel ? (
            <View style={styles.audienceGrowthBadge}>
              <Svg width={7} height={6} viewBox="0 0 10 9">
                <Path d="M5 0 L10 9 L0 9 Z" fill={pdfColors.accent} />
              </Svg>
              <Text style={styles.audienceGrowthText}>{growthLabel}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View wrap={false}>
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
      </View>

      <View wrap={false}>
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
      </View>
    </Page>
  );
}
