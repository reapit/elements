import { fireEvent, render, screen, within } from '@testing-library/react'
import { IconGallery, buildImportPath } from '../icon-gallery'
import { ICON_KEBAB_NAMES } from '../all-icons'
import * as icons from '../all-icons'

describe('ICON_KEBAB_NAMES barrel map', () => {
  test('has an entry for every exported icon', () => {
    const exportedIcons = Object.keys(icons).filter((name) => name.endsWith('Icon'))
    for (const name of exportedIcons) {
      expect(ICON_KEBAB_NAMES[name]).toBeDefined()
    }
  })
})

describe('buildImportPath', () => {
  test.each([
    ['BedIcon', 'bed', `import { BedIcon } from '@reapit/elements/icons/bed'`],
    ['W3wIcon', 'w3w', `import { W3wIcon } from '@reapit/elements/icons/w3w'`],
    ['AiSparkle1Icon', 'ai-sparkle-1', `import { AiSparkle1Icon } from '@reapit/elements/icons/ai-sparkle-1'`],
  ])('%s → %s', (name, kebab, expected) => {
    expect(buildImportPath(name, kebab)).toBe(expected)
  })
})

function getSearchInput() {
  return screen.getByRole('searchbox', { name: 'Search icons' })
}

function getTiles() {
  return screen.getAllByRole('listitem')
}

describe('IconGallery', () => {
  test('renders all icons by default', () => {
    render(<IconGallery />)
    // 200 icons currently — assert "more than 100" rather than the exact number so the
    // test does not need updating every time icons are added or removed.
    expect(getTiles().length).toBeGreaterThan(100)
  })

  test('filters by icon name', () => {
    render(<IconGallery />)
    fireEvent.change(getSearchInput(), { target: { value: 'arrow' } })

    const tiles = getTiles()
    // ArrowUp/Down/Left/Right
    expect(tiles.length).toBe(4)
    for (const tile of tiles) {
      expect(within(tile).getByText(/^Arrow(Up|Down|Left|Right)Icon$/)).toBeVisible()
    }
  })

  test('filters by synonym', () => {
    render(<IconGallery />)
    fireEvent.change(getSearchInput(), { target: { value: 'bedroom' } })

    const tiles = getTiles()
    expect(tiles.length).toBe(1)
    expect(within(tiles[0]).getByText('BedIcon')).toBeVisible()
  })

  test('search is case-insensitive', () => {
    render(<IconGallery />)
    fireEvent.change(getSearchInput(), { target: { value: 'BEDROOM' } })
    expect(within(getTiles()[0]).getByText('BedIcon')).toBeVisible()
  })

  test('shows empty state when no icons match', () => {
    render(<IconGallery />)
    fireEvent.change(getSearchInput(), { target: { value: 'zzznomatchzzz' } })

    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(screen.getByText(/No icons match/)).toBeVisible()
  })

  test('copies the subpath import path when the copy button is clicked', () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })

    render(<IconGallery />)
    fireEvent.change(getSearchInput(), { target: { value: 'BedIcon' } })

    const bedTile = getTiles().find((tile) => within(tile).queryByText('BedIcon'))
    expect(bedTile).toBeDefined()

    fireEvent.click(within(bedTile!).getByRole('button', { name: 'Copy import path for BedIcon' }))

    expect(writeText).toHaveBeenCalledWith(`import { BedIcon } from '@reapit/elements/icons/bed'`)
  })
})
