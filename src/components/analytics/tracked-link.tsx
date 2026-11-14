"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import {
  track,
  type AnalyticsEventKey,
  type AnalyticsEventProps,
} from "@/lib/analytics";

type TrackedAnchorProps<K extends AnalyticsEventKey> = ComponentProps<"a"> & {
  event: K;
  eventProps: AnalyticsEventProps[K];
  children: ReactNode;
};

/** External / hash / mailto links with a named Mixpanel event. */
export function TrackedAnchor<K extends AnalyticsEventKey>({
  event,
  eventProps,
  onClick,
  children,
  ...props
}: TrackedAnchorProps<K>) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, eventProps);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

type TrackedNextLinkProps<K extends AnalyticsEventKey> = ComponentProps<
  typeof Link
> & {
  event: K;
  eventProps: AnalyticsEventProps[K];
  children: ReactNode;
};

/** Next.js Link with a named Mixpanel event. */
export function TrackedLink<K extends AnalyticsEventKey>({
  event,
  eventProps,
  onClick,
  children,
  ...props
}: TrackedNextLinkProps<K>) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, eventProps);
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
