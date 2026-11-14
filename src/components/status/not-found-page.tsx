"use client";

import { buttonVariants } from "@/components/ui/button";
import { Wordmark } from "@/components/creator/wordmark";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { cn } from "@/lib/utils";

export function NotFoundPage() {
  return (
    <main className="creator-site min-h-screen">
      <header className="site-width creator-nav">
        <Wordmark location="not_found" />
        <span className="eyebrow">WRONG TURN. GOOD COMPANY.</span>
      </header>

      <section className="site-width py-20">
        <span className="eyebrow text-accent">404 / NOTHING SHIPPED HERE</span>
        <p className="mt-5 font-display text-[120px] leading-none text-accent">
          404.
        </p>
        <h1 className="mt-6 text-4xl font-medium">Well, this is awkward.</h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          This page doesn&apos;t exist. Maybe it moved, maybe the link has a
          typo. The good stuff is back home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <TrackedLink
            href="/"
            className={cn(buttonVariants())}
            event="notFoundCtaClicked"
            eventProps={{ label: "Back to the good stuff", target: "/" }}
          >
            ← Back to the good stuff
          </TrackedLink>
          <TrackedLink
            href="/media-kit"
            className={cn(buttonVariants({ variant: "outline" }))}
            event="mediaKitOpened"
            eventProps={{ location: "not_found" }}
          >
            Media kit
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
