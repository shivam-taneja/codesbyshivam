"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  compact,
  formatMonth,
  headlineFor,
  type MediaKitData,
} from "@/lib/media-kit";
import { cn } from "@/lib/utils";
import { CONTACT_URL } from "@/lib/links";
import { collaborations, creatorSocials } from "./creator-data";
import { SelectedContent } from "./selected-content";
import { Wordmark } from "./wordmark";

export function CreatorSite({ data }: { data: MediaKitData }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="creator-site">
      <header className="creator-nav site-width">
        <Wordmark priority />

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          <a href="#videos">Videos</a>
          <a href="#audience">Audience</a>
          <a href="#collaborate">Collaborate</a>
          <Link
            href="/media-kit"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Media kit
          </Link>
        </nav>

        <Button
          className="md:hidden"
          variant="ghost"
          size="icon"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {menuOpen ? (
        <nav className="mobile-nav site-width" aria-label="Mobile navigation">
          <a onClick={() => setMenuOpen(false)} href="#videos">
            Videos
          </a>
          <a onClick={() => setMenuOpen(false)} href="#audience">
            Audience
          </a>
          <a onClick={() => setMenuOpen(false)} href="#collaborate">
            Collaborate
          </a>
          <Link href="/media-kit" onClick={() => setMenuOpen(false)}>
            Media kit ↗
          </Link>
        </nav>
      ) : null}

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
            <p>
              Code. Content.
              <br />A little <em>personality.</em>
            </p>
            <div className="intro-description">
              <p>
                Hey, I’m Shivam Taneja. I make honest, hands-on content for
                developers and builders. Think AI tools, developer life, and a
                little humour in your feed.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#collaborate"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Let’s work together ↗
                </a>
                <a
                  href="#videos"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                  )}
                >
                  See my videos ↓
                </a>
              </div>
            </div>
          </div>
          <div className="social-line">
            <span className="eyebrow">FIND ME IN YOUR FEED</span>
            <div>
              {creatorSocials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
                  {s.name} ↗
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="videos" className="work-section site-width">
          <SelectedContent />
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
                more human. I share hands-on tool demos, developer stories, and
                the occasional joke that hits too close to home.
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
              <a
                className="text-link"
                href="https://www.shivamtaneja.com/socials"
                target="_blank"
                rel="noreferrer"
              >
                See source stats ↗
              </a>
            </div>
          </div>
          <div className="audience-grid">
            {data.platforms
              .filter((p) => p.show !== false)
              .map((p) => {
                const headline = headlineFor(p);
                return (
                  <a
                    key={p.id}
                    className="audience-item"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="flex justify-between">
                      <span className="eyebrow">{p.name}</span>
                      <span aria-hidden="true">↗</span>
                    </div>
                    <strong>{compact(headline.value)}</strong>
                    <span className="metric-label">{headline.label}</span>
                    <p>{headline.secondary}</p>
                  </a>
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
            <Link
              href="/media-kit"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              View media kit ↗
            </Link>
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

        <section className="contact-band">
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
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get in touch ↗
            </a>
            <a className="contact-email" href={`mailto:${data.email}`}>
              {data.email}
            </a>
          </div>
        </section>
      </main>

      <footer className="site-width creator-footer">
        <Wordmark />
        <span>Built by Shivam. Obviously.</span>
        <a
          href="https://www.shivamtaneja.com/"
          target="_blank"
          rel="noreferrer"
        >
          The professional version ↗
        </a>
      </footer>
    </div>
  );
}
