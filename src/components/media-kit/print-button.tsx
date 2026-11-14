"use client";

import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button
      type="button"
      onClick={() => window.print()}
      className="no-print rounded-sm bg-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary-foreground transition hover:bg-accent"
    >
      Download PDF
    </Button>
  );
}
