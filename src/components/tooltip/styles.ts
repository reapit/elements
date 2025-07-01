import { styled } from '@linaria/react'
import { font } from '../text'

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

  ${font('xs', 'regular')}
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
  font-weight: var(--font-weight-semibold);
`
