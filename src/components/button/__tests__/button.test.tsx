import { render, fireEvent } from '@testing-library/react'
import { Button, ButtonProps, DeprecatedButtonGroup } from '../index'

const renderButton = (props: Partial<ButtonProps> = {}) => {
  const defaultProps: ButtonProps = {
    children: 'Button',
    onClick: jest.fn(),
    disabled: false,
    ...props,
  }
  return render(<Button {...defaultProps} />)
}

describe('Button', () => {
  test('should match a snapshot', () => {
    const { asFragment } = renderButton()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match variant with snapshot', () => {
    const { asFragment } = renderButton({ isPrimary: true, iconRight: 'star', iconLeft: 'star' })
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match icon only button with snapshot', () => {
    const { asFragment } = renderButton({ iconOnly: 'star' })
    expect(asFragment()).toMatchSnapshot()
  })

  test('should fire a native click event correctly', async () => {
    const onClickMock = jest.fn()
    const wrapper = renderButton({ onClick: onClickMock })

    fireEvent.click(wrapper.getByText('Button'))

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  test('should match snapshot for <ElAnchorButton> as a link button', () => {
    const { asFragment } = renderButton({
      href: 'https://example.com',
      iconLeft: 'add',
      target: '_blank',
      rel: 'noopener noreferrer',
    })
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot for <ElAnchorButton> when busy', () => {
    const { asFragment } = renderButton({
      href: 'https://example.com',
      isBusy: true,
    })
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot for <ElAnchorButton> when disabled', () => {
    const { asFragment } = renderButton({
      href: 'https://example.com',
      isDisabled: true,
      ariaLabel: 'Add Button',
    })
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot for <ElAnchorButton> with icon only when busy', () => {
    const { asFragment } = renderButton({
      href: 'https://example.com',
      isBusy: true,
      iconOnly: 'settings',
    })
    expect(asFragment()).toMatchSnapshot()
  })
})

/** @deprecated */
describe('DeprecatedButtonGroup', () => {
  test('should match a snapshot for align left', () => {
    const { asFragment } = render(
      <DeprecatedButtonGroup alignment="left">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </DeprecatedButtonGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match a snapshot for align right', () => {
    const { asFragment } = render(
      <DeprecatedButtonGroup alignment="right">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </DeprecatedButtonGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match a snapshot for align center', () => {
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
