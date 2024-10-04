import { render } from '@testing-library/react'
import { Menu as MenuComposed } from '..'

describe('MenuComposed component', () => {
  const mockGroups = [
    {
      title: 'Group 1',
      items: [{ children: 'Item 1' }, { children: 'Item 2' }],
    },
    {
      title: 'Group 2',
      items: [{ children: 'Item 3' }, { children: 'Item 4' }],
    },
  ]

  it('should render MenuComposed with groups and match snapshot', () => {
    const { asFragment } = render(<MenuComposed groups={mockGroups} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
