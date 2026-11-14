import { Suspense } from "react";
import { CreatorSite } from "@/components/creator/creator-site";
import { getMediaKitData, getSelectedContent } from "@/lib/social-sheet";
import { homeMetadata, JsonLd, profilePageSchema } from "@/lib/seo";

export const metadata = homeMetadata;

async function HomeContent() {
  const [data, content] = await Promise.all([
    getMediaKitData(),
    getSelectedContent(),
  ]);

  return (
    <>
      <JsonLd data={profilePageSchema()} />
      <CreatorSite data={data} content={content} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent"
            aria-label="Loading"
          />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
