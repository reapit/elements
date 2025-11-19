import { css } from '@linaria/core'
import { font } from '#src/core/text'

/**
 * Base card styling applied to all card variants (Card, LinkCard, ButtonCard).
 */
export const elAtAGlanceCard = css`
  --aag-card-background-colour-default: var(--colour-fill-white);
  --aag-card-background-colour-hover: var(--colour-fill-neutral-lightest);
  --aag-card-background-colour-selected: var(--colour-fill-action-lightest);
  --aag-card-background-colour: var(--aag-card-background-colour-default);

  --aag-card-outline-selected: var(--border-width-double) solid var(--colour-border-action-default);
  --aag-card-outline: none;
  --aag-card-value-colour-default: var(--colour-text-primary);

  --aag-card-value-colour-interactive: var(--colour-text-action);
  --aag-card-value-colour: var(--aag-card-value-colour-default);

  /* Reset default styling */
  margin: 0;
  font: inherit;
  color: inherit;
  background: none;
  cursor: default;

  /* Card styling */
  position: relative;
  display: grid;
  grid: 1fr / 1fr;
  align-self: stretch;

  background-color: var(--aag-card-background-colour);
  outline: var(--aag-card-outline);
  text-align: start;

  border: var(--border-width-default) solid var(--colour-border-neutral-light_default);
  border-radius: var(--border-radius-l);

  padding: var(--spacing-5);

  &[data-layout='vertical'] {
    grid:
      'icon' min-content
      'label' min-content
      'description' min-content
      'value' auto / 1fr;

    --aag-card-icon-padding: 0 0 var(--spacing-2) 0;
    --aag-card-value-align-self: end;
    --aag-card-value-padding: var(--spacing-1) 0 0 0;
  }

  &[data-layout='compact'] {
    grid:
      'icon label' min-content
      'icon description' minmax(0, min-content)
      '. value' auto / min-content 1fr;

    --aag-card-icon-padding: 0 var(--spacing-4) 0 0;
    --aag-card-value-align-self: end;
    --aag-card-value-padding: var(--spacing-1) 0 0 0;
  }

  &[data-layout='horizontal'] {
    grid:
      'icon label value' min-content
      'icon description value' minmax(0, min-content) / min-content 1fr auto;
    align-items: center;
    align-content: center;

    --aag-card-icon-padding: 0 var(--spacing-4) 0 0;
    --aag-card-value-align-self: auto;
    --aag-card-value-padding: 0 0 0 var(--spacing-1);
  }
`

/**
 * Icon styling. Grid-positioned via grid-area.
 */
export const elAtAGlanceCardIcon = css`
  grid-area: icon;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon_size-l);
  height: var(--icon_size-l);
  padding: var(--aag-card-icon-padding);
  color: var(--colour-icon-primary);
`

/**
 * Label/heading styling. Grid-positioned via grid-area.
 */
export const elAtAGlanceCardLabel = css`
  grid-area: label;
  color: var(--colour-text-primary);
  ${font('base', 'medium')}
  margin: 0;
  padding: 0;
`

/**
 * Description text styling. Grid-positioned via grid-area.
 */
export const elAtAGlanceCardDescription = css`
  grid-area: description;
  color: var(--colour-text-secondary);
  ${font('sm', 'regular')}
  margin: 0;
  padding: 0;
`

/**
 * Value/metric styling. Grid-positioned via grid-area.
 * Color can be customized via CSS variable --aag-card-value-colour.
 */
export const elAtAGlanceCardValue = css`
  grid-area: value;
  align-self: var(--aag-card-value-align-self);
  color: var(--aag-card-value-colour, var(--colour-text-primary));
  ${font('2xl', 'bold')}
  white-space: nowrap;
  margin: 0;
  padding: var(--aag-card-value-padding);
`
