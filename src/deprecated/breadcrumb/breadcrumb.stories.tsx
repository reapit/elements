import { DeprecatedBreadCrumb } from './index'

export default {
  title: 'Deprecated/DeprecatedBreadCrumb',
  component: DeprecatedBreadCrumb,
}

export const BasicUsage = {
  render: ({}) => (
    <DeprecatedBreadCrumb
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

export const DefaultIndex = {
  render: ({}) => (
    <DeprecatedBreadCrumb
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
