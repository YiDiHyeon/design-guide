export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackEvent = (
  action: string,
  params: Record<string, unknown> = {},
) => {
  if (typeof window === 'undefined' || !window.gtag || !GA_TRACKING_ID) {
    return;
  }
  try {
    window.gtag('event', action, params);
  } catch {
    // ignore tracking failures silently
  }
};

export const trackCodeCopy = (componentName: string, snippetType?: string) => {
  trackEvent('copy_code', {
    component: componentName,
    snippet_type: snippetType ?? 'default',
  });
};

export const trackThemeChange = (theme: string) => {
  trackEvent('change_theme', {
    theme,
  });
};

export const trackPlaygroundChange = (
  componentName: string,
  prop: string,
  value: unknown,
) => {
  trackEvent('playground_interaction', {
    component: componentName,
    prop,
    value: String(value),
  });
};

export const trackTocClick = (docSlug: string, sectionId: string) => {
  trackEvent('toc_navigation', {
    doc: docSlug,
    section: sectionId,
  });
};
