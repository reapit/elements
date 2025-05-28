import { styled } from '@linaria/react'

interface ElSideBarProps {
  'data-state': 'collapsed' | 'expanded'
}

export const ElSideBar = styled.nav<ElSideBarProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding: var(--spacing-3);
  background: var(--fill-white);
  width: 100%;

  &[data-state='collapsed'] {
    max-width: var(--size-16);
  }

  &[data-state='expanded'] {
    min-width: var(--size-48);
    max-width: var(--size-64);
  }
`

export const ElSideBarContents = styled.div`
  display: contents;
`

export const ELSideBarMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);
  width: 100%;
  container-type: inline-size;

  & li {
    width: 100%;
  }
`

export const ElSideBarFooter = styled.div`
  padding-block-start: var(--spacing-3);
  width: 100%;
`
