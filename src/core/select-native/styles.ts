import { styled } from "@linaria/react";
import type { CSSProperties } from "react";

import { font } from "#src/utils/font";

interface ElSelectNativeContainerProps {
  // NOTE: We use a CSS variable for the max-width rather than simply using the max-width inline
  // style because we want the max-width to be available to both the container and select elements.
  style?: CSSProperties & {
    "--select-max-width"?: string;
  };
}

export const ElSelectNativeContainer = styled.div<ElSelectNativeContainerProps>`
  @layer elements.main {
    position: relative;
    display: inline-flex;
    align-items: center;
    max-width: var(--select-max-width, 100%);
    width: 100%;
  }
`;

interface ElSelectNativeProps {
  "data-show-validity": boolean;
}

export const ElSelectNative = styled.select<ElSelectNativeProps>`
  @layer elements.main {
    width: 100%;
    /* NOTE: --select-max-width comes from ElSelectNativeContainer */
    max-width: var(--select-max-width, 100%);

    appearance: none;
    background: transparent;
    border-radius: var(--comp-input-border-radius);
    border: var(--comp-input-border-width) solid var(--comp-input-colour-border-default);
    outline: none;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    cursor: pointer;
    color: var(--comp-input-colour-text-default-input);

    /* NOTE: We need to create space for the absolutely positioned icon. */
    padding-inline: var(--spacing-2) calc(var(--spacing-2) + var(--icon_size-sm) + var(--spacing-2));

    /* NOTE: Invalid styles should only be used if data-show-validity is true. We use :where to avoid
     * the presence of the data-show-validity attribute increasing the selector's specificity and,
     * therefore, overriding our focus styles. When a touched and invalid field is focused, we want the
     * focus styles to take precedence. aria-invalid="true" is also supported as an alternative to the
     * native :invalid pseudo-class, for cases where the element is not natively invalid (e.g.
     * server-side validation). */
    &:where([data-show-validity="true"]):invalid,
    &:where([data-show-validity="true"]):user-invalid,
    &:where([aria-invalid="true"][data-show-validity="true"]) {
      border-color: var(--comp-input-colour-border-error);
      background: var(--comp-input-colour-fill-error-background);
    }

    /* NOTE: focus styles come after invalid styles to ensure they take precedence */
    &:focus-visible {
      border-color: var(--comp-input-colour-border-focused);
      background: transparent;
    }

    /* Sizes */
    &[data-size="small"] {
      height: var(--size-8);
      ${font("xs", "regular")}
    }

    &[data-size="medium"] {
      height: var(--size-9);
      ${font("sm", "regular")}
    }

    &[data-size="large"] {
      height: var(--size-10);
      ${font("base", "regular")}
    }
  }
`;

export const ElSelectNativeIconContainer = styled.span`
  @layer elements.main {
    position: absolute;
    right: var(--spacing-2);

    /* NOTE: We don't want this element or its children to capture pointer events. Instead, we want those
     * events to be captured by the select element, which this icon container is above. */
    pointer-events: none;

    display: inline-flex;
    align-items: center;

    color: var(--comp-input-colour-icon-default);

    width: var(--icon_size-sm);
    height: var(--icon_size-sm);
  }
`;
