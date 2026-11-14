import mixpanel from "mixpanel-browser";
import {
  analyticsEvents,
  type AnalyticsEventKey,
  type AnalyticsEventProps,
} from "./events";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

let initialized = false;

export function initMixpanel() {
  if (initialized || typeof window === "undefined") return;

  if (!MIXPANEL_TOKEN) {
    console.warn("Mixpanel token is missing. Set NEXT_PUBLIC_MIXPANEL_TOKEN.");
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    // Same-origin proxy (see next.config.ts rewrites) — avoids ad blockers
    api_host: "/mp",
    autocapture: true,
    track_pageview: true,
    persistence: "localStorage",
    debug: process.env.NODE_ENV === "development",
  });

  initialized = true;
}

/**
 * Typed Mixpanel track helper. Add events in `events.ts`, then:
 *
 * @example
 * track("ctaClicked", { label: "Hire me", location: "hero" })
 */
export function track<K extends AnalyticsEventKey>(
  event: K,
  properties: AnalyticsEventProps[K],
) {
  if (typeof window === "undefined" || !initialized) return;
  mixpanel.track(analyticsEvents[event], properties);
}

export { mixpanel };
