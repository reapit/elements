import { action } from 'storybook/actions'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef } from 'react'
import { DeprecatedIcon } from '../deprecated-icon'
import { BottomBar } from './bottom-bar'

const meta = {
  title: 'Components/Bottom Bar',
  component: BottomBar,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: null,
    parentRef: null,
  },
} satisfies Meta<typeof BottomBar>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  render: () => {
    const ref = useRef<HTMLElement>(null)

    return (
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <section ref={ref} style={{ height: '100dvh', overflowY: 'scroll', overflowX: 'hidden' }}>
          <div style={{ backgroundColor: 'var(--intent-primary)', height: '180vh' }}>long content</div>
          <div style={{ backgroundColor: 'var(--intent-warning)' }}>short content</div>
          <BottomBar parentRef={ref}>
            <BottomBar.Item icon={<DeprecatedIcon icon="star" />} isActive onClick={action('clicked')}>
              Menu 1
            </BottomBar.Item>
            <BottomBar.Item icon={<DeprecatedIcon icon="star" />} onClick={action('clicked')} hasBadge>
              Menu 2
            </BottomBar.Item>
            <BottomBar.Item icon={<DeprecatedIcon icon="star" />} onClick={action('clicked')}>
              Menu 3
            </BottomBar.Item>
            <BottomBar.Item icon={<DeprecatedIcon icon="star" />} onClick={action('clicked')}>
              Menu 4
            </BottomBar.Item>
            <BottomBar.Item icon={<DeprecatedIcon icon="star" />} onClick={action('clicked')}>
              Menu 5
            </BottomBar.Item>
          </BottomBar>
        </section>
      </main>
    )
  },
}

export const WithOverflowMenu: Story = {
  render: () => {
    const ref = useRef<HTMLElement>(null)

    return (
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <section ref={ref} style={{ height: '100dvh', overflowY: 'scroll', overflowX: 'hidden' }}>
          <div style={{ backgroundColor: 'var(--intent-primary)', height: '180vh' }}>long content</div>
          <div style={{ backgroundColor: 'var(--intent-warning)' }}>short content</div>
          <BottomBar parentRef={ref}>
            <BottomBar.Item icon={<DeprecatedIcon icon="star" />} isActive onClick={action('clicked')}>
              Menu 1
            </BottomBar.Item>
            <BottomBar.Item icon={<DeprecatedIcon icon="star" />} onClick={action('clicked')} hasBadge>
              Menu 2
            </BottomBar.Item>
            <BottomBar.Item icon={<DeprecatedIcon icon="star" />} onClick={action('clicked')}>
              Menu 3
            </BottomBar.Item>
            <BottomBar.Item icon={<DeprecatedIcon icon="star" />} onClick={action('clicked')}>
              Menu 4
            </BottomBar.Item>
            <BottomBar.MoreMenu>
              <BottomBar.MoreMenuItem label="Menu 5" />
              <BottomBar.MoreMenuItem label="Menu 6" />
            </BottomBar.MoreMenu>
          </BottomBar>
        </section>
      </main>
    )
  },
}
