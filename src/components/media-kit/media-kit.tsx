import { avgEngagement, formatMonth, type MediaKitData } from "@/lib/media-kit";
import { MediaKitBrands } from "./brands";
import { MediaKitFooter } from "./footer";
import { MediaKitFormats } from "./formats";
import { MediaKitHeader } from "./header";
import { MediaKitHero } from "./hero";
import { MediaKitPillars } from "./pillars";
import { MediaKitPlatforms } from "./platforms";
import { MediaKitToolbar } from "./toolbar";
import { MediaKitTopPosts } from "./top-posts";

export function MediaKit({ data }: { data: MediaKitData }) {
  const platforms = data.platforms.filter((p) => p.show !== false);
  const er = avgEngagement(platforms);
  const totalViews = platforms.reduce((s, p) => s + (p.totalViews ?? 0), 0);
  const updated = formatMonth(data.updatedAt);
  const brands = data.workedWith ?? [];
  const topPosts = data.topPosts ?? [];
  const hasPosts = topPosts.length > 0;
  const hasBrands = brands.length > 0;
  const postsSection = "C";
  const brandsSection = hasPosts ? "D" : "C";
  const formatsSection = String.fromCharCode(
    67 + Number(hasPosts) + Number(hasBrands),
  );

  return (
    <main className="grain min-h-screen py-8 sm:py-12">
      <MediaKitToolbar data={data} />

      <article className="media-kit-sheet sheet mx-auto flex flex-col px-6 py-8 sm:px-10 sm:py-11 md:px-12 md:py-12">
        <MediaKitHeader
          year={new Date(data.updatedAt).getUTCFullYear()}
          location={data.location}
          updated={updated}
        />

        <MediaKitHero
          handle={data.handle}
          firstName={data.name.first}
          lastName={data.name.last}
          bio={data.bio}
          combinedAudience={data.combinedAudience}
          platformCount={platforms.length}
          totalViews={totalViews}
          avgEngagement={er}
        />

        <MediaKitPlatforms platforms={platforms} />
        <MediaKitPillars />
        <MediaKitTopPosts section={postsSection} posts={topPosts} />
        <MediaKitBrands section={brandsSection} brands={brands} />
        <MediaKitFormats section={formatsSection} />

        <MediaKitFooter
          email={data.email}
          links={data.links}
          socials={data.socials}
        />
      </article>
    </main>
  );
}
