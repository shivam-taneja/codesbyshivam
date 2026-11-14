"use client";

import { useState } from "react";
import type { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";

/** Screenshot libs choke on oklch — pin sRGB tokens onto the sheet for capture. */
const SRGB_VARS: Record<string, string> = {
  "--background": "#ede9e1",
  "--foreground": "#1a1512",
  "--card": "#f9f6f1",
  "--card-foreground": "#1a1512",
  "--popover": "#f9f6f1",
  "--popover-foreground": "#1a1512",
  "--primary": "#1a1512",
  "--primary-foreground": "#f9f6f1",
  "--secondary": "#e2ddd4",
  "--secondary-foreground": "#1a1512",
  "--muted": "#e2ddd4",
  "--muted-foreground": "#645c55",
  "--accent": "#e8552a",
  "--accent-foreground": "#fcfaf6",
  "--signal": "#e8552a",
  "--ink": "#17130f",
  "--ink-foreground": "#f2eee6",
  "--destructive": "#c4422f",
  "--destructive-foreground": "#fcfaf6",
  "--border": "rgba(26, 21, 18, 0.14)",
  "--input": "rgba(26, 21, 18, 0.18)",
  "--ring": "#e8552a",
  "--creator-paper": "#fafaf9",
  "--creator-soft": "#efeeed",
  "--creator-highlight": "#f7e04f",
  "--color-background": "#ede9e1",
  "--color-foreground": "#1a1512",
  "--color-card": "#f9f6f1",
  "--color-card-foreground": "#1a1512",
  "--color-popover": "#f9f6f1",
  "--color-popover-foreground": "#1a1512",
  "--color-primary": "#1a1512",
  "--color-primary-foreground": "#f9f6f1",
  "--color-secondary": "#e2ddd4",
  "--color-secondary-foreground": "#1a1512",
  "--color-muted": "#e2ddd4",
  "--color-muted-foreground": "#645c55",
  "--color-accent": "#e8552a",
  "--color-accent-foreground": "#fcfaf6",
  "--color-signal": "#e8552a",
  "--color-ink": "#17130f",
  "--color-ink-foreground": "#f2eee6",
  "--color-destructive": "#c4422f",
  "--color-destructive-foreground": "#fcfaf6",
  "--color-border": "rgba(26, 21, 18, 0.14)",
  "--color-input": "rgba(26, 21, 18, 0.18)",
  "--color-ring": "#e8552a",
  "--color-creator-paper": "#fafaf9",
  "--color-creator-soft": "#efeeed",
  "--color-creator-highlight": "#f7e04f",
};

const SHEET_BG: [number, number, number] = [249, 246, 241];
const SHEET_IDS = ["media-kit-sheet-1", "media-kit-sheet-2"] as const;

type SheetLink = {
  href: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

function applySrgbVars(el: HTMLElement) {
  for (const [key, value] of Object.entries(SRGB_VARS)) {
    el.style.setProperty(key, value);
  }
  el.style.setProperty("background-color", SRGB_VARS["--card"]);
  el.style.setProperty("color", SRGB_VARS["--foreground"]);
  el.style.setProperty("box-shadow", "none");
}

function clearSrgbVars(el: HTMLElement) {
  for (const key of Object.keys(SRGB_VARS)) {
    el.style.removeProperty(key);
  }
  el.style.removeProperty("background-color");
  el.style.removeProperty("color");
  el.style.removeProperty("box-shadow");
}

function inlineResolvedColors(source: HTMLElement, clone: HTMLElement) {
  const props = [
    "color",
    "background-color",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
    "outline-color",
    "text-decoration-color",
    "fill",
    "stroke",
  ] as const;

  const sourceNodes = [source, ...source.querySelectorAll<HTMLElement>("*")];
  const cloneNodes = [clone, ...clone.querySelectorAll<HTMLElement>("*")];
  const count = Math.min(sourceNodes.length, cloneNodes.length);

  for (let i = 0; i < count; i++) {
    const from = sourceNodes[i];
    const to = cloneNodes[i];
    if (!from || !to) continue;
    const cs = getComputedStyle(from);
    for (const prop of props) {
      const value = cs.getPropertyValue(prop);
      if (!value || value === "transparent" || value === "rgba(0, 0, 0, 0)") {
        continue;
      }
      to.style.setProperty(prop, value);
    }
  }
}

function resolveHref(href: string): string | null {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  if (
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("tel:")
  ) {
    return trimmed;
  }
  try {
    return new URL(trimmed, window.location.origin).href;
  } catch {
    return null;
  }
}

function collectLinks(sheet: HTMLElement): SheetLink[] {
  const sheetRect = sheet.getBoundingClientRect();
  if (sheetRect.width < 1 || sheetRect.height < 1) return [];

  return [...sheet.querySelectorAll("a[href]")].flatMap((anchor) => {
    const href = resolveHref(anchor.getAttribute("href") ?? "");
    if (!href) return [];

    const rect = anchor.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return [];

    return [
      {
        href,
        x: (rect.left - sheetRect.left) / sheetRect.width,
        y: (rect.top - sheetRect.top) / sheetRect.height,
        w: rect.width / sheetRect.width,
        h: rect.height / sheetRect.height,
      },
    ];
  });
}

function addLinkHotspots(
  pdf: jsPDF,
  links: SheetLink[],
  opts: {
    imgX: number;
    imgY: number;
    imgW: number;
    imgH: number;
    pageWidth: number;
    pageHeight: number;
  },
) {
  const { imgX, imgY, imgW, imgH, pageWidth, pageHeight } = opts;

  for (const link of links) {
    const x = imgX + link.x * imgW;
    const y = imgY + link.y * imgH;
    const w = link.w * imgW;
    const h = link.h * imgH;

    const left = Math.max(0, x);
    const right = Math.min(pageWidth, x + w);
    const top = Math.max(0, y);
    const bottom = Math.min(pageHeight, y + h);
    if (right - left < 1 || bottom - top < 1) continue;

    pdf.link(left, top, right - left, bottom - top, { url: link.href });
  }
}

async function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUrl;
  });
}

export function PrintButton() {
  const [busy, setBusy] = useState(false);

  async function downloadPdf() {
    const sheets = SHEET_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sheets.length === 0 || busy) return;

    setBusy(true);
    for (const sheet of sheets) applySrgbVars(sheet);

    try {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );

      const [{ domToJpeg }, { jsPDF }] = await Promise.all([
        import("modern-screenshot"),
        import("jspdf"),
      ]);

      const pageWidth = 210;
      const pageHeight = 297;
      const [r, g, b] = SHEET_BG;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      for (let i = 0; i < sheets.length; i++) {
        const sheet = sheets[i]!;
        const links = collectLinks(sheet);

        const dataUrl = await domToJpeg(sheet, {
          quality: 0.97,
          scale: 2,
          backgroundColor: SRGB_VARS["--card"],
          width: sheet.scrollWidth,
          height: sheet.scrollHeight,
          style: {
            boxShadow: "none",
          },
          onCloneNode: (cloned) => {
            if (!(cloned instanceof HTMLElement)) return;
            applySrgbVars(cloned);
            inlineResolvedColors(sheet, cloned);
          },
        });

        const img = await loadImage(dataUrl);
        const naturalRatio = img.naturalHeight / img.naturalWidth;
        const fullWidthHeight = pageWidth * naturalRatio;
        const scale = Math.min(1, pageHeight / fullWidthHeight);
        const imgW = pageWidth * scale;
        const imgH = fullWidthHeight * scale;
        // Top-align so leftover cream sits at the bottom as empty space.
        const imgX = (pageWidth - imgW) / 2;
        const imgY = 0;

        if (i > 0) pdf.addPage();

        pdf.setFillColor(r, g, b);
        pdf.rect(0, 0, pageWidth, pageHeight, "F");
        pdf.addImage(dataUrl, "JPEG", imgX, imgY, imgW, imgH, undefined, "FAST");

        addLinkHotspots(pdf, links, {
          imgX,
          imgY,
          imgW,
          imgH,
          pageWidth,
          pageHeight,
        });
      }

      pdf.save("shivam-taneja-media-kit.pdf");
    } catch (error) {
      console.error("PDF download failed", error);
    } finally {
      for (const sheet of sheets) clearSrgbVars(sheet);
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={downloadPdf}
      disabled={busy}
      className="no-print rounded-sm bg-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary-foreground transition hover:bg-accent disabled:opacity-60"
    >
      {busy ? "Preparing…" : "Download PDF"}
    </Button>
  );
}
