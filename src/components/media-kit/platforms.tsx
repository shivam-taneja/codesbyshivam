import { compact, fmt, headlineFor, type PlatformStats } from "@/lib/media-kit";
import { cn } from "@/lib/utils";
import { SectionTitle } from "./section-title";

export function MediaKitPlatforms({
  platforms,
}: {
  platforms: PlatformStats[];
}) {
  return (
    <section className="mt-12 sm:mt-14">
      <SectionTitle n="A" title="Platforms" />
      <div
        className={cn(
          "grid border-y border-foreground",
          platforms.length <= 2 && "grid-cols-1 sm:grid-cols-2",
          platforms.length === 3 && "grid-cols-1 sm:grid-cols-3",
          platforms.length >= 4 && "grid-cols-2 lg:grid-cols-4",
        )}
      >
        {platforms.map((p, i) => {
          const h = headlineFor(p);
          return (
            <div
              key={p.id}
              className={cn(
                "px-3 py-5 sm:px-4 sm:py-6",
                i > 0 && "lg:border-l lg:border-border",
                i % 2 === 1 && "border-l border-border",
                i >= 2 && "border-t border-border lg:border-t-0",
              )}
            >
              <div className="label text-foreground">{p.name}</div>
              <div className="mt-1 truncate font-mono text-xs text-muted-foreground">
                {p.handle}
              </div>
              <div className="mt-4 font-display text-[36px] leading-none sm:text-[42px]">
                {fmt(h.value)}
              </div>
              <div className="mt-1 font-mono text-xs text-muted-foreground">
                {h.label}
              </div>
              <div className="mt-4 space-y-1 font-mono text-xs text-muted-foreground">
                {h.secondary ? <div>{h.secondary}</div> : null}
                {p.totalViews ? (
                  <div>{compact(p.totalViews)} total views</div>
                ) : null}
                {p.posts ? <div>{compact(p.posts)} posts</div> : null}
                {p.engagementRate !== undefined ? (
                  <div className="text-accent">
                    {p.engagementRate.toFixed(2)}% ER
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
