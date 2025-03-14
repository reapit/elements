import { render, screen, fireEvent } from '@testing-library/react'
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

  test('should not call onClick when disabled is true', () => {
    const onClick = vi.fn()
    render(
      <SplitButton>
        <SplitButton.Action onClick={onClick} disabled>
          Button
        </SplitButton.Action>
        <SplitButton.Menu />
      </SplitButton>,
    )
    const button = screen.getByRole('button', { name: /button/i })
    fireEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  test('should call onClick when disabled is false', () => {
    const onClick = vi.fn()
    render(
      <SplitButton>
        <SplitButton.Action onClick={onClick}>Button</SplitButton.Action>
        <SplitButton.Menu />
      </SplitButton>,
    )
    const button = screen.getByRole('button', { name: /button/i })
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
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
