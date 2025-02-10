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

const Customicon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

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
          <SideBar.MenuList>
            <SideBarMenuItem isActive icon={<Icon icon="property" />} onClick={console.log}>
              SideBar Item (active)
            </SideBarMenuItem>

            <SideBarMenuItem icon={<Customicon />} onClick={console.log}>
              External Icon
            </SideBarMenuItem>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
              return (
                <SideBarMenuItem key={i} icon={<Icon icon="property" />} href="/#">
                  SideBar Item
                </SideBarMenuItem>
              )
            })}
          </SideBar.MenuList>
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
