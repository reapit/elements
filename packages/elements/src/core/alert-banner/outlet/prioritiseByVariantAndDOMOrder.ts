import type { AlertBanner } from "../alert-banner";

/**
 * A function that determines which banner should be displayed when multiple banners are present.
 * @param banners - Array of banner HTMLElements to evaluate
 * @returns The banner that should be displayed, or null if none should be shown
 */
export type AlertBannerPrioritiser = (banners: HTMLElement[]) => HTMLElement | null;

/**
 * Prioritises alert banners by variant, then DOM order (latest wins).
 * Error banners have highest priority, followed by warning, then info.
 * For ties (same variant), the banner later in the DOM (most recently appended) wins.
 *
 * @param banners - Array of banner HTMLElements to prioritize
 * @returns The banner that should be displayed, or null if no banners are present.
 */
export const prioritiseByVariantAndDOMOrder: AlertBannerPrioritiser = (banners) => {
  if (banners.length === 0) return null;

  const VARIANT_PRIORITY: Record<AlertBanner.Variant, number> = {
    error: 3,
    warning: 2,
    info: 1,
  } as const;

  let bestBanner: HTMLElement | null = null;
  let bestPriority = 0;

  // Iterate backwards for "last wins" optimization
  for (let i = banners.length - 1; i >= 0; i--) {
    const banner = banners[i];
    const variant = banner.dataset.variant as AlertBanner.Variant | undefined;
    const priority = variant ? VARIANT_PRIORITY[variant] : 0;

    // Higher priority wins, or same priority with later DOM position (last wins)
    if (priority > bestPriority) {
      bestBanner = banner;
      bestPriority = priority;

      // Early termination if we found highest priority
      if (bestPriority === 3) break;
    }
  }

  return bestBanner;
};
