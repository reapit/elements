import { css } from '@linaria/core'
import {
  elIntentDanger,
  elIntentDefault,
  elIntentNeutral,
  elIntentPending,
  elIntentPrimary,
  elIntentSuccess,
  elIntentWarning,
} from '../../../styles/deprecated-intent'

/** @deprecated */
export const elHasGreyText = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
/** @deprecated */
export const elHasNoMargin = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
/** @deprecated */
export const elHasRegularText = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
/** @deprecated */
export const elHasBoldText = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
/** @deprecated */
export const elHasMediumText = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
/** @deprecated */
export const elHasMargin = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
/** @deprecated */
export const elHasItalicText = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
/** @deprecated */
export const elHasCenteredText = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
/** @deprecated */
export const elHasSectionMargin = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
/** @deprecated */
export const elHasDisabledText = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
/** @deprecated */
export const elHasCapitalisedText = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`
/** @deprecated */
export const elHasUpperCasedText = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`

/** @deprecated */
export const elTextBase = css`
  font-family: var(--font-sans-serif);
  color: var(--black);
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;

  &.${elHasGreyText} {
    color: var(--neutral-500);
  }

  &.${elHasDisabledText} {
    color: var(--neutral-400);

    a {
      color: var(--neutral-400);
    }
  }

  &.${elHasRegularText} {
    font-weight: var(--font-weight-default);
  }

  &.${elHasMediumText} {
    font-weight: var(--font-weight-medium);
  }

  &.${elHasBoldText} {
    font-weight: var(--font-weight-bold);
  }

  &.${elHasCenteredText} {
    text-align: center;
  }

  &.${elHasCapitalisedText} {
    text-transform: capitalize;
  }

  &.${elHasUpperCasedText} {
    text-transform: uppercase;
  }

  &.${elHasItalicText} {
    font-style: italic;
  }

  &.${elHasNoMargin} {
    margin-bottom: 0;
  }

  &.${elHasMargin} {
    margin-bottom: 0.5rem;
  }

  &.${elHasSectionMargin} {
    margin-bottom: 1.5rem;
  }

  &.${elIntentPrimary} {
    color: var(--intent-primary);
  }

  &.${elIntentNeutral} {
    color: var(--intent-neutral);
  }

  &.${elIntentSuccess} {
    color: var(--intent-success);
  }

  &.${elIntentPending} {
    color: var(--intent-pending);
  }

  &.${elIntentWarning} {
    color: var(--intent-warning);
  }

  &.${elIntentDanger} {
    color: var(--intent-danger);
  }

  &.${elIntentDefault} {
    color: var(--intent-default);
  }
`

/** @deprecated */
export const elText3XL = css`
  font-size: 32px;
  line-height: 40px;
`

/** @deprecated */
export const elText2XL = css`
  font-size: 24px;
  line-height: 32px;
`

/** @deprecated */
export const elTextXL = css`
  font-size: 20px;
  line-height: 28px;
`

/** @deprecated */
export const elTextL = css`
  font-size: 18px;
  line-height: 24px;
`

/** @deprecated */
export const elTextSM = css`
  font-size: 14px;
  line-height: 20px;
`

/** @deprecated */
export const elTextXS = css`
  font-size: 13px;
  line-height: 16px;
`

/** @deprecated */
export const elText2XS = css`
  font-size: 12px;
  line-height: 16px;
`

/** @deprecated */
export const elTitle = css`
  font-family: var(--font-sans-serif);
  font-weight: var(--font-weight-bold);
  color: var(--black);
  font-size: var(--font-size-heading);
  line-height: 2.25rem;
  letter-spacing: 0%;
  margin-bottom: 1rem;

  &.${elHasGreyText} {
    color: var(--neutral-500);
  }

  &.${elHasDisabledText} {
    color: var(--neutral-400);

    a {
      color: var(--neutral-400);
    }
  }

  &.${elHasBoldText} {
    font-weight: var(--font-weight-bold);
  }

  &.${elHasMediumText} {
    font-weight: var(--font-weight-medium);
  }

  &.${elHasItalicText} {
    font-style: italic;
  }

  &.${elHasNoMargin} {
    margin-bottom: 0;
  }

  &.${elHasSectionMargin} {
    margin-bottom: 1.5rem;
  }

  &.${elHasUpperCasedText} {
    text-transform: uppercase;
  }

  &.${elHasCenteredText} {
    text-align: center;
  }

  &.${elHasCapitalisedText} {
    text-transform: capitalize;
  }

  &.${elIntentPrimary} {
    color: var(--intent-primary);
  }

  &.${elIntentNeutral} {
    color: var(--intent-neutral);
  }

  &.${elIntentSuccess} {
    color: var(--intent-success);
  }

  &.${elIntentPending} {
    color: var(--intent-pending);
  }

  &.${elIntentWarning} {
    color: var(--intent-warning);
  }

  &.${elIntentDanger} {
    color: var(--intent-danger);
  }

  &.${elIntentDefault} {
    color: var(--intent-default);
  }
`

/** @deprecated */
export const elSubtitle = css`
  font-family: var(--font-sans-serif);
  font-weight: var(--font-weight-default);
  color: var(--black);
  font-size: var(--font-size-subheading);
  line-height: 1.5rem;
  letter-spacing: 0%;
  margin-bottom: 0.75rem;

  &.${elHasGreyText} {
    color: var(--neutral-500);
  }

  &.${elHasDisabledText} {
    color: var(--neutral-400);

    a {
      color: var(--neutral-400);
    }
  }

  &.${elHasBoldText} {
    font-weight: var(--font-weight-bold);
  }

  &.${elHasMediumText} {
    font-weight: var(--font-weight-medium);
  }

  &.${elHasItalicText} {
    font-style: italic;
  }

  &.${elHasNoMargin} {
    margin-bottom: 0;
  }

  &.${elHasSectionMargin} {
    margin-bottom: 1rem;
  }

  &.${elHasCenteredText} {
    text-align: center;
  }

  &.${elHasCapitalisedText} {
    text-transform: capitalize;
  }

  &.${elHasUpperCasedText} {
    text-transform: uppercase;
  }

  &.${elIntentPrimary} {
    color: var(--intent-primary);
  }

  &.${elIntentNeutral} {
    color: var(--intent-neutral);
  }

  &.${elIntentSuccess} {
    color: var(--intent-success);
  }

  &.${elIntentPending} {
    color: var(--intent-pending);
  }

  &.${elIntentWarning} {
    color: var(--intent-warning);
  }

  &.${elIntentDanger} {
    color: var(--intent-danger);
  }

  &.${elIntentDefault} {
    color: var(--intent-default);
  }
`

/** @deprecated */
export const elBodyText = css`
  font-family: var(--font-sans-serif);
  font-weight: var(--font-weight-default);
  color: var(--black);
  font-size: var(--font-size-default);
  line-height: 1.25rem;
  letter-spacing: -1%;
  margin-bottom: 0.5rem;

  &.${elHasGreyText} {
    color: var(--neutral-500);
  }

  &.${elHasDisabledText} {
    color: var(--neutral-400);

    a {
      color: var(--neutral-400);
    }
  }

  &.${elHasBoldText} {
    font-weight: var(--font-weight-bold);
  }

  &.${elHasMediumText} {
    font-weight: var(--font-weight-medium);
  }

  &.${elHasItalicText} {
    font-style: italic;
  }

  &.${elHasNoMargin} {
    margin-bottom: 0;
  }

  &.${elHasSectionMargin} {
    margin-bottom: 1rem;
  }

  &.${elHasCenteredText} {
    text-align: center;
  }

  &.${elHasCapitalisedText} {
    text-transform: capitalize;
  }

  &.${elHasUpperCasedText} {
    text-transform: uppercase;
  }

  &.${elIntentPrimary} {
    color: var(--intent-primary);
  }

  &.${elIntentNeutral} {
    color: var(--intent-neutral);
  }

  &.${elIntentSuccess} {
    color: var(--intent-success);
  }

  &.${elIntentPending} {
    color: var(--intent-pending);
  }

  &.${elIntentWarning} {
    color: var(--intent-warning);
  }

  &.${elIntentDanger} {
    color: var(--intent-danger);
  }

  &.${elIntentDefault} {
    color: var(--intent-default);
  }
`

/** @deprecated */
export const elSmallText = css`
  font-family: var(--font-sans-serif);
  font-weight: var(--font-weight-default);
  color: var(--black);
  font-size: var(--font-size-small);
  line-height: 1.125rem;
  letter-spacing: 0%;
  margin-bottom: 0.5rem;

  &.${elHasGreyText} {
    color: var(--neutral-500);
  }

  &.${elHasDisabledText} {
    color: var(--neutral-400);

    a {
      color: var(--neutral-400);
    }
  }

  &.${elHasBoldText} {
    font-weight: var(--font-weight-bold);
  }

  &.${elHasMediumText} {
    font-weight: var(--font-weight-medium);
  }

  &.${elHasItalicText} {
    font-style: italic;
  }

  &.${elHasNoMargin} {
    margin-bottom: 0;
  }

  &.${elHasSectionMargin} {
    margin-bottom: 1rem;
  }

  &.${elHasCenteredText} {
    text-align: center;
  }

  &.${elHasCapitalisedText} {
    text-transform: capitalize;
  }

  &.${elHasUpperCasedText} {
    text-transform: uppercase;
  }

  &.${elIntentPrimary} {
    color: var(--intent-primary);
  }

  &.${elIntentNeutral} {
    color: var(--intent-neutral);
  }

  &.${elIntentSuccess} {
    color: var(--intent-success);
  }

  &.${elIntentPending} {
    color: var(--intent-pending);
  }

  &.${elIntentWarning} {
    color: var(--intent-warning);
  }

  &.${elIntentDanger} {
    color: var(--intent-danger);
  }

  &.${elIntentDefault} {
    color: var(--intent-default);
  }
`
