import { figmaDesignUrls } from '#src/storybook/figma/index'
import type { Meta, StoryObj } from '@storybook/react'
import { SideBar } from './side-bar'

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
        <SideBar>Placeholder sidebar content</SideBar>
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
