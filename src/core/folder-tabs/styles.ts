import { FOLDER_TABS_CSS_CONTAINER_NAME, FOLDER_TABS_LARGE_CONTAINER_QUERY } from './constants'
import { styled } from '@linaria/react'

export const ElFolderTabs = styled.nav`
  container-name: ${FOLDER_TABS_CSS_CONTAINER_NAME};
  container-type: inline-size;
`

export const ElFolderTabsGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: start;

  width: 100%;

  ${FOLDER_TABS_LARGE_CONTAINER_QUERY} {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
  }
`
