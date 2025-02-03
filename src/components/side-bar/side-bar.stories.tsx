import { figmaDesignUrls } from '#src/storybook/figma/index'
import type { Meta, StoryObj } from '@storybook/react'
import { SideBar } from './side-bar'
import { SideBarMenuItem } from '../side-bar-menu-item'
import { Icon } from '../icon'

export default {
  title: 'Components/Side Bar',
  component: SideBar,
} as Meta<typeof SideBar>

type Story = StoryObj<typeof SideBar>

export const Default: Story = {
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <style>
          {`
            #storybook-root {
              height: 100%;
            }
          `}
        </style>

        <SideBar>
          <SideBar.List>
            <SideBarMenuItem isActive icon={<Icon icon="property" />} onClick={console.log}>
              Button Item (active)
            </SideBarMenuItem>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
              return (
                <SideBarMenuItem key={i} icon={<Icon icon="property" />} href="/#">
                  Anchor Item
                </SideBarMenuItem>
              )
            })}
          </SideBar.List>
        </SideBar>
        <main
          style={{
            width: '100%',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              background: '#ffdaf5',
              paddingTop: '13rem',
              paddingLeft: '3rem',
              fontSize: '1.25rem',
              height: '115vh',
            }}
          >
            Placeholder main content
          </div>
        </main>
      </div>
    )
  },
  parameters: {
    design: {
      type: 'figma',
      url: figmaDesignUrls.sideBar,
      allowFullscreen: true,
    },
  },
}
