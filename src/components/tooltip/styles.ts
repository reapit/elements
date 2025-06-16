import { styled } from '@linaria/react'

export const ElTooltip = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @starting-style {
    opacity: 0;
  }

  border-radius: var(--comp-tooltip-border-radius);
  background: var(--comp-tooltip-colour-fill);

  width: max-content;
  padding: var(--spacing-2) var(--spacing-3) var(--spacing-2) var(--spacing-3);
  text-align: left;
  position: absolute;
  transition: opacity 0.2s;
  pointer-events: none;
  white-space: normal;
  word-wrap: break-word;
  z-index: 99999; // Adding additional CSS to position tooltip on top of everything

  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;

  color: var(--comp-tooltip-colour-text);

  /* text-xs/Regular */
  font-family: var(--font-xs-regular-family);
  font-size: var(--font-xs-regular-size);
  font-style: normal;
  font-weight: var(--font-xs-regular-weight);
  line-height: var(--font-xs-regular-line_height);
  letter-spacing: var(--font-xs-regular-letter_spacing);

  &[data-is-visible='true'] {
    animation-name: fadeIn;
  }
  &[data-is-visible='false'] {
    animation-name: fadeOut;
  }

  // To do (In Future): Tooltip Positioning to be replaced with css anchor positioning feature
  // Currently not supported by wider browser group
  // See: https://developer.mozilla.org/en-US/docs/Web/CSS/position-anchor#browser_compatibility
`

export const ElTooltipLabel = styled.span`
  text-align: left;
`
