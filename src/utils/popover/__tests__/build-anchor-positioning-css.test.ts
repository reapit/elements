import { buildAnchorPositioningCSS } from '../build-anchor-positioning-css'
import { mapPlacementToCSS } from '../map-placement-to-css'

vi.mock('../map-placement-to-css')
vi.mocked(mapPlacementToCSS).mockReturnValue('/* mocked positioning css */')

beforeEach(() => {
  vi.mocked(mapPlacementToCSS).mockClear()
})

test('calls mapPlacementToCSS', () => {
  buildAnchorPositioningCSS({
    anchorElementId: 'anchor',
    gap: 'var(--fake-gap)',
    placement: 'top-start',
    positionedElementId: 'positioned-element',
    positionTryFallbacks: 'flip-block',
  })

  expect(mapPlacementToCSS).toHaveBeenCalledWith('top-start', 'var(--fake-gap)')
})

test('produces CSS for the anchor element and positioned element', () => {
  expect(
    buildAnchorPositioningCSS({
      anchorElementId: ':r1:', // simulate a `useId` string
      gap: 'var(--fake-gap)',
      placement: 'top-start',
      positionedElementId: 'positioned-element',
      positionTryFallbacks: 'flip-block, flip-inline',
    }),
  ).toMatchInlineSnapshot(`
    "
        #\\:r1\\: {
          anchor-name: --\\:r1\\:;
        }

        #positioned-element {
          position-anchor: --\\:r1\\:;
          position-try-fallbacks: flip-block, flip-inline;
          /* mocked positioning css */
        }
      "
  `)
})
