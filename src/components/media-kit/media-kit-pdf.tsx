"use client";

import { Document } from "@react-pdf/renderer";
import { formatUpdatedAt, updatedAtYear, type MediaKitData } from "@/lib/media-kit";
import { MediaKitPdfPageOne } from "./pdf/page-one";
import { MediaKitPdfPageTwo } from "./pdf/page-two";
import { ensurePdfFonts } from "./pdf/styles";

export function MediaKitPdfDocument({ data }: { data: MediaKitData }) {
  ensurePdfFonts();

  const platforms = data.platforms.filter((p) => p.show !== false);
  const updated = formatUpdatedAt(data.updatedAt);
  const year = updatedAtYear(data.updatedAt);
  const topPosts = data.topPosts ?? [];
  const brands = data.workedWith ?? [];
  const hasPosts = topPosts.length > 0;
  const hasBrands = brands.length > 0;
  const postsSection = "C";
  const brandsSection = hasPosts ? "D" : "C";
  const formatsSection = String.fromCharCode(
    67 + Number(hasPosts) + Number(hasBrands),
  );

  return (
    <Document
      title={`${data.name.first} ${data.name.last} — Media Kit`}
      author={`${data.name.first} ${data.name.last}`}
      subject="Brand partnership media kit"
      creator="codesbyshivam"
    >
      <MediaKitPdfPageOne
        year={year}
        location={data.location}
        updated={updated}
        handle={data.handle}
        firstName={data.name.first}
        lastName={data.name.last}
        bio={data.bio}
        combinedAudience={data.combinedAudience}
        platforms={platforms}
        views30d={data.views30d}
        avgEngagement30d={data.avgEngagement30d}
        audienceGrowth30dPct={data.audienceGrowth30dPct}
      />
      <MediaKitPdfPageTwo
        year={year}
        location={data.location}
        updated={updated}
        topPosts={topPosts}
        brands={brands}
        postsSection={postsSection}
        brandsSection={brandsSection}
        formatsSection={formatsSection}
        email={data.email}
        links={data.links}
        socials={data.socials}
      />
    </Document>
  );
}
