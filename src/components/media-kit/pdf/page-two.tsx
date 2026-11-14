import { Link, Page, Text, View } from "@react-pdf/renderer";
import { formats } from "../media-kit-content";
import { PdfSectionHeading } from "./section-heading";
import { pdfStyles as styles } from "./styles";

export function MediaKitPdfPageTwo({
  year,
  location,
  updated,
  formatsSection,
  email,
  links,
  socials,
}: {
  year: number;
  location: string;
  updated: string;
  formatsSection: string;
  email: string;
  links: { label: string; href: string }[];
  socials?: { label: string; href: string }[];
}) {
  const [emailUser, emailDomain] = email.split("@");

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.labelDark}>Media Kit • {year} / 02</Text>
        <View>
          <Text style={[styles.label, { textAlign: "right" }]}>{location}</Text>
          <Text style={[styles.label, { textAlign: "right" }]}>
            Updated {updated}
          </Text>
        </View>
      </View>

      <PdfSectionHeading n={formatsSection} title="Ways to work together" />
      <View style={styles.formats}>
        {formats.map(([t, d], i) => (
          <View key={t} style={styles.format}>
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

      <View style={styles.footer}>
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
