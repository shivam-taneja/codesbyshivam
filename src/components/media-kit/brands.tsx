import { TrackedAnchor } from "@/components/analytics/tracked-link";
import { compact, type Brand } from "@/lib/media-kit";
import { SectionTitle } from "./section-title";

function deliverableLabel(d: Brand["deliverables"][number]) {
  const base = [d.platform, d.type].filter(Boolean).join(" ");
  if (d.views != null) return `${base} • ${compact(d.views)} views`;
  return base;
}

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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => (
          <div key={b.name} className="rounded-sm border border-border p-4">
            {b.website ? (
              <TrackedAnchor
                href={b.website}
                target="_blank"
                rel="noreferrer"
                className="font-display text-[22px] leading-tight transition hover:opacity-70"
                event="mediaKitLinkClicked"
                eventProps={{
                  label: b.name,
                  type: "brand",
                  url: b.website,
                }}
              >
                {b.name}
              </TrackedAnchor>
            ) : (
              <div className="font-display text-[22px] leading-tight">
                {b.name}
              </div>
            )}
            {b.category ? (
              <div className="mt-1.5 font-mono text-xs text-muted-foreground">
                {b.category}
              </div>
            ) : null}
            {b.deliverables.length > 0 ? (
              <ul className="mt-3 space-y-1.5">
                {b.deliverables.map((d, i) => {
                  const label = deliverableLabel(d);
                  const key = `${b.name}-${d.platform}-${d.type}-${d.url ?? i}`;
                  if (d.url) {
                    return (
                      <li key={key}>
                        <TrackedAnchor
                          href={d.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs text-accent transition hover:opacity-70"
                          event="mediaKitLinkClicked"
                          eventProps={{
                            label: `${b.name} ${label}`,
                            type: "brand",
                            url: d.url,
                          }}
                        >
                          {label}
                        </TrackedAnchor>
                      </li>
                    );
                  }
                  return (
                    <li
                      key={key}
                      className="font-mono text-xs text-muted-foreground"
                    >
                      {label}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
