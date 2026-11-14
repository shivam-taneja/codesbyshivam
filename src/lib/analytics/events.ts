/**
 * Named Mixpanel events for codesbyshivam.
 * Autocapture still runs for generic clicks/pageviews —
 * these are the product events you filter in reports.
 */
export const analyticsEvents = {
  navClicked: "Nav Clicked",
  mobileMenuToggled: "Mobile Menu Toggled",
  wordmarkClicked: "Wordmark Clicked",
  heroCtaClicked: "Hero CTA Clicked",
  socialLinkClicked: "Social Link Clicked",
  contentPlatformFiltered: "Content Platform Filtered",
  contentPostClicked: "Content Post Clicked",
  platformStatClicked: "Platform Stat Clicked",
  mediaKitOpened: "Media Kit Opened",
  mediaKitPdfDownloaded: "Media Kit PDF Downloaded",
  mediaKitLinkClicked: "Media Kit Link Clicked",
  contactCtaClicked: "Contact CTA Clicked",
  emailClicked: "Email Clicked",
  externalLinkClicked: "External Link Clicked",
  scrollToTopClicked: "Scroll To Top Clicked",
  sectionViewed: "Section Viewed",
  errorRetryClicked: "Error Retry Clicked",
  notFoundCtaClicked: "Not Found CTA Clicked",
} as const;

export type AnalyticsEventKey = keyof typeof analyticsEvents;
export type AnalyticsEventName = (typeof analyticsEvents)[AnalyticsEventKey];

export type AnalyticsEventProps = {
  navClicked: {
    label: string;
    target: string;
    location: "desktop_nav" | "mobile_nav";
  };
  mobileMenuToggled: {
    open: boolean;
  };
  wordmarkClicked: {
    location: "home_nav" | "home_footer" | "media_kit" | "not_found" | "other";
  };
  heroCtaClicked: {
    label: string;
    target: string;
  };
  socialLinkClicked: {
    platform: string;
    location: "hero" | "media_kit_footer" | "other";
    url: string;
  };
  contentPlatformFiltered: {
    platform: string;
  };
  contentPostClicked: {
    platform: string;
    title: string;
    location: "home" | "media_kit";
    url?: string;
  };
  platformStatClicked: {
    platform: string;
    url?: string;
  };
  mediaKitOpened: {
    location: "nav" | "mobile_nav" | "collaborate" | "not_found" | "other";
  };
  mediaKitPdfDownloaded: {
    status: "started" | "success" | "error";
    pages?: number;
  };
  mediaKitLinkClicked: {
    label: string;
    type: "post" | "brand" | "site" | "social" | "email" | "home";
    url: string;
  };
  contactCtaClicked: {
    location: "contact_band";
    url: string;
  };
  emailClicked: {
    location: "contact_band" | "media_kit_footer";
    email: string;
  };
  externalLinkClicked: {
    label: string;
    url: string;
    location: "audience" | "footer" | "other";
  };
  scrollToTopClicked: {
    path: string;
  };
  sectionViewed: {
    section: "videos" | "audience" | "collaborate" | "contact";
  };
  errorRetryClicked: Record<string, never>;
  notFoundCtaClicked: {
    label: string;
    target: string;
  };
};
