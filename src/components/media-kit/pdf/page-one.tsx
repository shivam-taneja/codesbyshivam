import { Page, Text, View } from "@react-pdf/renderer";
import {
  compact,
  fmt,
  headlineFor,
  type PlatformStats,
} from "@/lib/media-kit";
import { pillars } from "../media-kit-content";
import { PdfSectionHeading } from "./section-heading";
import { pdfStyles as styles } from "./styles";
import { pdfSafeText } from "./text";

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
}) {
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
          <Text style={styles.handle}>&lt;{handle} /&gt;</Text>
          <Text style={styles.name}>{firstName}</Text>
          <Text style={styles.nameAccent}>{lastName}</Text>
          <Text style={styles.bio}>{pdfSafeText(bio)}</Text>
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
