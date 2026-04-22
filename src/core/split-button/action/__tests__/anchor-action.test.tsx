import { render, screen } from '@testing-library/react'
import { SplitButtonAnchorAction } from '../anchor-action'
import { SplitButtonContext } from '../../context'
import { AddIcon } from '#src/icons/add'

test('renders a link element', () => {
  render(
    <SplitButtonContext.Provider value={{ busy: undefined, size: 'medium', variant: 'primary' }}>
      <SplitButtonAnchorAction
        aria-disabled={false}
        iconLeft={<AddIcon />}
        isBusy={false}
        isDestructive={false}
        href="https://www.google.com"
      >
        Anchor button
      </SplitButtonAnchorAction>
    </SplitButtonContext.Provider>,
  )
  expect(screen.getByRole('link')).toBeVisible()
})
