import { css } from "@linaria/core";
import { styled } from "@linaria/react";

import {
  isDesktop,
  isWideScreen,
  isTablet,
  isSuperWideScreen,
} from "../../../styles/deprecated-media";

/** @deprecated */
export const elDeprecatedFormLayoutHasMargin = css``;

/** @deprecated */
export const ElDeprecatedFormLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;

  ${isTablet} {
    grid-gap: 1.25rem;
  }

  ${isDesktop} {
    grid-template-columns: repeat(8, 1fr);
  }

  ${isWideScreen} {
    grid-template-columns: repeat(12, 1fr);
  }

  ${isSuperWideScreen} {
    grid-template-columns: repeat(16, 1fr);
  }

  &.${elDeprecatedFormLayoutHasMargin} {
    margin-bottom: 1.5rem;
  }
`;

/** @deprecated */
export const ElDeprecatedFormSectionDivider = styled.div`
  margin: 1.5rem 0;
  border-bottom: 1px solid var(--colour-border-neutral-light_default);
`;

/** @deprecated */
export const ElDeprecatedInputWrapSmall = styled.div`
  grid-column-end: span 2;
`;

/** @deprecated */
export const ElDeprecatedInputWrap = styled.div`
  grid-column-end: span 4;
`;

/** @deprecated */
export const ElDeprecatedInputWrapMed = styled.div`
  grid-column-end: span 4;

  ${isDesktop} {
    grid-column-end: span 8;
  }

  ${isWideScreen} {
    grid-column-end: span 8;
  }

  ${isSuperWideScreen} {
    grid-column-end: span 8;
  }
`;

/** @deprecated */
export const ElDeprecatedInputWrapFull = styled.div`
  grid-column-end: span 4;

  ${isDesktop} {
    grid-column-end: span 8;
  }

  ${isWideScreen} {
    grid-column-end: span 12;
  }

  ${isSuperWideScreen} {
    grid-column-end: span 16;
  }
`;

/** @deprecated */
export const ElDeprecatedInputWrapHalf = styled.div`
  grid-column-end: span 2;

  ${isDesktop} {
    grid-column-end: span 4;
  }

  ${isWideScreen} {
    grid-column-end: span 6;
  }

  ${isSuperWideScreen} {
    grid-column-end: span 8;
  }
`;
