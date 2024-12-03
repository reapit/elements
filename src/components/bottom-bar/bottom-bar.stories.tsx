import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { BottomBar } from './bottom-bar'
import { Icon } from '../icon'
import { useRef } from 'react'

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

export const FixedUsage: Story = {
  render: () => {
    const ref = useRef<HTMLElement>(null)

    return (
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <section ref={ref} style={{ height: '100dvh', overflowY: 'scroll', overflowX: 'hidden' }}>
          <div style={{ backgroundColor: 'var(--intent-primary)', height: '180vh' }}>long content</div>
          <div style={{ backgroundColor: 'var(--intent-warning)' }}>short content</div>
          <BottomBar parentRef={ref}>
            <BottomBar.Item icon={<Icon icon="star" />} isActive onClick={action('clicked')}>
              Menu 1
            </BottomBar.Item>
            <BottomBar.Item icon={<Icon icon="star" />} onClick={action('clicked')} hasBadge>
              Menu 2
            </BottomBar.Item>
            <BottomBar.Item icon={<Icon icon="star" />} onClick={action('clicked')}>
              Menu 3
            </BottomBar.Item>
            <BottomBar.Item icon={<Icon icon="star" />} onClick={action('clicked')}>
              Menu 4
            </BottomBar.Item>
            <BottomBar.Item icon={<Icon icon="star" />} onClick={action('clicked')}>
              Menu 5
            </BottomBar.Item>
          </BottomBar>
        </section>
      </main>
    )
  },
}

export const ExpandableUsage: Story = {
  render: () => {
    const ref = useRef<HTMLElement>(null)

    return (
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <section ref={ref} style={{ height: '100dvh', overflowY: 'scroll', overflowX: 'hidden' }}>
          <div style={{ backgroundColor: 'var(--intent-primary)', height: '180vh' }}>long content</div>
          <div style={{ backgroundColor: 'var(--intent-warning)' }}>short content</div>
          <BottomBar parentRef={ref}>
            <BottomBar.Item icon={<Icon icon="star" />} isActive onClick={action('clicked')}>
              Menu 1
            </BottomBar.Item>
            <BottomBar.Item icon={<Icon icon="star" />} onClick={action('clicked')} hasBadge>
              Menu 2
            </BottomBar.Item>
            <BottomBar.Item icon={<Icon icon="star" />} onClick={action('clicked')}>
              Menu 3
            </BottomBar.Item>
            <BottomBar.Item icon={<Icon icon="star" />} onClick={action('clicked')}>
              Menu 4
            </BottomBar.Item>
            <BottomBar.MoreMenu>
              <BottomBar.MoreMenuItem>Menu 5</BottomBar.MoreMenuItem>
              <BottomBar.MoreMenuItem>Menu 6</BottomBar.MoreMenuItem>
            </BottomBar.MoreMenu>
          </BottomBar>
        </section>
      </main>
    )
  },
}
