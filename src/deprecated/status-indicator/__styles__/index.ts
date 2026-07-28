import { css } from "@linaria/core";
import { styled } from "@linaria/react";

import {
  elIntentPrimary,
  elIntentSuccess,
  elIntentDanger,
  elIntentWarning,
  elIntentPending,
  elIntentDefault,
  elIntentNeutral,
} from "../../../styles/deprecated-intent";

/**
 * @deprecated
 */
export const elDeprecatedShapeTag = css``;

/**
 * @deprecated
 */
export const ElDeprecatedStatusIndicator = styled.span`
  border-radius: 3rem;
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;
  background: var(--colour-fill-neutral-medium);
  color: var(--colour-text-primary);

  &.${elIntentPrimary} {
    background-image: linear-gradient(
      to right,
      var(--colour-fill-action-dark),
      var(--colour-fill-action-dark)
    );
    outline-color: var(--colour-fill-action-dark);
  }

  &.${elIntentNeutral} {
    background-image: linear-gradient(
      to right,
      var(--colour-fill-info-dark),
      var(--colour-fill-info-dark)
    );
    outline-color: var(--colour-fill-info-dark);
  }

  &.${elIntentSuccess} {
    background-image: linear-gradient(
      to right,
      var(--colour-fill-success-dark),
      var(--colour-fill-success-dark)
    );
    outline-color: var(--colour-fill-success-dark);
  }

  &.${elIntentPending} {
    background-image: linear-gradient(
      to right,
      var(--colour-fill-pending-dark),
      var(--colour-fill-pending-dark)
    );
    outline-color: var(--colour-fill-pending-dark);
  }

  &.${elIntentWarning} {
    background-image: linear-gradient(
      to right,
      var(--colour-fill-warning-dark),
      var(--colour-fill-warning-dark)
    );
    outline-color: var(--colour-fill-warning-dark);
  }

  &.${elIntentDanger} {
    background-image: linear-gradient(
      to right,
      var(--colour-fill-error-dark),
      var(--colour-fill-error-dark)
    );
    outline-color: var(--colour-fill-error-dark);
  }

  &.${elIntentDefault} {
    background-image: linear-gradient(
      to right,
      var(--colour-fill-neutral-dark),
      var(--colour-fill-neutral-dark)
    );
    outline-color: var(--colour-fill-neutral-dark);
  }

  &.${elDeprecatedShapeTag} {
    border-radius: 1rem 0.2rem 0.2rem 1rem;
    height: 2rem;
    width: 0.5rem;
    margin-left: 0;
  }
`;
