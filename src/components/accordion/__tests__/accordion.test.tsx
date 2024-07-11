import { render } from '@testing-library/react'
import { Accordion, handleSetOpenItem } from '../accordion'
import { Icon } from '../../icon'
import { elMr1 } from '../../../styles/spacing'

describe('Accordion react shorthand', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <Accordion
        items={[
          {
            title: 'Accordion Item 1',
            content: 'Accordion Content 1',
            titleItems: [
              <>
                <Icon className={elMr1} icon="car" />2
              </>,
              <>
                <Icon className={elMr1} icon="user" />5
              </>,
            ],
          },
          {
            title: 'Accordion Item 2',
            content: 'Accordion Content 2',
            titleItems: [
              <>
                <Icon className={elMr1} icon="car" />2
              </>,
              <>
                <Icon className={elMr1} icon="user" />5
              </>,
            ],
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleSetOpenItem', () => {
  it('should set the open item to the provided index if it is not currently open', () => {
    const setOpenItem = jest.fn()
    const onClick = jest.fn()
    const openItem = 1

    const curried = handleSetOpenItem(openItem, setOpenItem, onClick)

    curried()

    expect(setOpenItem.mock.calls[0][0]()).toEqual(openItem)
    expect(onClick).toHaveBeenCalled()
  })
})
