import { Link, Page, Text, View } from "@react-pdf/renderer";
import { compact, type Brand, type TopPost } from "@/lib/media-kit";
import { formats } from "../media-kit-content";
import { PdfSectionHeading } from "./section-heading";
import { pdfColors, pdfStyles as styles } from "./styles";
import { pdfSafeText } from "./text";

export function MediaKitPdfPageTwo({
  year,
  location,
  updated,
  topPosts,
  brands,
  postsSection,
  brandsSection,
  formatsSection,
  email,
  links,
  socials,
}: {
  year: number;
  location: string;
  updated: string;
  topPosts: TopPost[];
  brands: Brand[];
  postsSection: string;
  brandsSection: string;
  formatsSection: string;
  email: string;
  links: { label: string; href: string }[];
  socials?: { label: string; href: string }[];
}) {
  const [emailUser, emailDomain] = email.split("@");

  return (
    <Page size="A4" style={styles.page} wrap={false}>
      <View style={styles.header} wrap={false}>
        <Text style={styles.labelDark}>Media Kit • {year} / 02</Text>
        <View>
          <Text style={[styles.label, { textAlign: "right" }]}>{location}</Text>
          <Text style={[styles.label, { textAlign: "right" }]}>
            Updated {updated}
          </Text>
        </View>
      </View>

      {topPosts.length > 0 ? (
        <View wrap={false}>
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

              const title = pdfSafeText(post.title);
              const body = (
                <>
                  <Text
                    style={[
                      styles.labelDark,
                      { color: pdfColors.foreground, textDecoration: "none" },
                    ]}
                  >
                    {post.platform}
                  </Text>
                  <Text style={styles.postTitle}>{title}</Text>
                  {meta ? (
                    <Text
                      style={[styles.accentTiny, { textDecoration: "none" }]}
                    >
                      {meta}
                    </Text>
                  ) : null}
                </>
              );

              return post.url ? (
                <Link
                  key={`${post.platform}-${post.rank}-${post.title}`}
                  src={post.url}
                  style={styles.post}
                >
                  {body}
                </Link>
              ) : (
                <View
                  key={`${post.platform}-${post.rank}-${post.title}`}
                  style={styles.post}
                >
                  {body}
                </View>
              );
            })}
          </View>
        </View>
      ) : null}

      {brands.length > 0 ? (
        <View style={{ marginTop: 14 }} wrap={false}>
          <PdfSectionHeading n={brandsSection} title="Worked with" />
          <Text style={styles.monoTiny}>
            {brands.map((b) => b.name).join("  ·  ")}
          </Text>
        </View>
      ) : null}

      <View style={{ marginTop: topPosts.length > 0 ? 16 : 0 }} wrap={false}>
        <PdfSectionHeading n={formatsSection} title="Ways to work together" />
        <View style={styles.formats}>
          {formats.map(([t, d], i) => (
            <View key={t} style={styles.format} wrap={false}>
              <Text style={styles.monoTiny}>/0{i + 1}</Text>
              <Text style={styles.formatTitle}>{t}</Text>
              <Text style={styles.formatBody}>{d}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.footnote}>
          Bundles across platforms available • Rates shared on request • Open to
          long-term ambassadorships
        </Text>
      </View>

      <View style={styles.footer} wrap={false}>
        <View>
          <Text style={styles.label}>Let&apos;s build something</Text>
          <Link src={`mailto:${email}`} style={styles.email}>
            <Text>
              {emailUser}@
              <Text style={styles.emailAccent}>{emailDomain}</Text>
            </Text>
          </Link>
        </View>
        <View style={styles.footerLinks}>
          {links.map((l) => (
            <Link key={l.href} src={l.href} style={styles.footerLink}>
              {l.label}
            </Link>
          ))}
          {(socials?.length ?? 0) > 0 ? (
            <View style={styles.socialRow}>
              {socials!.map((s, i) => (
                <Link key={s.href} src={s.href} style={styles.footerLink}>
                  {i > 0 ? "• " : ""}
                  {s.label}
                </Link>
              ))}
            </View>
          ) : null}
        </View>
      </View>
    </Page>
  );
}
