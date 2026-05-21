import { css } from '@linaria/core'
import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'

import { Button } from '#src/core/button'
import { EmptyState } from '#src/core/empty-state'
import { SearchInput } from '#src/core/search-input'
import { Toaster, toast } from '#src/core/toaster'
import { Tooltip } from '#src/core/tooltip'
import { Heading } from '#src/utils/heading'

import { CopyIcon } from '#src/icons/copy'
import * as icons from './all-icons'
import { ICON_KEBAB_NAMES } from './all-icons'
import synonymsData from './icon-synonyms.json'

import type { IconProps } from '../make-icon'

const synonyms = synonymsData as Record<string, string[] | undefined>

type IconComponent = ComponentType<IconProps>

interface IconEntry {
  /** PascalCase export name, e.g. `BedIcon`. */
  name: string
  /** Kebab-case subpath name, e.g. `bed`. */
  kebabName: string
  /** Lower-cased haystack for substring matching. */
  haystack: string
  Component: IconComponent
}

const iconEntries: IconEntry[] = Object.entries(icons as Record<string, unknown>)
  .filter(([name, value]) => name.endsWith('Icon') && typeof value === 'function')
  .map(([name, Component]) => {
    const kebabName = ICON_KEBAB_NAMES[name] ?? ''
    const synonymList = synonyms[name] ?? []
    const haystack = [name, kebabName, ...synonymList].join(' ').toLowerCase()
    return { name, kebabName, haystack, Component: Component as IconComponent }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

export function buildImportPath(name: string, kebabName: string): string {
  return `import { ${name} } from '@reapit/elements/icons/${kebabName}'`
}

async function copyImportPath(name: string, kebabName: string): Promise<void> {
  const importPath = buildImportPath(name, kebabName)
  try {
    await navigator.clipboard.writeText(importPath)
    toast.success(`Copied import for ${name}`)
  } catch {
    toast.error(`Could not copy import for ${name}`)
  }
}

const elGallery = css`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
`

const elGalleryGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: var(--spacing-8);
  margin: 0;
  padding: 0;
  list-style: none;
`

const elGalleryListItem = css`
  display: block;
`

const elGalleryTile = css`
  display: flex;
  flex-direction: column;
  background: transparent;
  border: 1px solid var(--colour-border-neutral-light_default);
  border-radius: var(--border-radius-l);
  overflow: hidden;
`

const elGalleryTileHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
`

const elGalleryTileName = css`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const elGalleryTileBody = css`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  background: var(--colour-fill-neutral-lightest);
`

const elGalleryTileIcon = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
`

/**
 * Searchable, copy-aware gallery of every icon exported by `@reapit/elements`.
 * Intended for use within the `Icons/Gallery` Storybook story only.
 */
export function IconGallery() {
  const [query, setQuery] = useState('')

  const trimmed = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    if (trimmed === '') return iconEntries
    return iconEntries.filter((entry) => entry.haystack.includes(trimmed))
  }, [trimmed])

  return (
    <div className={elGallery}>
      <SearchInput
        aria-label="Search icons"
        maxWidth="24rem"
        placeholder="Search icons by name or keyword…"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />

      {filtered.length === 0 ? (
        <EmptyState>
          <EmptyState.Description secondaryText="Try a different search term.">No icons match</EmptyState.Description>
        </EmptyState>
      ) : (
        <ul className={elGalleryGrid} role="list">
          {filtered.map(({ name, kebabName, Component }) => {
            const headingId = `icon-gallery-${name}`
            const buttonId = `icon-gallery-${name}-copy`
            const tooltipId = `icon-gallery-${name}-copy-tooltip`
            return (
              <li key={name} className={elGalleryListItem}>
                <article className={elGalleryTile} aria-labelledby={headingId}>
                  <header className={elGalleryTileHeader}>
                    <Heading
                      as="h3"
                      id={headingId}
                      font="text-xs/regular"
                      colour="primary"
                      className={elGalleryTileName}
                    >
                      {name}
                    </Heading>
                    <Button
                      {...Tooltip.getTriggerProps({ id: buttonId, tooltipId, tooltipPurpose: 'describe' })}
                      aria-label={`Copy import path for ${name}`}
                      iconLeft={<CopyIcon />}
                      size="small"
                      variant="tertiary"
                      onClick={() => copyImportPath(name, kebabName)}
                    />
                    <Tooltip id={tooltipId} triggerId={buttonId} placement="top">
                      Copy import
                    </Tooltip>
                  </header>
                  <div className={elGalleryTileBody}>
                    <div className={elGalleryTileIcon}>
                      <Component color="secondary" size="100%" />
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      )}

      <Toaster position="bottom-right" />
    </div>
  )
}
