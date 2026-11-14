/**
 * Central catalog of Mixpanel events.
 * Add new events here so names stay consistent across the app.
 *
 * Autocapture already tracks generic clicks + pageviews —
 * only add named product events you care about in reports.
 *
 * @example
 * export const analyticsEvents = {
 *   ctaClicked: "CTA Clicked",
 * } as const;
 *
 * export type AnalyticsEventProps = {
 *   ctaClicked: { label: string; location?: string };
 * };
 */
export const analyticsEvents = {} as const;

export type AnalyticsEventKey = keyof typeof analyticsEvents;
export type AnalyticsEventName = (typeof analyticsEvents)[AnalyticsEventKey];

/** Property shape required for each event key in `analyticsEvents` */
export type AnalyticsEventProps = Record<AnalyticsEventKey, Record<string, unknown>>;
