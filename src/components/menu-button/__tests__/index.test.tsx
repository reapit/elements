import { fireEvent, render } from '@testing-library/react'
import { MenuButton } from '..'
import { screen } from '@testing-library/dom'
import '@testing-library/jest-dom'

describe('MenuButton suite', () => {
  describe('Basic', () => {
    it('should render the button with the correct label', () => {
      const { asFragment } = render(<MenuButton menuGroups={[]} label="MenuButton label" />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('should render properly using optional icon, intent and hasBorder props', () => {
      const { asFragment } = render(
        <MenuButton menuGroups={[]} icon="add" intent="primary" hasBorder label="MenuButton label" />,
      )
      expect(asFragment()).toMatchSnapshot()
    })

    it('should toggle the menu on button click', () => {
      render(
        <MenuButton
          menuGroups={[
            {
              items: [
                {
                  href: '/',
                  children: 'This is a link',
                },
              ],
            },
          ]}
          label="MenuButton label"
        />,
      )

      const button = screen.getByText('MenuButton label')
      fireEvent.click(button)

      const panel = screen.getByText('This is a link')
      expect(panel).toBeInTheDocument()

      fireEvent.click(button)
      expect(panel).not.toBeVisible()
    })

    it('should toggle the menu on overlay click', () => {
      render(
        <div>
          <MenuButton
            menuGroups={[
              {
                items: [
                  {
                    href: '/',
                    children: 'This is a 1st link',
                  },
                ],
              },
            ]}
            label="MenuButton label 1"
          />
          <MenuButton
            menuGroups={[
              {
                items: [
                  {
                    href: '/',
                    children: 'This is a 2nd link',
                  },
                ],
              },
            ]}
            label="MenuButton label 2"
          />
        </div>,
      )

      const button = screen.getByText('MenuButton label 1')
      fireEvent.click(button)

      const panel = screen.getByText('This is a 1st link')
      expect(panel).toBeInTheDocument()
      const second_panel = screen.queryByText('This is a 2nd link')
      expect(second_panel).not.toBeInTheDocument()

      fireEvent.click(button.parentElement!)
      expect(panel).not.toBeInTheDocument()
      expect(second_panel).not.toBeInTheDocument()
    })
  })

  describe('Button', () => {
    const mockOnClick = jest.fn()
    it('should render menu items as buttons and handle click events', () => {
      render(
        <MenuButton
          label="MenuButton label"
          menuGroups={[
            {
              title: 'Group title',
              items: [
                {
                  children: 'This is a Button 1',
                  onClick: mockOnClick,
                },
              ],
            },
          ]}
        />,
      )

      fireEvent.click(screen.getByText('MenuButton label'))

      const button = screen.getByText('This is a Button 1')

      fireEvent.click(button)

      expect(mockOnClick).toHaveBeenCalledTimes(1)

      expect(screen.queryByText('This is a Button 1')).not.toBeInTheDocument()
    })
  })
})
