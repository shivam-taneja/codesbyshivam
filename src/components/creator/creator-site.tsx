"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { SectionViewTracker } from "@/components/analytics/section-view-tracker";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/analytics/tracked-link";
import {
  compact,
  formatMonth,
  headlineFor,
  type MediaKitData,
} from "@/lib/media-kit";
import { cn } from "@/lib/utils";
import { CONTACT_URL } from "@/lib/links";
import { track } from "@/lib/analytics";
import type { SelectedContentItem } from "@/lib/content-types";
import { collaborations, creatorSocials } from "./creator-data";
import { SelectedContent } from "./selected-content";
import { Wordmark } from "./wordmark";

export function CreatorSite({
  data,
  content,
}: {
  data: MediaKitData;
  content: SelectedContentItem[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="creator-site">
      <SectionViewTracker />
      <div className="creator-nav-sticky">
        <header className="creator-nav site-width">
          <Wordmark priority location="home_nav" />

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Main navigation"
          >
            <TrackedAnchor
              href="#videos"
              event="navClicked"
              eventProps={{
                label: "Videos",
                target: "#videos",
                location: "desktop_nav",
              }}
            >
              Videos
            </TrackedAnchor>
            <TrackedAnchor
              href="#audience"
              event="navClicked"
              eventProps={{
                label: "Audience",
                target: "#audience",
                location: "desktop_nav",
              }}
            >
              Audience
            </TrackedAnchor>
            <TrackedAnchor
              href="#collaborate"
              event="navClicked"
              eventProps={{
                label: "Collaborate",
                target: "#collaborate",
                location: "desktop_nav",
              }}
            >
              Collaborate
            </TrackedAnchor>
            <TrackedLink
              href="/media-kit"
              className={cn(buttonVariants({ variant: "outline" }))}
              event="mediaKitOpened"
              eventProps={{ location: "nav" }}
            >
              Media kit
            </TrackedLink>
          </nav>

          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              const open = !menuOpen;
              setMenuOpen(open);
              track("mobileMenuToggled", { open });
            }}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </header>

        {menuOpen ? (
          <nav className="mobile-nav site-width" aria-label="Mobile navigation">
            <TrackedAnchor
              href="#videos"
              event="navClicked"
              eventProps={{
                label: "Videos",
                target: "#videos",
                location: "mobile_nav",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Videos
            </TrackedAnchor>
            <TrackedAnchor
              href="#audience"
              event="navClicked"
              eventProps={{
                label: "Audience",
                target: "#audience",
                location: "mobile_nav",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Audience
            </TrackedAnchor>
            <TrackedAnchor
              href="#collaborate"
              event="navClicked"
              eventProps={{
                label: "Collaborate",
                target: "#collaborate",
                location: "mobile_nav",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Collaborate
            </TrackedAnchor>
            <TrackedLink
              href="/media-kit"
              event="mediaKitOpened"
              eventProps={{ location: "mobile_nav" }}
              onClick={() => setMenuOpen(false)}
            >
              Media kit ↗
            </TrackedLink>
          </nav>
        ) : null}
      </div>

      <main>
        <section className="creator-intro site-width">
          <div className="intro-top">
            <span className="eyebrow">
              <span className="status-dot" /> CREATOR. CODER. OCCASIONAL
              INTERNET MENACE.
            </span>
            <span className="eyebrow hidden sm:block">BENGALURU, INDIA ↗</span>
          </div>
          <h1>
            codesbyshivam<span className="text-accent">.</span>
          </h1>
          <div className="intro-bottom">
            <div className="intro-tagline">
              Code. Content.
              <br />A little <em>personality.</em>
            </div>
            <div className="intro-description">
              <p>
                Hey, I’m Shivam Taneja. Codes by Shivam is my social media and
                content creator brand. I post as @codesbyshivam on X, YouTube,
                and Instagram, with content about AI tools, building, and tech:
                hands-on tool demos, build in public updates, and a little
                humour.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedAnchor
                  href="#collaborate"
                  className={cn(buttonVariants({ size: "lg" }))}
                  event="heroCtaClicked"
                  eventProps={{
                    label: "Let’s work together",
                    target: "#collaborate",
                  }}
                >
                  Let’s work together ↗
                </TrackedAnchor>
                <TrackedAnchor
                  href="#videos"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                  )}
                  event="heroCtaClicked"
                  eventProps={{
                    label: "See my videos",
                    target: "#videos",
                  }}
                >
                  See my videos ↓
                </TrackedAnchor>
              </div>
            </div>
          </div>
          <div className="social-line">
            <span className="eyebrow">FIND ME IN YOUR FEED</span>
            <div>
              {creatorSocials.map((s) => (
                <TrackedAnchor
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  event="socialLinkClicked"
                  eventProps={{
                    platform: s.name,
                    location: "hero",
                    url: s.url,
                  }}
                >
                  {s.name} ↗
                </TrackedAnchor>
              ))}
            </div>
          </div>
        </section>

        <section id="videos" className="work-section site-width">
          <SelectedContent items={content} />
        </section>

        <section className="about-band">
          <div className="site-width about-inner">
            <span className="eyebrow">THE PERSON BEHIND THE HANDLE</span>
            <p>
              Serious about the content.
              <br />
              <em>Not so serious about myself.</em>
            </p>
            <div>
              <p>
                I’m an engineer behind the camera, making tech feel a little
                more human. I share hands-on tool demos, stories about building,
                and the occasional joke that hits too close to home.
              </p>
            </div>
          </div>
        </section>

        <section id="audience" className="audience-section site-width">
          <div className="section-heading">
            <div>
              <span className="eyebrow text-accent">
                02 / AROUND THE INTERNET
              </span>
              <h2>
                Small audience.
                <br />
                <em>Real things to share.</em>
              </h2>
            </div>
            <div className="audience-note">
              <span className="eyebrow">
                UPDATED {formatMonth(data.updatedAt)}
              </span>
              <p>
                Snapshot from my socials page.
                <br />
                Combined counts aren’t unique people.
              </p>
              <TrackedAnchor
                className="text-link"
                href="https://www.shivamtaneja.com/socials"
                target="_blank"
                rel="noreferrer"
                event="externalLinkClicked"
                eventProps={{
                  label: "See source stats",
                  url: "https://www.shivamtaneja.com/socials",
                  location: "audience",
                }}
              >
                See source stats ↗
              </TrackedAnchor>
            </div>
          </div>
          <div className="audience-grid">
            {data.platforms
              .filter((p) => p.show !== false)
              .map((p) => {
                const headline = headlineFor(p);
                return (
                  <TrackedAnchor
                    key={p.id}
                    className="audience-item"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    event="platformStatClicked"
                    eventProps={{
                      platform: p.name,
                      url: p.url,
                    }}
                  >
                    <div className="flex justify-between">
                      <span className="eyebrow">{p.name}</span>
                      <span aria-hidden="true">↗</span>
                    </div>
                    <strong>{compact(headline.value)}</strong>
                    <span className="metric-label">{headline.label}</span>
                    <p>{headline.secondary}</p>
                  </TrackedAnchor>
                );
              })}
          </div>
        </section>

        <section id="collaborate" className="collab-section site-width">
          <div className="section-heading">
            <div>
              <span className="eyebrow text-accent">
                03 / GOOD TOOLS. GOOD STORIES.
              </span>
              <h2>
                Your product.
                <br />
                <em>A story worth sharing.</em>
              </h2>
            </div>
            <TrackedLink
              href="/media-kit"
              className={cn(buttonVariants({ variant: "outline" }))}
              event="mediaKitOpened"
              eventProps={{ location: "collaborate" }}
            >
              View media kit ↗
            </TrackedLink>
          </div>
          <div className="collab-grid">
            {collaborations.map((c, i) => (
              <div key={c.title}>
                <span className="eyebrow text-accent">
                  0{i + 1} / {c.tag}
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
          <p className="collab-footnote">
            Let’s find the right format. Scope, timing, and rates discussed
            together.
          </p>
        </section>

        <section id="contact" className="contact-band">
          <div className="site-width">
            <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
            <h2>
              Let’s make
              <br />
              <em>something happen.</em>
              <span className="contact-arrow" aria-hidden="true">
                ↗
              </span>
            </h2>
            <TrackedAnchor
              href={CONTACT_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "lg" }))}
              event="contactCtaClicked"
              eventProps={{ location: "contact_band", url: CONTACT_URL }}
            >
              Get in touch ↗
            </TrackedAnchor>
            <TrackedAnchor
              className="contact-email"
              href={`mailto:${data.email}`}
              event="emailClicked"
              eventProps={{
                location: "contact_band",
                email: data.email,
              }}
            >
              {data.email}
            </TrackedAnchor>
          </div>
        </section>
      </main>

      <footer className="site-width creator-footer">
        <Wordmark location="home_footer" />
        <span>Built by Shivam. Obviously.</span>
        <TrackedAnchor
          href="https://www.shivamtaneja.com/"
          target="_blank"
          rel="noreferrer"
          event="externalLinkClicked"
          eventProps={{
            label: "The professional version",
            url: "https://www.shivamtaneja.com/",
            location: "footer",
          }}
        >
          The professional version ↗
        </TrackedAnchor>
      </footer>
    </div>
  );
}
