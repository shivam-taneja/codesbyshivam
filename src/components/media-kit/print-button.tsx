"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import type { MediaKitData } from "@/lib/media-kit";
import { MediaKitPdfDocument } from "./media-kit-pdf";

export function PrintButton({ data }: { data: MediaKitData }) {
  const [busy, setBusy] = useState(false);

  async function downloadPdf() {
    if (busy) return;

    setBusy(true);
    track("mediaKitPdfDownloaded", { status: "started" });

    try {
      const blob = await pdf(<MediaKitPdfDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "shivam-taneja-media-kit.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);

      track("mediaKitPdfDownloaded", { status: "success", pages: 2 });
    } catch (error) {
      console.error("PDF download failed", error);
      track("mediaKitPdfDownloaded", { status: "error" });
    } finally {
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
