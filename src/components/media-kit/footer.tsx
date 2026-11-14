import { TrackedAnchor } from "@/components/analytics/tracked-link";

export function MediaKitFooter({
  email,
  links,
  socials,
}: {
  email: string;
  links: { label: string; href: string }[];
  socials?: { label: string; href: string }[];
}) {
  const [emailUser, emailDomain] = email.split("@");

  return (
    <footer className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-foreground pt-6 sm:mt-16 sm:flex-row sm:items-end sm:pt-7">
      <div>
        <div className="label">Let&apos;s build something</div>
        <TrackedAnchor
          href={`mailto:${email}`}
          className="mt-2 block font-display text-[32px] leading-none sm:text-[38px]"
          event="emailClicked"
          eventProps={{
            location: "media_kit_footer",
            email,
          }}
        >
          {emailUser}@<em className="text-accent">{emailDomain}</em>
        </TrackedAnchor>
      </div>
      <div className="text-left font-mono text-sm leading-relaxed text-muted-foreground sm:text-right">
        {links.map((l) => (
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
        {(socials?.length ?? 0) > 0 ? (
          <div className="mt-3 flex flex-wrap items-center gap-x-1.5 sm:justify-end">
            {socials!.map((s, i) => (
              <span key={s.href} className="inline-flex items-center gap-x-1.5">
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
  );
}
