import { styled } from '@linaria/react'

export const ElFileUploaderFileList = styled.ul`
  @layer elements.main {
    display: grid;
    width: 100%;
    gap: var(--spacing-3);
    margin: 0;
    padding-inline-start: 0;
    padding-block-start: var(--spacing-2);
    list-style: none;

    &[data-layout='grid'] {
      grid-auto-rows: minmax(var(--file-uploader-min-item-height, min-content), auto);
      grid-template-columns: repeat(auto-fit, minmax(var(--file-uploader-min-item-width, var(--size-32)), 1fr));
    }

    &[data-layout='list'] {
      grid-auto-rows: minmax(var(--file-uploader-min-item-height, min-content), auto);
      grid-template-columns: minmax(var(--file-uploader-min-item-width, min-content), 1fr);
    }
  }
`

export const ElFileUploaderFileListItem = styled.li`
  @layer elements.main {
    display: grid;
    grid: subgrid / subgrid;
  }
`
