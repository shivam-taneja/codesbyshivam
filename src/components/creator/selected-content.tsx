"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  contentPlatforms,
  creatorContent,
  type ContentPlatform,
} from "./creator-data";

export function SelectedContent() {
  const [platform, setPlatform] = useState<ContentPlatform>("Instagram");
  const items = creatorContent.filter((item) => item.platform === platform);
  const platformUrl =
    platform === "Instagram"
      ? "https://www.instagram.com/codesbyshivam/"
      : platform === "YouTube"
        ? "https://www.youtube.com/@codesbyshivam"
        : items[0]?.url;

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
        <a
          className="text-link"
          href={platformUrl}
          target="_blank"
          rel="noreferrer"
        >
          {platform} ↗
        </a>
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
            onClick={() => setPlatform(name)}
          >
            {name}
          </Button>
        ))}
      </div>

      <div
        className={`video-grid content-grid content-${platform.toLowerCase()}`}
      >
        {items.map((item, i) => (
          <a
            className="video-item"
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            {item.image ? (
              <div className="video-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="linkedin-preview">
                <span className="eyebrow">
                  SHIVAM TANEJA / {item.platform.toUpperCase()}
                </span>
                <span>Open post ↗</span>
              </div>
            )}
            <div className="video-meta">
              <span className="eyebrow">{item.platform}</span>
              <span className="eyebrow">/0{i + 1}</span>
            </div>
            <h3>{item.title}</h3>
          </a>
        ))}
      </div>
    </>
  );
}
