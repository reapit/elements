import { styled } from "@linaria/react";

import { Button } from "#src/core/button";
import { isWidthAtOrAbove } from "#src/utils/breakpoints";
import { font } from "#src/utils/font";

import type { AlertBanner } from "./alert-banner";

interface ElAlertBannerProps {
  "data-variant": AlertBanner.Variant;
}

export const ElAlertBanner = styled.div<ElAlertBannerProps>`
  @layer elements.main {
    --alert-banner-background: var(--colour-fill-info-lightest);
    --alert-banner-border-colour: var(--colour-border-info-default);
    --alert-banner-icon-colour: var(--colour-icon-info);
    --alert-banner-actions-padding-block-start: var(--spacing-2);

    position: relative;
    display: grid;
    grid:
      'icon description' auto
      'icon actions' minmax(0, auto) / minmax(0, auto) 1fr;
    gap: 0 var(--spacing-2);
    width: 100%;

    background-color: var(--alert-banner-background);
    border-bottom: var(--border-width-double) solid var(--alert-banner-border-colour);
    padding: var(--spacing-4) var(--spacing-5);

    /* Responsive padding adjustments */
    @container ${isWidthAtOrAbove("SM")} {
      grid: 'icon description actions' auto / minmax(0, auto) 1fr minmax(0, auto);
      --alert-banner-actions-padding-block-start: 0;
    }

    &[hidden] {
      display: none;
    }

    &[data-is-dismissable='true'] {
      padding-inline-end: var(--spacing-14);
    }

    &[data-variant='error'] {
      --alert-banner-background: var(--colour-fill-error-lightest);
      --alert-banner-border-colour: var(--colour-border-error-default);
      --alert-banner-icon-colour: var(--colour-icon-error);
    }

    &[data-variant='warning'] {
      --alert-banner-background: var(--colour-fill-warning-lightest);
      --alert-banner-border-colour: var(--colour-border-warning-default);
      --alert-banner-icon-colour: var(--colour-icon-warning);
    }

    &[data-variant='info'] {
      --alert-banner-background: var(--colour-fill-info-lightest);
      --alert-banner-border-colour: var(--colour-border-info-default);
      --alert-banner-icon-colour: var(--colour-icon-info);
    }
  }
`;

export const ElAlertBannerActions = styled.div`
  @layer elements.main {
    grid-area: actions;

    display: flex;
    padding-block-start: var(--alert-banner-actions-padding-block-start);
    flex-shrink: 0;
    height: fit-content;
  }
`;

export const ElAlertBannerDescription = styled.p`
  @layer elements.main {
    grid-area: description;

    ${font("base", "regular")}
    flex: 1 0 0;
    color: var(--colour-text-primary);
    min-width: 0;
    margin: 0;
  }
`;

export const ElAlertBannerDismissButton = styled(Button)`
  @layer elements.main {
    position: absolute;
    inset: var(--spacing-2) var(--spacing-2) var(--spacing-2) auto;
  }
`;

export const ElAlertBannerIconContainer = styled.div`
  @layer elements.main {
    grid-area: icon;

    box-sizing: content-box;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding: var(--spacing-half) var(--spacing-none);
    color: var(--alert-banner-icon-colour);
    height: var(--icon_size-md);
    width: var(--icon_size-md);
  }
`;
