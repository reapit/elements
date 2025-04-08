import { styled } from '@linaria/react'

export const ElSideBar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: var(--spacing-3);
  background: var(--fill-white);
`

export const ELSideBarMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: flex-start;
  gap: var(--spacing-2);
  // TODO: remove default value once the token is available
  width: var(--size-64, 256px);

  & li {
    width: 100%;
  }

  &[data-is-expanded='false'] {
    width: fit-content;
  }
`
