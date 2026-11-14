"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "@/lib/analytics";

export function Wordmark({
  href = "/",
  className,
  priority = false,
  location = "other",
}: {
  href?: string;
  className?: string;
  priority?: boolean;
  location?: "home_nav" | "home_footer" | "media_kit" | "not_found" | "other";
}) {
  return (
    <Link
      href={href}
      className={className ?? "wordmark"}
      aria-label="codesbyshivam home"
      onClick={() => track("wordmarkClicked", { location })}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={22}
        height={22}
        className="size-5.5"
        priority={priority}
      />
      codesbyshivam
      <span className="text-accent">.</span>
    </Link>
  );
}
