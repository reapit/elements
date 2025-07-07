import { DeprecatedPageHeader } from '.'

export default {
  title: 'Deprecated/DeprecatedPageHeader',
  component: DeprecatedPageHeader,
}

export const BasicUsage = {
  render: ({}) => (
    <DeprecatedPageHeader
      breadcrumb={{
        defaultActiveIndex: 3,
        items: [
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
        ],
      }}
      avatar={{
        type: 'image',
        src: 'https://picsum.photos/200/300',
      }}
      pageTitle={{
        children: 'Page Title',
      }}
      tags={[
        {
          intent: 'primary',
          children: 'Tag 1',
        },
        {
          intent: 'primary',
          children: 'Tag 2',
        },
      ]}
      pageSubtitle={{
        children: 'Page Sub Title',
      }}
      pageInfo={[
        {
          children: 'Page Info 1',
        },
        {
          children: 'Page Info 2',
        },
        {
          children: 'Page Info 3',
        },
      ]}
      buttons={[
        {
          children: 'Button 1',
        },
        {
          children: 'Button 2',
        },
      ]}
      tabs={{
        name: 'my-cool-tabs-full-width',
        isFullWidth: true,
        hasNoBorder: true,

        options: [
          {
            id: 'tab-1-fw',
            value: 'tab-1-fw',
            text: 'Tab Content 1',
            isChecked: true,
          },
          {
            id: 'tab-2-fw',
            value: 'tab-2-fw',
            text: 'Tab Content 2',
            isChecked: false,
          },
          {
            id: 'tab-3-fw',
            value: 'tab-3-fw',
            text: 'Tab Content 3',
            isChecked: false,
          },
        ],
      }}
    />
  ),
}
