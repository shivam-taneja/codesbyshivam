import { compact } from "@/lib/media-kit";

export function MediaKitHero({
  handle,
  firstName,
  lastName,
  bio,
  combinedAudience,
  platformCount,
  totalViews,
  avgEngagement,
}: {
  handle: string;
  firstName: string;
  lastName: string;
  bio: string;
  combinedAudience: number;
  platformCount: number;
  totalViews: number;
  avgEngagement?: number;
}) {
  return (
    <section className="grid grid-cols-1 gap-8 pt-8 sm:gap-10 sm:pt-10 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <p className="font-mono text-sm text-accent">&lt;{handle} /&gt;</p>
        <h1 className="mt-3 font-display text-[56px] leading-[0.88] tracking-tight sm:text-[76px] md:text-[88px]">
          {firstName}
          <br />
          <em className="text-accent">{lastName}</em>
        </h1>
        <p className="mt-6 max-w-[40ch] text-[17px] leading-relaxed text-muted-foreground sm:text-[18px]">
          {bio}
        </p>
      </div>

      <div className="flex min-h-55 flex-col justify-between rounded-sm bg-ink p-6 text-ink-foreground sm:p-7">
        <span className="label text-ink-foreground/55">Combined audience</span>
        <div className="py-4">
          <div className="font-display text-[68px] leading-none sm:text-[76px]">
            {compact(combinedAudience)}
          </div>
          <div className="mt-2 font-mono text-[13px] text-ink-foreground/65">
            followers across {platformCount} platforms
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-ink-foreground/15 pt-5">
          {totalViews > 0 ? (
            <div>
              <div className="font-display text-[34px] leading-none text-signal">
                {compact(totalViews)}
              </div>
              <div className="label mt-1.5 text-ink-foreground/55">
                total views
              </div>
            </div>
          ) : null}
          {avgEngagement !== undefined ? (
            <div>
              <div className="font-display text-[34px] leading-none text-signal">
                {avgEngagement.toFixed(1)}%
              </div>
              <div className="label mt-1.5 text-ink-foreground/55">
                avg. engagement
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
