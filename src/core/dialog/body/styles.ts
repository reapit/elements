import { styled } from '@linaria/react'

export const ElDialogBody = styled.article`
  grid-area: body;
  background: var(--fill-white);

  &,
  [data-size='small'] &,
  [data-size='medium'] &,
  [data-size='large'] & {
    padding-block: 0 var(--spacing-6);
    padding-inline: var(--spacing-6);
  }

  [data-size='full-screen'] & {
    padding: var(--spacing-5);
  }
`
