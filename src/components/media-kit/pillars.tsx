import { pillars } from "./media-kit-content";
import { SectionTitle } from "./section-title";

export function MediaKitPillars() {
  return (
    <section className="mt-12 sm:mt-14">
      <SectionTitle n="B" title="Content pillars" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(([n, t, d]) => (
          <div key={n} className="border-t border-border pt-3">
            <div className="font-mono text-xs text-accent">{n}</div>
            <div className="mt-1 font-display text-[26px] leading-tight">
              {t}
            </div>
            <p className="mt-2 text-[13px] leading-snug text-muted-foreground">
              {d}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
