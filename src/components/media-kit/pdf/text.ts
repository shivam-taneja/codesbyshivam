import emojiCodes from "./emoji-codes.json";

/** Twemoji PNG basenames under /public/emoji (no .png). */
const AVAILABLE = new Set(emojiCodes);

const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });

/** Same code format react-pdf uses for Font.registerEmojiSource builders. */
function emojiAssetCode(segment: string) {
  return Array.from(segment)
    .filter((x) => x !== "️")
    .map((char) => char.codePointAt(0)!.toString(16))
    .join("-");
}

/**
 * Keep emoji that have a local Twemoji PNG; drop ones that don't
 * (missing assets 404 as HTML and hard-fail react-pdf).
 */
export function pdfSafeText(value: string) {
  let out = "";
  for (const { segment } of segmenter.segment(value)) {
    if (/\p{Extended_Pictographic}/u.test(segment)) {
      if (!AVAILABLE.has(emojiAssetCode(segment))) continue;
    }
    out += segment;
  }
  return out.replace(/\s+/g, " ").trim();
}
