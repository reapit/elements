import { SideBarMenuList } from './menu-list'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/SideBar/MenuList',
  component: SideBarMenuList,
} satisfies Meta<typeof SideBarMenuList>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {},
}

// export const WithGroups: Story = {
//   args: {
//     'aria-label': 'Navigation menu with groups',
//   },
//   render: (args) => (
//     <SideBarMenuList {...args}>
//       <SideBarMenuList.Group label="Main">
//         <SideBarMenuList.Item href="#" active>
//           Dashboard
//         </SideBarMenuList.Item>
//         <SideBarMenuList.Item href="#">Projects</SideBarMenuList.Item>
//       </SideBarMenuList.Group>

//       <SideBarMenuList.Group label="Analytics">
//         <SideBarMenuList.Item href="#">Reports</SideBarMenuList.Item>
//         <SideBarMenuList.Item href="#">Metrics</SideBarMenuList.Item>
//       </SideBarMenuList.Group>

//       <SideBarMenuList.Group label="System">
//         <SideBarMenuList.Item href="#">Settings</SideBarMenuList.Item>
//         <SideBarMenuList.Item href="#">Profile</SideBarMenuList.Item>
//       </SideBarMenuList.Group>
//     </SideBarMenuList>
//   ),
// }

// export const WithIcons: Story = {
//   args: {
//     'aria-label': 'Navigation menu with icons',
//   },
//   render: (args) => (
//     <SideBarMenuList {...args}>
//       <SideBarMenuList.Item href="#" active icon={<HomeIcon />}>
//         Dashboard
//       </SideBarMenuList.Item>
//       <SideBarMenuList.Item href="#" icon={<FolderIcon />}>
//         Projects
//       </SideBarMenuList.Item>
//       <SideBarMenuList.Item href="#" icon={<ChartIcon />}>
//         Reports
//       </SideBarMenuList.Item>
//       <SideBarMenuList.Item href="#" icon={<GearIcon />}>
//         Settings
//       </SideBarMenuList.Item>
//     </SideBarMenuList>
//   ),
// }

// // Simple icon components for the example
// function HomeIcon() {
//   return <span aria-hidden="true">🏠</span>
// }

// function FolderIcon() {
//   return <span aria-hidden="true">📁</span>
// }

// function ChartIcon() {
//   return <span aria-hidden="true">📊</span>
// }

// function GearIcon() {
//   return <span aria-hidden="true">⚙️</span>
// }

// export const KeyboardNavigationDemo: Story = {
//   args: {
//     'aria-label': 'Keyboard navigation demo',
//   },
//   render: (args) => (
//     <div>
//       <p>Click on any menu item and then use the arrow keys to navigate:</p>
//       <SideBarMenuList {...args}>
//         <SideBarMenuList.Item href="#" active>
//           Item 1
//         </SideBarMenuList.Item>
//         <SideBarMenuList.Item href="#">Item 2</SideBarMenuList.Item>
//         <SideBarMenuList.Item href="#">Item 3</SideBarMenuList.Item>
//         <SideBarMenuList.Item href="#">Item 4</SideBarMenuList.Item>
//         <SideBarMenuList.Item href="#">Item 5</SideBarMenuList.Item>
//       </SideBarMenuList>
//     </div>
//   ),
// }

// export const DisabledItems: Story = {
//   args: {
//     'aria-label': 'Menu with disabled items',
//   },
//   render: (args) => (
//     <SideBarMenuList {...args}>
//       <SideBarMenuList.Item href="#" active>
//         Available Item
//       </SideBarMenuList.Item>
//       <SideBarMenuList.Item href="#" disabled>
//         Disabled Item
//       </SideBarMenuList.Item>
//       <SideBarMenuList.Item href="#">Available Item</SideBarMenuList.Item>
//       <SideBarMenuList.Item href="#" disabled>
//         Disabled Item
//       </SideBarMenuList.Item>
//     </SideBarMenuList>
//   ),
// }
