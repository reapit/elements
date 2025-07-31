import { getPopoverTriggerProps } from '../get-popover-trigger-props'

test('maps popover attributes to React 18 compatible attributes', () => {
  expect(getPopoverTriggerProps({ id: 'trigger', popoverTarget: 'target', popoverTargetAction: 'toggle' })).toEqual({
    id: 'trigger',
    popovertarget: 'target',
    popovertargetaction: 'toggle',
  })
})
