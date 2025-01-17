import { styled } from '@linaria/react'

export const ElTooltip = styled.div`
  width: max-content;
  background: var(--fill-default-darkest, #222b33);
  color: var(--text-white);
  padding: var(--spacing-2) var(--spacing-3) var(--spacing-2) var(--spacing-3);
  border-radius: var(--corner-default);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);
  text-align: left;
  position: absolute;
  transition: opacity 0.2s;
  pointer-events: none;
  white-space: normal;
  word-wrap: break-word;
  z-index: 99999; // Adding additional CSS to position tooltip on top of everything

  // To do (In Future): Tooltip Positioning to be replaced with css anchor positioning feature
  // Currently not supported by wider browser group
  // See: https://developer.mozilla.org/en-US/docs/Web/CSS/position-anchor#browser_compatibility
`

export const ElTooltipLabel = styled.span`
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);
  text-align: left;
`
