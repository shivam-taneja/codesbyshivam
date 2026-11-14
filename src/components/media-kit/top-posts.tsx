import { TrackedAnchor } from "@/components/analytics/tracked-link";
import { compact, type TopPost } from "@/lib/media-kit";
import { SectionTitle } from "./section-title";

export function MediaKitTopPosts({
  section,
  posts,
}: {
  section: string;
  posts: TopPost[];
}) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-14">
      <SectionTitle n={section} title="Top posts" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
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
              <div className="label text-foreground">{post.platform}</div>
              <div className="mt-2.5 font-display text-[22px] leading-tight">
                {post.title}
              </div>
              {meta ? (
                <div className="mt-3 font-mono text-xs text-accent">{meta}</div>
              ) : null}
            </>
          );

          return post.url ? (
            <TrackedAnchor
              key={`${post.platform}-${post.rank}-${post.title}`}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-border p-4 transition hover:border-foreground"
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
              className="rounded-sm border border-border p-4"
            >
              {body}
            </div>
          );
        })}
      </div>
    </section>
  );
}
