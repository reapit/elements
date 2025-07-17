import { render, screen, fireEvent } from '@testing-library/react'
import { DeprecatedSplitButton } from '../split-button'

describe('DeprecatedSplitButton', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <DeprecatedSplitButton>
        <DeprecatedSplitButton.Action>Button</DeprecatedSplitButton.Action>
        <DeprecatedSplitButton.Menu />
      </DeprecatedSplitButton>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with secondary variant', () => {
    const { asFragment } = render(
      <DeprecatedSplitButton data-variant="secondary">
        <DeprecatedSplitButton.Action>Button</DeprecatedSplitButton.Action>
        <DeprecatedSplitButton.Menu />
      </DeprecatedSplitButton>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should not call onClick when disabled is true', () => {
    const onClick = vi.fn()
    render(
      <DeprecatedSplitButton>
        <DeprecatedSplitButton.Action onClick={onClick} disabled>
          Button
        </DeprecatedSplitButton.Action>
        <DeprecatedSplitButton.Menu />
      </DeprecatedSplitButton>,
    )
    const button = screen.getByRole('button', { name: /button/i })
    fireEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  test('should call onClick when disabled is false', () => {
    const onClick = vi.fn()
    render(
      <DeprecatedSplitButton>
        <DeprecatedSplitButton.Action onClick={onClick}>Button</DeprecatedSplitButton.Action>
        <DeprecatedSplitButton.Menu />
      </DeprecatedSplitButton>,
    )
    const button = screen.getByRole('button', { name: /button/i })
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('should match snapshot with large size', () => {
    const { asFragment } = render(
      <DeprecatedSplitButton data-size="large">
        <DeprecatedSplitButton.Action>Button</DeprecatedSplitButton.Action>
        <DeprecatedSplitButton.Menu />
      </DeprecatedSplitButton>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
