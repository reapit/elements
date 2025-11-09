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
  expect(mapPlacementToCSS({ gap: fakeGap, placement })).toMatchSnapshot()
})

test('produces correct CSS for a custom placement', () => {
  const fakeGap = 'var(--fake-gap)'
  expect(
    mapPlacementToCSS({
      gap: fakeGap,
      placement: {
        alignSelf: 'anchor-center',
        bottom: 'anchor(bottom)',
        justifySelf: 'anchor-center',
        left: 'anchor(left)',
        right: 'anchor(right)',
        top: 'anchor(top)',
      },
    }),
  ).toMatchSnapshot()
})

test('produces correct CSS for a custom placement that has some properties', () => {
  const fakeGap = 'var(--fake-gap)'
  expect(
    mapPlacementToCSS({
      gap: fakeGap,
      placement: {
        justifySelf: 'anchor-center',
        top: 'anchor(top)',
      },
    }),
  ).toMatchSnapshot()
})

test('produces correct CSS for a custom placement that has no properties', () => {
  const fakeGap = 'var(--fake-gap)'
  expect(
    mapPlacementToCSS({
      gap: fakeGap,
      placement: {},
    }),
  ).toMatchSnapshot()
})
