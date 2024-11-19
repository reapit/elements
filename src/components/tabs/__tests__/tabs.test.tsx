import { render } from '@testing-library/react'
import { Tabs, handleKeyboardTabChange } from '../index'
import { MutableRefObject } from 'react'

describe('Tabs', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <Tabs
        name="my-cool-toggle-radio"
        isFullWidth
        isControlled
        options={[
          {
            id: 'option-1',
            value: 'option-1',
            text: 'Option 1',
            isChecked: true,
          },
          {
            id: 'option-2',
            value: 'option-2',
            text: 'Option 2',
            isChecked: false,
          },
          {
            id: 'option-3',
            value: 'option-3',
            text: 'Option 3',
            isChecked: false,
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleKeyboardTabChange', () => {
  it('should trigger click event on the correct tab', () => {
    const tabsRefs: MutableRefObject<(HTMLInputElement | null)[]> = {
      current: [
        { click: vi.fn() } as unknown as HTMLInputElement,
        { click: vi.fn() } as unknown as HTMLInputElement,
        { click: vi.fn() } as unknown as HTMLInputElement,
      ],
    }
    const index = 1

    const curried = handleKeyboardTabChange(tabsRefs, index)

    curried()

    expect(tabsRefs.current[index]?.click).toHaveBeenCalled()

    tabsRefs.current.forEach((tab, tabIndex) => {
      if (tabIndex !== index) {
        expect(tab?.click).not.toHaveBeenCalled()
      }
    })
  })
})
