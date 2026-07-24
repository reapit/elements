import { styled } from '@linaria/react'

export const ElFileUploaderFileList = styled.ul`
  @layer elements.main {
    width: 100%;
    gap: var(--spacing-3);
    padding-inline-start: 0;
    padding-block-start: var(--spacing-2);
    list-style: none;

    &[data-layout='grid'] {
      display: grid;
      /* TODO: Check if 100px is an appropriate hard minimum */
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }

    &[data-layout='list'] {
      display: flex;
      flex-direction: column;
    }
  }
`
