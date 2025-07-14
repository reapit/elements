import { render, fireEvent, screen } from '@testing-library/react'
import { DeprecatedButton, DeprecatedButtonGroup, DeprecatedFloatingButton } from '../index'
import { DeprecatedIcon } from '#src/deprecated/icon/index'

describe('Button', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<DeprecatedButton>Button</DeprecatedButton>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with variant and icons', () => {
    const { asFragment } = render(
      <DeprecatedButton
        variant="primary"
        iconLeft={<DeprecatedIcon icon="star" />}
        iconRight={<DeprecatedIcon icon="star" />}
      >
        Button
      </DeprecatedButton>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot for icon-only button', () => {
    const { asFragment } = render(<DeprecatedButton variant="primary" iconLeft={<DeprecatedIcon icon="star" />} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should fire click event on button element', () => {
    const onClickMock = vi.fn()
    const { asFragment, getByText } = render(<DeprecatedButton onClick={onClickMock}>Button</DeprecatedButton>)

    // Capture the initial render as a snapshot
    expect(asFragment()).toMatchSnapshot()

    // Capture click event
    fireEvent.click(getByText('Button'))
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  test('should match snapshot for <ElAnchorButton> as a link button', () => {
    const { asFragment } = render(
      <DeprecatedButton
        href="https://example.com"
        iconLeft={<DeprecatedIcon icon="add" />}
        target="_blank"
        rel="noOpener noReferrer"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should not call onClick when isDisabled is true', () => {
    const onClick = vi.fn()
    render(
      <DeprecatedButton isDisabled onClick={onClick}>
        Click Me
      </DeprecatedButton>,
    )

    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  test('should call onClick when isDisabled is false', () => {
    const onClick = vi.fn()
    render(
      <DeprecatedButton isDisabled={false} onClick={onClick}>
        Click Me
      </DeprecatedButton>,
    )

    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('FloatingButton', () => {
  test('should render FloatingButton with icon', () => {
    const { asFragment } = render(<DeprecatedFloatingButton icon="star" />)
    expect(asFragment()).toMatchSnapshot()
  })
})

/** @deprecated */
describe('DeprecatedButtonGroup', () => {
  test('should match snapshot for align left', () => {
    const { asFragment } = render(
      <DeprecatedButtonGroup alignment="left">
        <DeprecatedButton>1</DeprecatedButton>
        <DeprecatedButton>2</DeprecatedButton>
        <DeprecatedButton>3</DeprecatedButton>
      </DeprecatedButtonGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot for align right', () => {
    const { asFragment } = render(
      <DeprecatedButtonGroup alignment="right">
        <DeprecatedButton>1</DeprecatedButton>
        <DeprecatedButton>2</DeprecatedButton>
        <DeprecatedButton>3</DeprecatedButton>
      </DeprecatedButtonGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot for align center', () => {
    const { asFragment } = render(
      <DeprecatedButtonGroup alignment="center">
        <DeprecatedButton>1</DeprecatedButton>
        <DeprecatedButton>2</DeprecatedButton>
        <DeprecatedButton>3</DeprecatedButton>
      </DeprecatedButtonGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
