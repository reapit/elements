import { MenuAltIcon } from '#src/icons/menu-alt'
import { TopBarMenuDrawer } from './menu-drawer'
import { TopBarNavIconItemButton } from '../nav-icon-item'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof TopBarMenuDrawer> = {
  title: 'Core/TopBar/MenuDrawer',
  component: TopBarMenuDrawer,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof TopBarMenuDrawer>

/**
 * At its simplest, you can open and close the menu drawer by controlling it's `isOpen` state. However,
 * you can also open and close it using the new
 * [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API).
 */
export const Example: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <div style={{ padding: '2rem' }}>
          <TopBarNavIconItemButton aria-label="Menu" icon={<MenuAltIcon />} onClick={() => setIsOpen(true)} />
        </div>

        <TopBarMenuDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <TopBarMenuDrawer.Header />
        </TopBarMenuDrawer>
      </>
    )
  },
}
