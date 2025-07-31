import { getTooltipTriggerProps } from '../get-tooltip-trigger-props'

test('returns aria-describedby when `tooltipPurpose` is "describe"', () => {
  const result = getTooltipTriggerProps({
    id: 'trigger',
    tooltipId: 'test-tooltip',
    tooltipPurpose: 'describe',
  })

  expect(result).toEqual({
    'aria-describedby': 'test-tooltip',
    id: 'trigger',
  })
})

test('returns aria-labelledby when `tooltipPurpose` is "label"', () => {
  const result = getTooltipTriggerProps({
    id: 'trigger',
    tooltipId: 'test-tooltip',
    tooltipPurpose: 'label',
  })

  expect(result).toEqual({
    'aria-labelledby': 'test-tooltip',
    id: 'trigger',
  })
})
