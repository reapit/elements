import { styled } from '@linaria/react'

export const ElDrawerHeader = styled.div`
  background: var(--fill-white);
  border-bottom: var(--border-default) solid var(--outline-default);
  display: grid;
  grid-area: header;
  grid-template-areas: 'main' 'tabs';
  grid-template-columns: auto;
  grid-template-rows: auto;
  padding-inline: var(--spacing-7);
`

export const ElDrawerHeaderMainContent = styled.div`
  display: grid;
  gap: var(--spacing-1) 0;
  grid-area: main;
  grid-template-areas: 'category close' 'title close' 'supplementary-info close';
  grid-template-columns: auto min-content;
  grid-template-rows: auto;
  padding-block: var(--spacing-6);
`

export const ElDrawerHeaderAction = styled.div`
  color: var(--text-secondary);
  grid-area: close;
`

export const ElDrawerHeaderCategory = styled.div`
  color: var(--text-secondary);
  grid-area: category;

  /* text-xs/Regular */
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-style: normal;
  font-weight: 400;
  letter-spacing: var(--letter-spacing-xs);
  line-height: var(--line-height-xs);
`

export const ElDrawerHeaderTitle = styled.h2`
  color: var(--text-primary);
  grid-area: title;

  /* text-lg/Semibold */
  font-family: var(--font-family);
  font-size: var(--font-size-lg);
  font-style: normal;
  font-weight: 600;
  letter-spacing: var(--letter-spacing-lg);
  line-height: var(--line-height-lg);
`

export const ElDrawerHeaderSupplementaryInfo = styled.div`
  color: var(--text-secondary);
  grid-area: supplementary-info;

  /* text-base/Regular */
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-style: normal;
  font-weight: 400;
  letter-spacing: var(--letter-spacing-base);
  line-height: var(--line-height-base);
`

export const ElDrawerHeaderTabs = styled.div`
  grid-area: tabs;
`
