import { act, fireEvent, render, screen } from '@testing-library/react'
import { Menu as MenuComposed } from '..'

describe('MenuComposed component', () => {
  it('should render MenuComposed with groups and match snapshot', () => {
    const mockedOnChange = jest.fn()
    const { asFragment } = render(
      <MenuComposed
        groups={[
          {
            title: 'Group 1',
            type: 'radio',
            items: [{ label: 'Item 1', defaultChecked: true }, { label: 'Item 2' }],
            onChange: mockedOnChange,
          },
          {
            title: 'Group 2',
            items: [{ children: 'Item 3' }, { children: 'Item 4' }],
          },
        ]}
      />,
    )
    expect(asFragment()).toMatchSnapshot()

    act(() => {
      fireEvent.click(screen.getByText('Item 2'))
    })

    expect(mockedOnChange).toHaveBeenCalled()
  })
})
