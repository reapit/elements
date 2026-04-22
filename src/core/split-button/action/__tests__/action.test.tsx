import { render, screen } from '@testing-library/react'
import { SplitButtonAction } from '../action'
import { SplitButtonContext } from '../../context'

test('renders a button element', () => {
  render(
    <SplitButtonContext.Provider value={{ busy: undefined, size: 'medium', variant: 'primary' }}>
      <SplitButtonAction
        aria-disabled={false}
        disabled={false}
        iconLeft={undefined}
        isBusy={false}
        isDestructive={false}
      >
        Button
      </SplitButtonAction>
    </SplitButtonContext.Provider>,
  )
  expect(screen.getByRole('button')).toBeVisible()
})
