import Image from "next/image";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/analytics/tracked-link";
import { buttonVariants } from "@/components/ui/button";
import {
  avgEngagement,
  compact,
  fmt,
  formatMonth,
  headlineFor,
  type MediaKitData,
} from "@/lib/media-kit";
import { cn } from "@/lib/utils";
import { formats, pillars } from "./media-kit-content";
import { PrintButton } from "./print-button";
import { SectionTitle } from "./section-title";

export function MediaKit({ data }: { data: MediaKitData }) {
  const platforms = data.platforms.filter((p) => p.show !== false);
  const er = avgEngagement(platforms);
  const totalViews = platforms.reduce((s, p) => s + (p.totalViews ?? 0), 0);
  const updated = formatMonth(data.updatedAt);
  const brands = data.workedWith ?? [];
  const topPosts = data.topPosts ?? [];
  const [emailUser, emailDomain] = data.email.split("@");
  const hasBrands = brands.length > 0;
  const hasPosts = topPosts.length > 0;
  const postsSection = "C";
  const brandsSection = hasPosts ? "D" : "C";
  const formatsSection = String.fromCharCode(
    67 + Number(hasPosts) + Number(hasBrands),
  );

  return (
    <main className="grain min-h-screen py-10 print:py-0">
      <div className="no-print media-toolbar mx-auto mb-6 flex w-[min(980px,calc(100%-24px))] items-center justify-between">
        <TrackedLink
          href="/"
          className={cn(buttonVariants({ variant: "ghost" }))}
          event="mediaKitLinkClicked"
          eventProps={{
            label: "codesbyshivam",
            type: "home",
            url: "/",
          }}
        >
          ← codesbyshivam
        </TrackedLink>
        <PrintButton />
      </div>

      <div className="mx-auto flex w-[min(980px,calc(100%-24px))] flex-col gap-8 @container">
        <article
          id="media-kit-sheet-1"
          className="media-kit-sheet sheet flex flex-col px-8 py-8 sm:px-10 sm:py-9"
        >
          <header className="avoid-break flex items-start justify-between border-b border-foreground pb-4">
            <div className="label text-foreground">
              Media Kit • {new Date(data.updatedAt).getUTCFullYear()}
            </div>
            <div className="label text-right">
              {data.location}
              <br />
              Updated {updated}
            </div>
          </header>

          <section className="avoid-break grid grid-cols-1 gap-8 pt-6 sm:grid-cols-[1.35fr_1fr]">
            <div>
              <p className="font-mono text-sm text-accent">
                &lt;{data.handle} /&gt;
              </p>
              <h1 className="mt-2 font-display text-[56px] leading-[0.88] tracking-tight sm:text-[80px]">
                {data.name.first}
                <br />
                <em className="text-accent">{data.name.last}</em>
              </h1>
              <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-muted-foreground">
                {data.bio}
              </p>
            </div>
            <div className="flex flex-col justify-between rounded-sm bg-ink p-6 text-ink-foreground">
              <span className="label text-ink-foreground/60">
                Combined audience
              </span>
              <div>
                <div className="font-display text-[72px] leading-none">
                  {compact(data.combinedAudience)}
                </div>
                <div className="mt-1 font-mono text-[13px] text-ink-foreground/70">
                  followers across {platforms.length} platforms
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 border-t border-ink-foreground/15 pt-4">
                {totalViews > 0 ? (
                  <div>
                    <div className="font-display text-3xl text-signal">
                      {compact(totalViews)}
                    </div>
                    <div className="label text-ink-foreground/60">
                      total views
                    </div>
                  </div>
                ) : null}
                {er !== undefined ? (
                  <div>
                    <div className="font-display text-3xl text-signal">
                      {er.toFixed(1)}%
                    </div>
                    <div className="label text-ink-foreground/60">
                      avg. engagement
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="avoid-break mt-6">
            <SectionTitle n="A" title="Platforms" />
            <div
              className="grid border-y border-foreground"
              style={{
                gridTemplateColumns: `repeat(${platforms.length}, minmax(0, 1fr))`,
              }}
            >
              {platforms.map((p, i) => {
                const h = headlineFor(p);
                return (
                  <div
                    key={p.id}
                    className={`px-3 py-4 ${i ? "border-l border-border" : ""}`}
                  >
                    <div className="label text-foreground">{p.name}</div>
                    <div className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                      {p.handle}
                    </div>
                    <div className="mt-3 font-display text-[42px] leading-none">
                      {fmt(h.value)}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {h.label}
                    </div>
                    <div className="mt-3 space-y-0.5 font-mono text-xs">
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

          <section className="avoid-break mt-6">
            <SectionTitle n="B" title="Content pillars" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {pillars.map(([n, t, d]) => (
                <div key={n} className="border-t border-border pt-2">
                  <div className="font-mono text-xs text-accent">{n}</div>
                  <div className="font-display text-2xl leading-tight">{t}</div>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
                    {d}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {hasPosts ? (
            <section className="avoid-break mt-6">
              <SectionTitle n={postsSection} title="Top posts" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {topPosts.map((post) => {
                  const meta = [
                    post.views != null ? `${compact(post.views)} views` : null,
                    post.engagementRate != null
                      ? `${post.engagementRate.toFixed(2)}% ER`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" • ");

                  const body = (
                    <>
                      <div className="label text-foreground">
                        {post.platform}
                      </div>
                      <div className="mt-2 font-display text-xl leading-tight">
                        {post.title}
                      </div>
                      {meta ? (
                        <div className="mt-2 font-mono text-xs text-accent">
                          {meta}
                        </div>
                      ) : null}
                    </>
                  );

                  return post.url ? (
                    <TrackedAnchor
                      key={`${post.platform}-${post.rank}-${post.title}`}
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-sm border border-border p-3 transition hover:border-foreground"
                      event="contentPostClicked"
                      eventProps={{
                        platform: post.platform,
                        title: post.title,
                        location: "media_kit",
                        url: post.url,
                      }}
                    >
                      {body}
                    </TrackedAnchor>
                  ) : (
                    <div
                      key={`${post.platform}-${post.rank}-${post.title}`}
                      className="rounded-sm border border-border p-3"
                    >
                      {body}
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {hasBrands ? (
            <section className="avoid-break mt-6">
              <SectionTitle n={brandsSection} title="Worked with" />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {brands.map((b) => {
                  const inner = b.logoUrl ? (
                    <Image
                      src={b.logoUrl}
                      alt={b.name}
                      width={120}
                      height={24}
                      className="h-6 w-auto object-contain grayscale"
                    />
                  ) : (
                    <span className="font-display text-xl">{b.name}</span>
                  );

                  return b.postUrl ? (
                    <TrackedAnchor
                      key={b.name}
                      href={b.postUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:opacity-70"
                      event="mediaKitLinkClicked"
                      eventProps={{
                        label: b.name,
                        type: "brand",
                        url: b.postUrl,
                      }}
                    >
                      {inner}
                    </TrackedAnchor>
                  ) : (
                    <span key={b.name}>{inner}</span>
                  );
                })}
              </div>
            </section>
          ) : null}
        </article>

        <article
          id="media-kit-sheet-2"
          className="media-kit-sheet sheet flex flex-col px-8 py-8 sm:px-10 sm:py-9"
        >
          <header className="avoid-break flex items-start justify-between border-b border-foreground pb-4">
            <div className="label text-foreground">
              Media Kit • {new Date(data.updatedAt).getUTCFullYear()} / 02
            </div>
            <div className="label text-right">
              {data.location}
              <br />
              Updated {updated}
            </div>
          </header>

          <section className="avoid-break mt-8">
            <SectionTitle n={formatsSection} title="Ways to work together" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {formats.map(([t, d], i) => (
                <div
                  key={t}
                  className="rounded-sm border border-foreground p-3"
                >
                  <div className="font-mono text-xs text-muted-foreground">
                    /0{i + 1}
                  </div>
                  <div className="mt-2 font-display text-xl leading-tight">
                    {t}
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
                    {d}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              Bundles across platforms available • Rates shared on request •
              Open to long-term ambassadorships
            </p>
          </section>

          <div className="h-6 shrink-0" />
          <footer className="avoid-break mt-auto flex flex-col items-start justify-between gap-4 border-t border-foreground pt-4 sm:flex-row sm:items-end">
            <div>
              <div className="label">Let&apos;s build something</div>
              <TrackedAnchor
                href={`mailto:${data.email}`}
                className="mt-1 block font-display text-[34px] leading-none"
                event="emailClicked"
                eventProps={{
                  location: "media_kit_footer",
                  email: data.email,
                }}
              >
                {emailUser}@<em className="text-accent">{emailDomain}</em>
              </TrackedAnchor>
            </div>
            <div className="text-left font-mono text-sm leading-relaxed text-muted-foreground sm:text-right">
              {data.links.map((l) => (
                <TrackedAnchor
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block underline-offset-2 transition hover:text-foreground hover:underline"
                  event="mediaKitLinkClicked"
                  eventProps={{
                    label: l.label,
                    type: "site",
                    url: l.href,
                  }}
                >
                  {l.label}
                </TrackedAnchor>
              ))}
              {(data.socials?.length ?? 0) > 0 ? (
                <div className="mt-2 flex flex-wrap items-center gap-x-1.5 sm:justify-end">
                  {data.socials!.map((s, i) => (
                    <span
                      key={s.href}
                      className="inline-flex items-center gap-x-1.5"
                    >
                      {i > 0 ? <span aria-hidden="true">•</span> : null}
                      <TrackedAnchor
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-2 transition hover:text-foreground hover:underline"
                        event="socialLinkClicked"
                        eventProps={{
                          platform: s.label,
                          location: "media_kit_footer",
                          url: s.href,
                        }}
                      >
                        {s.label}
                      </TrackedAnchor>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
