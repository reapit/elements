import { styled } from '@linaria/react'

export const ElToolTipContainer = styled.div`
  position: relative;
  display: inline-block;
  overflow: visible;
`

export const ElToolTipChild = styled.div`
  width: max-content;
  background: var(--fill-default-darkest, #222b33);
  color: var(--text-white);
  padding: var(--spacing-2) var(--spacing-3) var(--spacing-2) var(--spacing-3);
  border-radius: var(--corner-default);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: 400; // To do : Need to replace with variable
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  position: absolute;
  transition: opacity 0.2s;
  pointer-events: none;
  white-space: normal;
  word-wrap: break-word;
  z-index: 99999; // Adding additional CSS to position tooltip on top of everything

  // To do (In Future): Tooltip Positioning to be replaced with css anchor positioning feature
  // Currently not supported by wider browser group
  // See: https://developer.mozilla.org/en-US/docs/Web/CSS/position-anchor#browser_compatibility

  /* Top Position */
  &[data-position='top'] {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: var(--spacing-1);
  }

  /* Top Start Position */
  &[data-position='topStart'] {
    bottom: 100%;
    left: 0;
    margin-bottom: var(--spacing-1);
  }

  /* Top End Position */
  &[data-position='topEnd'] {
    bottom: 100%;
    right: 0;
    margin-bottom: var(--spacing-1);
  }

  /* Bottom Position */
  &[data-position='bottom'] {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: var(--spacing-1);
  }

  /* Bottom Start Position */
  &[data-position='bottomStart'] {
    top: 100%;
    left: 0;
    margin-top: var(--spacing-1);
  }

  /* Bottom End Position */
  &[data-position='bottomEnd'] {
    top: 100%;
    right: 0;
    margin-top: var(--spacing-1);
  }

  /* Right Position */
  &[data-position='right'] {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: var(--spacing-1);
  }

  /* Right Start Position */
  &[data-position='rightStart'] {
    left: 100%;
    top: 0;
    margin-left: var(--spacing-1);
  }

  /* Right End Position */
  &[data-position='rightEnd'] {
    left: 100%;
    bottom: 0;
    margin-left: var(--spacing-1);
  }

  /* Left Position */
  &[data-position='left'] {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: var(--spacing-1);
  }

  /* Left Start Position */
  &[data-position='leftStart'] {
    right: 100%;
    top: 0;
    margin-right: var(--spacing-1);
  }

  /* Left End Position */
  &[data-position='leftEnd'] {
    right: 100%;
    bottom: 0;
    margin-right: var(--spacing-1);
  }
`

export const ElToolTipLabel = styled.span`
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: 600; // To do : Need to replace with variable
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`
