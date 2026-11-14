import { formats } from "./media-kit-content";
import { SectionTitle } from "./section-title";

export function MediaKitFormats({ section }: { section: string }) {
  return (
    <section className="mt-12 sm:mt-14">
      <SectionTitle n={section} title="Ways to work together" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {formats.map(([t, d], i) => (
          <div
            key={t}
            className="rounded-sm border border-foreground p-4 sm:p-5"
          >
            <div className="font-mono text-xs text-muted-foreground">
              /0{i + 1}
            </div>
            <div className="mt-2.5 font-display text-[24px] leading-tight">
              {t}
            </div>
            <p className="mt-2 text-[13px] leading-snug text-muted-foreground">
              {d}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-muted-foreground">
        Bundles across platforms available • Rates shared on request • Open to
        long-term ambassadorships
      </p>
    </section>
  );
}
