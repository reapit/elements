import { render } from '@testing-library/react'
import { CheckboxGroup } from '..'
import { Checkbox } from '#src/components/checkbox/checkbox'
import { Icon } from '#src/components/icon'

describe('CheckboxGroup', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <CheckboxGroup>
        <CheckboxGroup.Label label="Select options" />
        <Checkbox label="Option 1" name="options" value="option1" />
        <Checkbox label="Option 2" name="options" value="option2" />
        <Checkbox label="Option 3" name="options" value="option3" />
      </CheckboxGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with CheckboxGroup Label UI is required', () => {
    const { asFragment } = render(
      <CheckboxGroup>
        <CheckboxGroup.Label isRequired label="Select options" />
        <Checkbox label="Option 1" name="options" value="option1" />
        <Checkbox label="Option 2" name="options" value="option2" />
        <Checkbox label="Option 3" name="options" value="option3" />
      </CheckboxGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with CheckboxGroup should show suplimentary label in vertical orientation', () => {
    const { asFragment } = render(
      <CheckboxGroup>
        <CheckboxGroup.Label label="Select options" />
        <Checkbox label="Option 1" name="options" value="option1" supplementaryInfo="Supplementary Info" />
        <Checkbox label="Option 2" name="options" value="option2" />
        <Checkbox label="Option 3" name="options" value="option3" />
      </CheckboxGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with CheckboxGroup should not show suplimentary label in horizontal orientation', () => {
    const { asFragment } = render(
      <CheckboxGroup orientation="horizontal">
        <CheckboxGroup.Label label="Select options" />
        <Checkbox label="Option 1" name="options" value="option1" supplementaryInfo="Supplementary Info" />
        <Checkbox label="Option 2" name="options" value="option2" />
        <Checkbox label="Option 3" name="options" value="option3" />
      </CheckboxGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with horizontal CheckboxGroup', () => {
    const { asFragment } = render(
      <CheckboxGroup orientation="horizontal">
        <CheckboxGroup.Label label="Select options" />
        <Checkbox label="Option 1" name="options" value="option1" />
        <Checkbox label="Option 2" name="options" value="option2" />
        <Checkbox label="Option 3" name="options" value="option3" />
      </CheckboxGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
