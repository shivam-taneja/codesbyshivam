"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="creator-site flex min-h-screen items-center justify-center px-6">
      <section className="max-w-md">
        <span className="eyebrow text-accent">A SMALL DETOUR</span>
        <h1 className="mt-4 text-4xl">Something didn&apos;t load.</h1>
        <p className="mt-5 text-muted-foreground">
          Let&apos;s give that another go.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            onClick={() => {
              track("errorRetryClicked", {});
              reset();
            }}
          >
            Try again
          </Button>
          <TrackedLink
            href="/"
            className={cn(buttonVariants({ variant: "outline" }))}
            event="notFoundCtaClicked"
            eventProps={{ label: "Go home", target: "/" }}
          >
            Go home
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
