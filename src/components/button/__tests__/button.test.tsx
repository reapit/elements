import { render, fireEvent } from '@testing-library/react'
import { Button, DeprecatedButtonGroup, FloatingButton } from '../index'
import { Icon } from '#src/components/icon'

describe('Button', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<Button>Button</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with variant and icons', () => {
    const { asFragment } = render(
      <Button variant="primary" iconLeft={<Icon icon="star" />} iconRight={<Icon icon="star" />}>
        Button
      </Button>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot for icon-only button', () => {
    const { asFragment } = render(<Button variant="primary" iconLeft={<Icon icon="star" />} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should fire click event on button element', () => {
    const onClickMock = vi.fn()
    const { asFragment, getByText } = render(<Button onClick={onClickMock}>Button</Button>)

    // Capture the initial render as a snapshot
    expect(asFragment()).toMatchSnapshot()

    // Capture click event
    fireEvent.click(getByText('Button'))
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  test('should match snapshot for <ElAnchorButton> as a link button', () => {
    const { asFragment } = render(
      <Button href="https://example.com" iconLeft={<Icon icon="add" />} target="_blank" rel="noOpener noReferrer" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('FloatingButton', () => {
  test('should render FloatingButton with icon', () => {
    const { asFragment } = render(<FloatingButton icon="star" />)
    expect(asFragment()).toMatchSnapshot()
  })
})

/** @deprecated */
describe('DeprecatedButtonGroup', () => {
  test('should match snapshot for align left', () => {
    const { asFragment } = render(
      <DeprecatedButtonGroup alignment="left">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </DeprecatedButtonGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot for align right', () => {
    const { asFragment } = render(
      <DeprecatedButtonGroup alignment="right">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </DeprecatedButtonGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot for align center', () => {
    const { asFragment } = render(
      <DeprecatedButtonGroup alignment="center">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </DeprecatedButtonGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
