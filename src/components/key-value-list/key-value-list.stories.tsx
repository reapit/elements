import { KeyValueList } from '.'

export default {
  title: 'KeyValueList',
  component: KeyValueList,
}

export const BasicUsage = {
  render: () => (
    <KeyValueList
      items={[
        {
          key: 'Name',
          value: 'John Doe',
          iconName: 'contact',
          intent: 'primary',
        },
        {
          key: 'Email',
          value: 'email@example.com',
          iconName: 'email',
          intent: 'primary',
        },
        {
          key: 'Parking Spaces',
          value: '2',
          iconName: 'car',
          intent: 'primary',
        },
        {
          key: 'Date Signed Up',
          value: '20th September 2023',
          iconName: 'calendar',
          intent: 'primary',
        },
        {
          key: 'Address',
          value:
            'I added a textEllipsis prop to this one to show how it works. Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia dolorem laudantium, repellat, aut tenetur enim veritatis debitis nostrum iste fugit quas delectus repellendus iusto ratione esse. Ab rem voluptate veritatis.',
          iconName: 'property',
          intent: 'primary',
          textEllipsis: true,
        },
        {
          key: 'Description',
          value:
            'This one I just allowed the text to wrap. Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia dolorem laudantium, repellat, aut tenetur enim veritatis debitis nostrum iste fugit quas delectus repellendus iusto ratione esse. Ab rem voluptate veritatis.',
          iconName: 'file',
          intent: 'primary',
        },
      ]}
    />
  ),
}

export const UsageLargeGrid = {
  render: () => (
    <KeyValueList
      hasGrid
      items={[
        {
          key: 'Name',
          value: 'John Doe',
          iconName: 'contact',
          intent: 'primary',
          colSize: 'half',
        },
        {
          key: 'Email',
          value: 'email@example.com',
          iconName: 'email',
          intent: 'primary',
          colSize: 'half',
        },
        {
          key: 'Parking Spaces',
          value: '2',
          iconName: 'car',
          intent: 'primary',
          colSize: 'half',
        },
        {
          key: 'Date Signed Up',
          value: '20th September 2023',
          iconName: 'calendar',
          intent: 'primary',
          colSize: 'half',
        },
        {
          key: 'Address',
          value:
            'I added a textEllipsis prop to this one to show how it works. Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia dolorem laudantium, repellat, aut tenetur enim veritatis debitis nostrum iste fugit quas delectus repellendus iusto ratione esse. Ab rem voluptate veritatis.',
          iconName: 'property',
          intent: 'primary',
          colSize: 'full',
          textEllipsis: true,
        },
        {
          key: 'Description',
          value:
            'This one I just allowed the text to wrap. Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia dolorem laudantium, repellat, aut tenetur enim veritatis debitis nostrum iste fugit quas delectus repellendus iusto ratione esse. Ab rem voluptate veritatis.',
          iconName: 'file',
          intent: 'primary',
          colSize: 'full',
        },
      ]}
    />
  ),
}
