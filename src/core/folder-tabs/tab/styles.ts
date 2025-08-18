import { css } from '@linaria/core'
import { FOLDER_TABS_LARGE_CONTAINER_QUERY, FOLDER_TABS_SMALL_CONTAINER_QUERY } from '../constants'
import { font } from '#src/core/text'
import { styled } from '@linaria/react'

interface ElFolderTabProps {
  'aria-current': 'page' | false
}

export const ElFolderTab = styled.a<ElFolderTabProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: var(--size-14);
  width: 100%;
  padding: var(--spacing-4) var(--spacing-5);
  margin: 0;

  text-decoration: none;

  /* Background and text colours are the same regardless of container size */
  background: var(--comp-folder_tab-colour-fill-default);
  color: var(--comp-folder_tab-colour-text-default);
  outline: none;

  /* Focus and hover styles are the same regardless of container size */
  &:focus-visible,
  &:hover {
    background: var(--comp-folder_tab-colour-fill-hover);
    color: var(--comp-folder_tab-colour-text-hover);
  }

  &[aria-current='page'] {
    background: var(--comp-folder_tab-colour-fill-selected);
    color: var(--comp-folder_tab-colour-text-selected);
  }

  ${FOLDER_TABS_SMALL_CONTAINER_QUERY} {
    /* Top border provides subtle visual separation between vertically stacked tabs */
    border-block-start: var(--comp-folder_tab-border-width, 1px) solid var(--comp-folder_tab-colour-border);
    border-start-end-radius: var(--comp-folder_tab-border-radius-XS_SM);
    border-start-start-radius: var(--comp-folder_tab-border-radius-XS_SM);

    ${font('base', 'medium')}

    /* All but the first tab in a small container have a negative top margin */
    &:not(:first-of-type) {
      margin-block-start: calc(0px - var(--spacing-4)); /* -16x */
    }
  }

  ${FOLDER_TABS_LARGE_CONTAINER_QUERY} {
    /* Allow the waves to be absolutely positioned relative to their tab */
    position: relative;

    border-block-start: none;
    border-start-end-radius: var(--comp-folder_tab-border-radius-MD_2XL);
    border-start-start-radius: var(--comp-folder_tab-border-radius-MD_2XL);

    height: var(--size-18);
    /* Don't need the negative top margins used in small containers */
    margin-block: 0;

    ${font('lg', 'medium')}

    &[aria-current='page'] {
      z-index: 1;
    }
  }
`

export const ElFolderTabContentContainer = styled.span`
  display: inline-block;
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;

  /* Ensures the tab content is stacked above the tab's waves, if they're visible */
  transform: translateX(0px);
`

export const elFolderTabWave = css`
  /* Waves are always hidden, unless the container is large enough */
  display: none;

  ${FOLDER_TABS_LARGE_CONTAINER_QUERY} {
    position: absolute;
    display: block;

    color: var(--comp-folder_tab-colour-fill-default);

    ${ElFolderTab}:focus-visible > &,
    ${ElFolderTab}:hover > & {
      color: var(--comp-folder_tab-colour-fill-hover);
    }

    ${ElFolderTab}[aria-current='page'] > & {
      color: var(--comp-folder_tab-colour-fill-selected);
    }

    /* Left wave */
    &:first-of-type {
      left: 0;
      transform: translateX(-50%);
    }

    /* Right wave */
    &:last-of-type {
      right: 0;
      transform: translateX(50%);
    }

    /* First tab */
    ${ElFolderTab}:first-of-type > & {
      /* Left wave should be hidden in the first tab */
      &:first-of-type {
        display: none;
      }
    }

    /* Last tab */
    ${ElFolderTab}:last-of-type > & {
      /* Right wave should be hidden in the last tab */
      &:last-of-type {
        display: none;
      }
    }
  }
`
