"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const SECTIONS = ["videos", "audience", "collaborate", "contact"] as const;

/** Fires once per section when it enters the viewport. */
export function SectionViewTracker() {
  useEffect(() => {
    const seen = new Set<string>();
    const nodes = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target.id as (typeof SECTIONS)[number];
          if (seen.has(section)) continue;
          seen.add(section);
          track("sectionViewed", { section });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return null;
}
