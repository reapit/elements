import { BreadCrumb } from './index'

export default {
  title: 'BreadCrumb',
  component: BreadCrumb,
}

export const BasicUsage = {
  render: () => (
    <BreadCrumb
      items={[
        {
          text: 'Home',
          onClick: () => console.log('Home clicked'),
        },
        {
          text: 'Level 1',
          onClick: () => console.log('1 clicked'),
        },
        {
          text: 'Level 2',
          onClick: () => console.log('2 clicked'),
        },
        {
          text: 'Level 3',
          onClick: () => console.log('3 clicked'),
        },
      ]}
    />
  ),
}

export const DefaultIndex = {
  render: () => (
    <BreadCrumb
      defaultActiveIndex={3}
      items={[
        {
          text: 'Home',
          onClick: () => console.log('Home clicked'),
        },
        {
          text: 'Level 1',
          onClick: () => console.log('1 clicked'),
        },
        {
          text: 'Level 2',
          onClick: () => console.log('2 clicked'),
        },
        {
          text: 'Level 3',
          onClick: () => console.log('3 clicked'),
        },
      ]}
    />
  ),
}
