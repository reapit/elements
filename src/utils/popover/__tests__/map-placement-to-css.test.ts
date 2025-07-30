import { mapPlacementToCSS } from '../map-placement-to-css'
import type { PopoverPlacement } from '../map-placement-to-css'

export const supportedPopoverPlacements = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
] as const satisfies PopoverPlacement[]

test.each(supportedPopoverPlacements)('produces correct CSS for the "%s" placement', (placement) => {
  const fakeGap = 'var(--fake-gap)'
  expect(mapPlacementToCSS(placement, fakeGap)).toMatchSnapshot()
})
