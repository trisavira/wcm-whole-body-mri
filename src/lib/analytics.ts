/** Analytics stub — wire to Mixpanel in production */

type EventProps = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, props?: EventProps) {
  if (import.meta.env.DEV) {
    console.debug("[analytics]", name, props ?? {});
  }
  // mixpanel.track(name, props);
}

export function trackSectionView(sectionId: string) {
  trackEvent("section_view", { section: sectionId });
}

export function trackCTA(action: string, location: string) {
  trackEvent("cta_click", { action, location });
}

export function trackBodyRegion(regionId: string) {
  trackEvent("body_region_click", { region: regionId });
}

export function trackReportCategory(categoryId: string) {
  trackEvent("report_preview_click", { category: categoryId });
}

export function trackVideoPlay(videoId: string) {
  trackEvent("video_play", { video: videoId });
}
