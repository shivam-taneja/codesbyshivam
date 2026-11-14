"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      aria-label="Scroll to top"
      className="fixed right-5 bottom-5 z-50 border-border bg-background/90 shadow-sm backdrop-blur-sm no-print md:right-8 md:bottom-8"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp />
    </Button>
  );
}
