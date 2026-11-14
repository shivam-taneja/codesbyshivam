import Image from "next/image";
import { TrackedAnchor } from "@/components/analytics/tracked-link";
import type { Brand } from "@/lib/media-kit";
import { SectionTitle } from "./section-title";

export function MediaKitBrands({
  section,
  brands,
}: {
  section: string;
  brands: Brand[];
}) {
  if (brands.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-14">
      <SectionTitle n={section} title="Worked with" />
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
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
            <span className="font-display text-2xl">{b.name}</span>
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
  );
}
