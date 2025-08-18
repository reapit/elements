import { isWidthAtOrAbove, isWidthBelow } from '#src/utils/index'

export const FOLDER_TABS_CSS_CONTAINER_NAME = '--folder-tabs-container'
export const FOLDER_TABS_LARGE_CONTAINER_QUERY = `@container ${FOLDER_TABS_CSS_CONTAINER_NAME} ${isWidthAtOrAbove('SM')}`
export const FOLDER_TABS_SMALL_CONTAINER_QUERY = `@container ${FOLDER_TABS_CSS_CONTAINER_NAME} ${isWidthBelow('SM')}`
