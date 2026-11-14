import Link from "next/link";
import { mediaKitMetadata } from "@/lib/seo";

export const metadata = mediaKitMetadata;

export default function MediaKitPage() {
  return (
    <div className="site-width flex flex-1 flex-col items-start justify-center py-24">
      <p className="eyebrow text-accent">MEDIA KIT</p>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">
        Media kit coming soon.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Paste the media-kit page from the other project when you’re ready — the
        home page already links here.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm underline-offset-4 hover:underline"
      >
        ← Back home
      </Link>
    </div>
  );
}
