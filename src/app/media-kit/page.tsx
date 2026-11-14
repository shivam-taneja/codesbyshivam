import { Suspense } from "react";
import { MediaKit } from "@/components/media-kit/media-kit";
import { getMediaKitData } from "@/lib/social-sheet";
import { mediaKitMetadata } from "@/lib/seo";

export const metadata = mediaKitMetadata;

async function MediaKitContent() {
  const data = await getMediaKitData();
  return <MediaKit data={data} />;
}

export default function MediaKitPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent"
            aria-label="Loading"
          />
        </div>
      }
    >
      <MediaKitContent />
    </Suspense>
  );
}
