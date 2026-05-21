import { FOLDER_TABS_CSS_CONTAINER_NAME, FOLDER_TABS_LARGE_CONTAINER_QUERY } from './constants'
import { styled } from '@linaria/react'

export const ElFolderTabs = styled.nav`
  @layer elements.main {
    container-name: ${FOLDER_TABS_CSS_CONTAINER_NAME};
    container-type: inline-size;
    isolation: isolate;
  }
`

export const ElFolderTabsGroup = styled.div`
  @layer elements.main {
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
  }
`
