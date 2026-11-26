import { Font, StyleSheet } from "@react-pdf/renderer";

export const pdfColors = {
  cream: "#f9f6f1",
  ink: "#17130f",
  foreground: "#1a1512",
  muted: "#645c55",
  accent: "#e8552a",
  border: "#1a15121f",
};

let fontsReady = false;

export function ensurePdfFonts() {
  if (fontsReady) return;
  Font.register({
    family: "InstrumentSerif",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/fontsource/fonts/instrument-serif@5.2.5/latin-400-normal.ttf",
      },
      {
        src: "https://cdn.jsdelivr.net/fontsource/fonts/instrument-serif@5.2.5/latin-400-italic.ttf",
        fontStyle: "italic",
      },
    ],
  });
  Font.register({
    family: "JetBrainsMono",
    src: "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@5.2.5/latin-400-normal.ttf",
  });
  // Color emoji fonts can't embed in PDF — swap glyphs for local Twemoji PNGs.
  // pdfSafeText drops any emoji whose PNG isn't in /public/emoji.
  Font.registerEmojiSource({
    format: "png",
    builder: (code) => {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      return `${origin}/emoji/${code}.png`;
    },
  });
  fontsReady = true;
}

export const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: pdfColors.cream,
    color: pdfColors.foreground,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: pdfColors.foreground,
    paddingBottom: 10,
    marginBottom: 18,
  },
  label: {
    fontFamily: "JetBrainsMono",
    fontSize: 8,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: pdfColors.muted,
  },
  labelDark: {
    fontFamily: "JetBrainsMono",
    fontSize: 8,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: pdfColors.foreground,
  },
  hero: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
    alignItems: "stretch",
  },
  heroMain: {
    flex: 1,
    paddingRight: 4,
  },
  handleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    objectFit: "cover",
  },
  handle: {
    fontFamily: "JetBrainsMono",
    fontSize: 9,
    color: pdfColors.accent,
  },
  name: {
    fontFamily: "InstrumentSerif",
    fontSize: 36,
    lineHeight: 0.92,
    letterSpacing: -0.5,
  },
  nameAccent: {
    fontFamily: "InstrumentSerif",
    fontStyle: "italic",
    fontSize: 36,
    lineHeight: 0.92,
    color: pdfColors.accent,
  },
  bio: {
    marginTop: 10,
    fontSize: 9.5,
    lineHeight: 1.4,
    color: pdfColors.muted,
    maxWidth: 250,
  },
  // Matches public/audience-card-bg.png (864×1152 → 3:4).
  audienceBox: {
    width: 198,
    height: 264,
    position: "relative",
    overflow: "hidden",
    color: pdfColors.cream,
  },
  audienceBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "bottom left",
  },
  // Tall enough for label→number→label→number→label→number (was clipping 1.8%).
  audienceContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "72%",
    height: 168,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  audienceValue: {
    fontFamily: "InstrumentSerif",
    fontSize: 28,
    lineHeight: 1,
    color: pdfColors.cream,
    marginTop: 6,
  },
  audienceViewsValue: {
    fontFamily: "InstrumentSerif",
    fontSize: 22,
    lineHeight: 1,
    color: pdfColors.accent,
    marginTop: 6,
  },
  audienceMeta: {
    fontFamily: "JetBrainsMono",
    fontSize: 6.5,
    letterSpacing: 0.7,
    textTransform: "uppercase",
    color: "#f2eee6a6",
    lineHeight: 1.2,
  },
  audienceBlock: {
    marginTop: 12,
  },
  audienceDivider: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f2eee233",
    paddingTop: 8,
  },
  // Same pattern as Combined Views: label above, number in a fixed-height box.
  audienceErValueWrap: {
    height: 20,
    marginTop: 6,
    justifyContent: "center",
  },
  audienceErValue: {
    fontFamily: "InstrumentSerif",
    fontSize: 16,
    lineHeight: 1,
    color: pdfColors.cream,
  },
  audienceGrowthBadge: {
    position: "absolute",
    top: 52,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderWidth: 1,
    borderColor: pdfColors.accent,
    borderRadius: 9,
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: "#17130fcc",
  },
  audienceGrowthText: {
    fontFamily: "JetBrainsMono",
    fontSize: 7,
    color: pdfColors.accent,
  },
  signal: {
    fontFamily: "InstrumentSerif",
    fontSize: 18,
    color: pdfColors.accent,
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    marginTop: 4,
  },
  sectionLetter: {
    fontFamily: "JetBrainsMono",
    fontSize: 8,
    color: pdfColors.accent,
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: pdfColors.border,
  },
  platforms: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: pdfColors.foreground,
    marginBottom: 14,
  },
  platformCol: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderLeftWidth: 1,
    borderLeftColor: pdfColors.border,
  },
  platformColFirst: {
    borderLeftWidth: 0,
  },
  platformValue: {
    fontFamily: "InstrumentSerif",
    fontSize: 18,
    marginTop: 4,
  },
  monoTiny: {
    fontFamily: "JetBrainsMono",
    fontSize: 6.5,
    color: pdfColors.muted,
    marginTop: 2,
  },
  accentTiny: {
    fontFamily: "JetBrainsMono",
    fontSize: 6.5,
    color: pdfColors.accent,
    marginTop: 2,
  },
  pillars: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },
  pillar: {
    width: "48%",
    borderTopWidth: 1,
    borderTopColor: pdfColors.border,
    paddingTop: 6,
  },
  pillarTitle: {
    fontFamily: "InstrumentSerif",
    fontSize: 13,
    marginTop: 2,
  },
  pillarBody: {
    fontSize: 8.5,
    lineHeight: 1.35,
    color: pdfColors.muted,
    marginTop: 3,
  },
  posts: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  post: {
    width: "31.8%",
    borderWidth: 1,
    borderColor: pdfColors.border,
    padding: 7,
    color: pdfColors.foreground,
    textDecoration: "none",
  },
  postTitle: {
    fontFamily: "InstrumentSerif",
    fontSize: 10,
    marginTop: 3,
    lineHeight: 1.2,
    color: pdfColors.foreground,
    textDecoration: "none",
  },
  brands: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  brand: {
    width: "31.8%",
    borderWidth: 1,
    borderColor: pdfColors.border,
    padding: 7,
  },
  brandName: {
    fontFamily: "InstrumentSerif",
    fontSize: 11,
    lineHeight: 1.2,
    color: pdfColors.foreground,
    textDecoration: "none",
  },
  brandDeliverable: {
    fontFamily: "JetBrainsMono",
    fontSize: 7.5,
    color: pdfColors.accent,
    marginTop: 3,
    textDecoration: "none",
  },
  formats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 6,
  },
  format: {
    width: "48.5%",
    borderWidth: 1,
    borderColor: pdfColors.foreground,
    padding: 8,
  },
  formatTitle: {
    fontFamily: "InstrumentSerif",
    fontSize: 12,
    marginTop: 3,
  },
  formatBody: {
    fontSize: 8,
    lineHeight: 1.3,
    color: pdfColors.muted,
    marginTop: 3,
  },
  footnote: {
    fontFamily: "JetBrainsMono",
    fontSize: 7.5,
    color: pdfColors.muted,
    marginBottom: 14,
  },
  footer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: pdfColors.foreground,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  email: {
    fontFamily: "InstrumentSerif",
    fontSize: 18,
    marginTop: 3,
    color: pdfColors.foreground,
    textDecoration: "none",
  },
  emailAccent: {
    fontFamily: "InstrumentSerif",
    fontStyle: "italic",
    color: pdfColors.accent,
    textDecoration: "none",
  },
  footerLinks: {
    alignItems: "flex-end",
    gap: 3,
  },
  footerLink: {
    fontFamily: "JetBrainsMono",
    fontSize: 8,
    color: pdfColors.muted,
    textDecoration: "none",
  },
  socialRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
  },
});
