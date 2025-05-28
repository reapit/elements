import { figmaDesignUrls } from '#src/storybook/figma/index'
import type { Meta, StoryObj } from '@storybook/react'
import { SideBar } from './side-bar'
import { Icon } from '../icon'
import { SideBarCollapseButton } from './collapse-button'

export default {
  title: 'Components/SideBar',
  component: SideBar,
} as Meta<typeof SideBar>

type Story = StoryObj<typeof SideBar>

// const Customicon = () => (
//   <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
//     <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//   </svg>
// )

export const Default: Story = {
  args: {
    children: (
      <SideBar.MenuList>
        <SideBar.MenuItem icon={<Icon icon="dashboard" />} href="#">
          Menu Item 1
        </SideBar.MenuItem>

        <SideBar.MenuGroup
          summary={<SideBar.MenuGroupSummary icon={<Icon icon="property" />}>Menu Item 2</SideBar.MenuGroupSummary>}
        >
          <SideBar.Submenu>
            <SideBar.SubmenuItem href="#">Submenu Item 1</SideBar.SubmenuItem>
            <SideBar.SubmenuItem href="#" isActive>
              Submenu Item 2
            </SideBar.SubmenuItem>
            <SideBar.SubmenuItem href="#">Submenu Item 3</SideBar.SubmenuItem>
          </SideBar.Submenu>
        </SideBar.MenuGroup>

        <SideBar.MenuGroup
          summary={<SideBar.MenuGroupSummary icon={<Icon icon="user" />}>Menu Item 3</SideBar.MenuGroupSummary>}
        >
          <SideBar.Submenu>
            <SideBar.SubmenuItem href="#">Submenu Item 1</SideBar.SubmenuItem>
            <SideBar.SubmenuItem href="#">Submenu Item 2</SideBar.SubmenuItem>
          </SideBar.Submenu>
        </SideBar.MenuGroup>

        <SideBar.MenuItem icon={<Icon icon="settings" />} href="#">
          Menu Item 4
        </SideBar.MenuItem>
      </SideBar.MenuList>
    ),
    footer: <SideBar.CollapseButton />,
  },
  render: (args) => {
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

        <SideBar {...args}></SideBar>
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
