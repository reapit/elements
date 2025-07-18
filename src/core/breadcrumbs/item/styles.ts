import { styled } from '@linaria/react'

export const ElBreadcrumbItem = styled.li`
  display: inline-grid;
  grid-template-columns: auto min-content;
  align-items: center;
`

export const ElBreadcrumbItemSeparator = styled.span`
  /* NOTE: We want the content to be sized exactly at --icon_size-xs, regardless of the padding
   * so we use content-box sizing. */
  box-sizing: content-box;

  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--spacing-1);

  color: var(--colour-icon-primary);
  width: var(--icon_size-xs);
  height: var(--icon_size-xs);

  ${ElBreadcrumbItem}:last-child & {
    display: none;
  }
`
