import { render, fireEvent } from '@testing-library/react'
import { Button, ButtonProps, FloatingButton, DeprecatedButtonGroup, ButtonSize, ButtonIcon } from '../index'

const props: ButtonProps = {
  type: 'submit',
  intent: 'primary',
  disabled: false,
  loading: false,
  onClick: jest.fn(),
}

describe('Button', () => {
  it('should match a snapshot', () => {
    expect(render(<Button {...props}>button text</Button>)).toMatchSnapshot()
  })

  it('should match a snapshot with all modifiers', () => {
    const fullProps = {
      ...props,
      loading: true,
      disabled: true,
      buttonSize: 'small' as ButtonSize,
      buttonIcon: {
        icon: 'add',
        position: 'left',
      } as ButtonIcon,
      className: 'some-class',
    }
    expect(render(<Button {...fullProps}>button text</Button>)).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    expect(
      render(
        <FloatingButton icon="add" {...props}>
          button text
        </FloatingButton>,
      ),
    ).toMatchSnapshot()
  })

  it('should fire a click event correctly', async () => {
    const wrapper = render(<Button {...props}>button text</Button>)

    fireEvent.click(wrapper.getByText('button text'))

    expect(props.onClick).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('DeprecatedButtonGroup', () => {
  it('should match a snapshot for align left', () => {
    expect(
      render(
        <DeprecatedButtonGroup alignment="left">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </DeprecatedButtonGroup>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for align right', () => {
    expect(
      render(
        <DeprecatedButtonGroup alignment="right">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </DeprecatedButtonGroup>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for align center', () => {
    expect(
      render(
        <DeprecatedButtonGroup alignment="center">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </DeprecatedButtonGroup>,
      ),
    ).toMatchSnapshot()
  })
})
