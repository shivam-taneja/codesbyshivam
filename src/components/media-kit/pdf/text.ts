/** Normalize whitespace; keep emoji — Font.registerEmojiSource embeds them as images. */
export function pdfSafeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}
