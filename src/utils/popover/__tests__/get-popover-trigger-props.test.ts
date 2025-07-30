import { getPopoverTriggerProps } from '../get-popover-trigger-props'

test('maps popover attributes to React 18 compatible attributes', () => {
  expect(getPopoverTriggerProps({ popoverTarget: 'target', popoverTargetAction: 'toggle' })).toEqual({
    popovertarget: 'target',
    popovertargetaction: 'toggle',
  })
})
