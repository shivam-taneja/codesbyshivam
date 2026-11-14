import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Wordmark } from "@/components/creator/wordmark";
import { cn } from "@/lib/utils";

export function NotFoundPage() {
  return (
    <main className="creator-site min-h-screen">
      <header className="site-width creator-nav">
        <Wordmark />
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
          <Link href="/" className={cn(buttonVariants())}>
            ← Back to the good stuff
          </Link>
          <Link
            href="/media-kit"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Media kit
          </Link>
        </div>
      </section>
    </main>
  );
}
