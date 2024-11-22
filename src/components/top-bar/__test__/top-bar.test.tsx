import { render } from '@testing-library/react'
import { TopBar, TopBarProps } from '../top-bar'
import { Icon } from '../../icon'

vi.mock('../../icon', () => ({
  Icon: vi.fn(() => <div data-testid="icon" />),
}))

describe('TopBar Snapshot', () => {
  const mockProps: TopBarProps = {
    leftContent: {
      appSwitcherProps: 'app-switcher-props',
      mainNavigationsProps: [
        { href: '/', 'aria-label': 'Button 1', children: 'Button 1' },
        { href: '/', 'aria-label': 'Button 2', children: 'Button 2' },
        { href: '/', 'aria-label': 'Button 3', children: 'Button 3' },
        { href: '/', 'aria-label': 'Button 4', children: 'Button 4' },
        { href: '/', 'aria-label': 'Button 5', children: 'Button 5' },
        { href: '/', 'aria-label': 'Button 6', children: 'Button 6' },
        { href: '/', 'aria-label': 'Button 7', children: 'Button 7' },
      ],
    },
    rightContent: {
      avatarProps: {
        label: 'AD',
        onClick: vi.fn(),
      },
      secondaryNavigationsProps: [
        {
          onClick: vi.fn(),
          icon: <Icon icon="star" />,
          'aria-label': 'example 1',
        },
        {
          onClick: vi.fn(),
          icon: <Icon icon="star" />,
          'aria-label': 'example 2',
        },
        {
          onClick: vi.fn(),
          icon: <Icon icon="star" />,
          'aria-label': 'example 3',
        },
      ],
      searchButtonProps: {
        isShortcutVisible: true,
      },
    },
  }

  it('should match snapshot', () => {
    const { asFragment } = render(<TopBar {...mockProps} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
