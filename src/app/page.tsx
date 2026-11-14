import { CreatorSite } from "@/components/creator/creator-site";
import { sampleMediaKitData } from "@/data/media-kit";
import { homeMetadata, JsonLd, profilePageSchema } from "@/lib/seo";

export const metadata = homeMetadata;

export default function Home() {
  return (
    <>
      <JsonLd data={profilePageSchema()} />
      <CreatorSite data={sampleMediaKitData} />
    </>
  );
}
