import Image from "next/image";
import { compact } from "@/lib/media-kit";

export function MediaKitHero({
  handle,
  firstName,
  lastName,
  bio,
  combinedAudience,
  views30d,
  avgEngagement30d,
  audienceGrowth30dPct,
}: {
  handle: string;
  firstName: string;
  lastName: string;
  bio: string;
  combinedAudience: number;
  views30d: number;
  avgEngagement30d?: number;
  audienceGrowth30dPct?: number;
}) {
  const showGrowth =
    audienceGrowth30dPct != null && audienceGrowth30dPct > 0;
  const growthLabel = showGrowth
    ? `▲ +${audienceGrowth30dPct.toFixed(audienceGrowth30dPct >= 10 ? 0 : 1)}% / 30d`
    : null;

  return (
    <section className="grid grid-cols-1 gap-8 pt-8 sm:gap-10 sm:pt-10 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <div className="flex items-center gap-3">
          <Image
            src="/avatar-no-bg.png"
            alt={`${firstName} ${lastName}`}
            width={40}
            height={40}
            className="size-10 rounded-full bg-foreground/5 object-cover object-top"
            priority
          />
          <div className="font-mono text-sm text-accent">&lt;{handle} /&gt;</div>
        </div>
        <h1 className="mt-3 font-display text-[56px] leading-[0.88] tracking-tight sm:text-[76px] md:text-[88px]">
          {firstName}
          <br />
          <em className="text-accent">{lastName}</em>
        </h1>
        <p className="mt-6 max-w-[40ch] text-[17px] leading-relaxed text-muted-foreground sm:text-[18px]">
          {bio} Codes by Shivam is Shivam Taneja’s social media and content
          creator brand for developer content, AI tools, building, and tech. I
          post as @codesbyshivam on X, YouTube, and Instagram: hands-on tool
          demos, build in public updates, developer stories, and a little
          humour. This page is the media kit for that work, with audience,
          platforms, top posts, and collaboration formats.
        </p>
      </div>

      <div className="relative isolate aspect-4/5 min-h-75 overflow-hidden rounded-sm text-ink-foreground sm:min-h-85">
        <Image
          src="/audience-card-bg.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 40vw"
          className="object-cover object-center"
        />
        {/* Keep metrics in the empty top band — clear of avatars + trend. */}
        <div className="absolute inset-x-0 top-0 h-[48%] bg-linear-to-b from-ink/80 via-ink/45 to-transparent" />

        <div className="relative z-10 h-full p-5 sm:p-6">
          <div className="max-w-[68%]">
            <span className="label text-ink-foreground/60">
              Combined audience
            </span>
            <div className="mt-1 font-display text-[48px] leading-none text-ink-foreground sm:text-[56px]">
              {compact(combinedAudience)}
            </div>

            <div className="mt-4">
              <span className="label text-ink-foreground/60">
                Combined views
              </span>
              <div className="mt-1 font-display text-[40px] leading-none text-signal sm:text-[46px]">
                {compact(views30d)}
              </div>
            </div>

            {avgEngagement30d != null ? (
              <div className="mt-4 max-w-44 border-t border-ink-foreground/20 pt-3">
                <div className="font-display text-[24px] leading-none text-ink-foreground sm:text-[28px]">
                  {avgEngagement30d.toFixed(1)}%
                </div>
                <div className="label mt-1 text-ink-foreground/55">
                  Avg. engagement
                </div>
              </div>
            ) : null}
          </div>

          {growthLabel ? (
            <span
              className="absolute top-[34%] right-[5%] z-20 rounded-full border border-signal bg-ink/50 px-2.5 py-1 font-mono text-[10px] tracking-wide text-signal backdrop-blur-[2px] sm:right-[7%] sm:text-[11px]"
              aria-label={`Audience growth ${growthLabel}`}
            >
              {growthLabel}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
