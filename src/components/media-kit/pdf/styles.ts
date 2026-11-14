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
    gap: 20,
    marginBottom: 18,
  },
  heroMain: {
    flex: 1.35,
  },
  handle: {
    fontFamily: "JetBrainsMono",
    fontSize: 9,
    color: pdfColors.accent,
    marginBottom: 6,
  },
  name: {
    fontFamily: "InstrumentSerif",
    fontSize: 42,
    lineHeight: 0.92,
    letterSpacing: -0.5,
  },
  nameAccent: {
    fontFamily: "InstrumentSerif",
    fontStyle: "italic",
    fontSize: 42,
    lineHeight: 0.92,
    color: pdfColors.accent,
  },
  bio: {
    marginTop: 12,
    fontSize: 10,
    lineHeight: 1.45,
    color: pdfColors.muted,
    maxWidth: 260,
  },
  audienceBox: {
    flex: 1,
    backgroundColor: pdfColors.ink,
    color: pdfColors.cream,
    padding: 14,
    justifyContent: "space-between",
    minHeight: 150,
  },
  audienceValue: {
    fontFamily: "InstrumentSerif",
    fontSize: 40,
    color: pdfColors.cream,
  },
  audienceMeta: {
    fontFamily: "JetBrainsMono",
    fontSize: 8,
    color: "#f2eee6b3",
  },
  audienceStats: {
    flexDirection: "row",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#f2eee226",
    paddingTop: 10,
    marginTop: 10,
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
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderLeftWidth: 1,
    borderLeftColor: pdfColors.border,
  },
  platformColFirst: {
    borderLeftWidth: 0,
  },
  platformValue: {
    fontFamily: "InstrumentSerif",
    fontSize: 22,
    marginTop: 6,
  },
  monoTiny: {
    fontFamily: "JetBrainsMono",
    fontSize: 7.5,
    color: pdfColors.muted,
    marginTop: 2,
  },
  accentTiny: {
    fontFamily: "JetBrainsMono",
    fontSize: 7.5,
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
    gap: 8,
  },
  post: {
    width: "31.5%",
    borderWidth: 1,
    borderColor: pdfColors.border,
    padding: 8,
  },
  postTitle: {
    fontFamily: "InstrumentSerif",
    fontSize: 11,
    marginTop: 4,
    lineHeight: 1.25,
  },
  formats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  format: {
    width: "48%",
    borderWidth: 1,
    borderColor: pdfColors.foreground,
    padding: 10,
  },
  formatTitle: {
    fontFamily: "InstrumentSerif",
    fontSize: 13,
    marginTop: 4,
  },
  formatBody: {
    fontSize: 8.5,
    lineHeight: 1.35,
    color: pdfColors.muted,
    marginTop: 4,
  },
  footnote: {
    fontFamily: "JetBrainsMono",
    fontSize: 7.5,
    color: pdfColors.muted,
    marginBottom: 18,
  },
  footer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: pdfColors.foreground,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  email: {
    fontFamily: "InstrumentSerif",
    fontSize: 20,
    marginTop: 4,
    color: pdfColors.foreground,
    textDecoration: "none",
  },
  emailAccent: {
    fontFamily: "InstrumentSerif",
    fontStyle: "italic",
    color: pdfColors.accent,
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
