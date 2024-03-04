import { MouseEvent } from 'react'
import { render } from '@testing-library/react'
import { Card, handleMouseHover, handleToggleContextMenu } from '../card-components'

describe('Card', () => {
  it('should match a snapshot and render children with no props', () => {
    const wrapper = render(
      <Card>
        <div>I am a child</div>
      </Card>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot and render children with full props', () => {
    const wrapper = render(
      <Card
        hasMainCard
        hasListCard
        mainCardHeading="Main Heading"
        mainCardSubHeading="Main Subheading"
        mainCardSubHeadingAdditional="Main Subheading Additional"
        mainCardBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        mainCardImgUrl="https://via.placeholder.com/72x72.svg"
        listCardHeading="List Card Heading"
        listCardSubHeading="List Card Sub Heading"
        listCardItems={[
          {
            listCardItemHeading: 'Applicant',
            listCardItemSubHeading: 'Bob Smith',
            listCardItemIcon: 'user',
            onClick: () => console.log('Clicking'),
          },
          {
            listCardItemHeading: 'Property',
            listCardItemSubHeading: 'Some Address',
            listCardItemIcon: 'property',
            onClick: () => console.log('Clicking'),
          },
        ]}
      >
        <div>I am a child</div>
      </Card>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleToggleContextMenu', () => {
  it('should correctly toggle the context menu', () => {
    const mockValue = false
    const mockSetValue = jest.fn()
    const curried = handleToggleContextMenu(mockValue, mockSetValue)
    const event = {
      stopPropagation: jest.fn(),
    }

    curried(event as unknown as MouseEvent)

    expect(mockSetValue).toHaveBeenCalledTimes(1)
    expect(mockSetValue).toHaveBeenCalledWith(true)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})

describe('handleMouseHover', () => {
  it('should set the hover index', () => {
    const hoverIndex = 1
    const setHoverIndex = jest.fn()

    const curried = handleMouseHover(hoverIndex, setHoverIndex)

    curried()

    expect(setHoverIndex).toHaveBeenCalledWith(hoverIndex)
  })
})
