"use client";

import { useState } from "react";
import Image from "next/image";
import { TrackedAnchor } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import {
  contentPlatforms,
  contentPlatformUrls,
  type ContentPlatform,
  type SelectedContentItem,
} from "@/lib/content-types";

function isRemoteCdn(src: string) {
  return (
    src.includes("cdninstagram.com") ||
    src.includes("fbcdn.net") ||
    src.includes("facebook.com")
  );
}

export function SelectedContent({ items }: { items: SelectedContentItem[] }) {
  const [platform, setPlatform] = useState<ContentPlatform>("Instagram");
  const filtered = items.filter((item) => item.platform === platform);
  const platformUrl = contentPlatformUrls[platform];

  return (
    <>
      <div className="section-heading">
        <div>
          <span className="eyebrow text-accent">01 / IN YOUR FEED</span>
          <h2>
            A little code.
            <br />
            <em>A lot to talk about.</em>
          </h2>
        </div>
        <TrackedAnchor
          className="text-link"
          href={platformUrl}
          target="_blank"
          rel="noreferrer"
          event="socialLinkClicked"
          eventProps={{
            platform,
            location: "hero",
            url: platformUrl,
          }}
        >
          {platform} ↗
        </TrackedAnchor>
      </div>

      <div
        className="content-platforms"
        role="group"
        aria-label="Selected content platform"
      >
        {contentPlatforms.map((name) => (
          <Button
            key={name}
            variant={platform === name ? "default" : "outline"}
            aria-pressed={platform === name}
            onClick={() => {
              setPlatform(name);
              track("contentPlatformFiltered", { platform: name });
            }}
          >
            {name}
          </Button>
        ))}
      </div>

      <div
        className={`video-grid content-grid content-${platform.toLowerCase()}`}
      >
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No selected posts for {platform} yet.
          </p>
        ) : (
          filtered.map((item, i) => {
            const body = (
              <>
                {item.image ? (
                  <div className="video-image">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="object-cover"
                      unoptimized={isRemoteCdn(item.image)}
                      priority={i === 0}
                    />
                  </div>
                ) : (
                  <div className="linkedin-preview">
                    <div className="linkedin-preview-top">
                      <span className="eyebrow">
                        SHIVAM TANEJA / {item.platform.toUpperCase()}
                      </span>
                      <span
                        className={
                          item.platform === "Facebook"
                            ? "facebook-mark"
                            : "linkedin-mark"
                        }
                        aria-hidden="true"
                      >
                        {item.platform === "Facebook" ? "f" : "in"}
                      </span>
                    </div>
                    <p className="linkedin-preview-title">{item.title}</p>
                    <span className="linkedin-preview-cta">
                      {item.url ? "Open post ↗" : "Top post"}
                    </span>
                  </div>
                )}
                <div className="video-meta">
                  <span className="eyebrow">{item.platform}</span>
                  <span className="eyebrow">/0{i + 1}</span>
                </div>
                <h3>{item.title}</h3>
                {item.views != null ? (
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {item.views.toLocaleString("en-US")} views
                    {item.engagementRate != null
                      ? ` • ${item.engagementRate.toFixed(2)}% ER`
                      : ""}
                  </p>
                ) : null}
              </>
            );

            return item.url ? (
              <TrackedAnchor
                className="video-item"
                key={`${item.platform}-${item.rank}-${item.title}`}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                event="contentPostClicked"
                eventProps={{
                  platform: item.platform,
                  title: item.title,
                  location: "home",
                  url: item.url,
                }}
              >
                {body}
              </TrackedAnchor>
            ) : (
              <div
                className="video-item"
                key={`${item.platform}-${item.rank}-${item.title}`}
              >
                {body}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
