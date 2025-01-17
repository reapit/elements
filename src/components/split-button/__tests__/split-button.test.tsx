import { render } from '@testing-library/react'
import { SplitButton } from '..'

describe('SplitButton', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <SplitButton>
        <SplitButton.Action>Button</SplitButton.Action>
        <SplitButton.Menu />
      </SplitButton>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with secondary variant', () => {
    const { asFragment } = render(
      <SplitButton data-variant="secondary">
        <SplitButton.Action>Button</SplitButton.Action>
        <SplitButton.Menu />
      </SplitButton>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with action button disabled', () => {
    const { asFragment } = render(
      <SplitButton>
        <SplitButton.Action disabled>Button</SplitButton.Action>
        <SplitButton.Menu />
      </SplitButton>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with large size', () => {
    const { asFragment } = render(
      <SplitButton data-size="large">
        <SplitButton.Action>Button</SplitButton.Action>
        <SplitButton.Menu />
      </SplitButton>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
