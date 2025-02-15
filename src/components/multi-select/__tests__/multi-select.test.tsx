import React, { ChangeEvent } from 'react'
import { render } from '@testing-library/react'
import {
  MultiSelectChip,
  MultiSelect,
  MultiSelectInput,
  handleSetNativeInput,
  handleSelectedOptions,
  MultiSelectSelected,
  MultiSelectUnSelected,
  handleResetDefaultValues,
  handleSelectedKeyboardOptions,
} from '../index'

describe('MultiSelectChip', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <MultiSelectChip id="test-id">
        <span>Some Value</span>
      </MultiSelectChip>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('MultiSelect', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <MultiSelect>
        <span>Some Value</span>
      </MultiSelect>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('MultiSelectSelected', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <MultiSelectSelected>
        <span>Some Value</span>
      </MultiSelectSelected>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('MultiSelectUnSelected', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <MultiSelectUnSelected>
        <span>Some Value</span>
      </MultiSelectUnSelected>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('MultiSelectInput', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <MultiSelectInput
        id="react-example"
        options={[
          { name: 'Item one', value: 'item-one' },
          { name: 'Item two', value: 'item-two' },
          { name: 'Item three', value: 'item-three' },
        ]}
        defaultValues={['item-one']}
      />,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot and render non selected message where there are no selected items', () => {
    const wrapper = render(
      <MultiSelectInput
        id="react-example"
        noneSelectedLabel="No items selected"
        options={[
          { name: 'Item one', value: 'item-one' },
          { name: 'Item two', value: 'item-two' },
          { name: 'Item three', value: 'item-three' },
        ]}
      />,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('handleSetNativeInput', () => {
  it('should set the value of an input', () => {
    const id = 'some-id'
    const selectedOptionValues = ['some-value']
    const input = document.createElement('input')
    const testFunc = vi.fn()

    input.id = id
    document.body.appendChild(input)

    const curried = handleSetNativeInput(id, selectedOptionValues, testFunc)

    curried()

    expect(testFunc).toHaveBeenCalledWith(selectedOptionValues)
  })
})

describe('handleResetDefaultValues', () => {
  it('should allow the resetting of default values if they do not match', () => {
    const setSelectedOptionValues = vi.fn()
    const setSelectedDefaultValues = vi.fn()
    const defaultValues = ['someValue', 'someValue']
    const selectedDefaultValues = ['someValue', 'someOtherValue']

    const curried = handleResetDefaultValues(
      setSelectedOptionValues,
      setSelectedDefaultValues,
      defaultValues,
      selectedDefaultValues,
    )

    curried()

    expect(setSelectedOptionValues).toHaveBeenCalledWith(defaultValues)
    expect(setSelectedDefaultValues).toHaveBeenCalledWith(defaultValues)
  })

  it('should not allow the resetting of default values if they match', () => {
    const setSelectedOptionValues = vi.fn()
    const setSelectedDefaultValues = vi.fn()
    const defaultValues = ['someValue', 'someValue']
    const selectedDefaultValues = ['someValue', 'someValue']

    const curried = handleResetDefaultValues(
      setSelectedOptionValues,
      setSelectedDefaultValues,
      defaultValues,
      selectedDefaultValues,
    )

    curried()

    expect(setSelectedOptionValues).not.toHaveBeenCalled()
    expect(setSelectedDefaultValues).not.toHaveBeenCalled()
  })
})

describe('handleSelectedOptions', () => {
  it('should deselect an option', () => {
    const value = 'some-value'
    const selectedOptionValues = ['some-value']
    const setSelectedOptionValues = vi.fn()
    const event = {
      target: {
        checked: false,
      },
    } as ChangeEvent<HTMLInputElement>
    const curried = handleSelectedOptions(value, selectedOptionValues, setSelectedOptionValues)

    curried(event)

    expect(setSelectedOptionValues).toHaveBeenCalledWith([])
  })

  it('should select an option', () => {
    const value = 'some-value'
    const selectedOptionValues = []
    const setSelectedOptionValues = vi.fn()
    const event = {
      target: {
        checked: true,
      },
    } as ChangeEvent<HTMLInputElement>
    const curried = handleSelectedOptions(value, selectedOptionValues, setSelectedOptionValues)

    curried(event)

    expect(setSelectedOptionValues).toHaveBeenCalledWith(['some-value'])
  })
})

describe('handleSelectedKeoardOptions', () => {
  it('should deselect an option', () => {
    const value = 'some-value'
    const selectedOptionValues = ['some-value']
    const setSelectedOptionValues = vi.fn()
    const isChecked = true

    const curried = handleSelectedKeyboardOptions(value, selectedOptionValues, setSelectedOptionValues, isChecked)

    curried()

    expect(setSelectedOptionValues).toHaveBeenCalledWith([])
  })

  it('should select an option', () => {
    const value = 'some-value'
    const selectedOptionValues = []
    const setSelectedOptionValues = vi.fn()
    const isChecked = false

    const curried = handleSelectedKeyboardOptions(value, selectedOptionValues, setSelectedOptionValues, isChecked)

    curried()

    expect(setSelectedOptionValues).toHaveBeenCalledWith(['some-value'])
  })
})
