import { MultiSelect, MultiSelectChip, MultiSelectInput, elHasGreyChips } from './index'

export default {
  title: 'Deprecated/MultiSelect',
  component: MultiSelect,
}

export const BasicExample = {
  render: ({}) => (
    <MultiSelect>
      <MultiSelectChip id="item-1">Item One</MultiSelectChip>
      <MultiSelectChip id="item-2">Item Two</MultiSelectChip>
      <MultiSelectChip id="item-3">Item Three</MultiSelectChip>
      <MultiSelectChip id="item-4">Item Four</MultiSelectChip>
      <MultiSelectChip id="item-5">Item Five</MultiSelectChip>
      <MultiSelectChip id="item-6">Item Six</MultiSelectChip>
    </MultiSelect>
  ),
}

export const GreyChips = {
  render: ({}) => (
    <MultiSelect>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-1">
        Item One
      </MultiSelectChip>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-2">
        Item Two
      </MultiSelectChip>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-3">
        Item Three
      </MultiSelectChip>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-4">
        Item Four
      </MultiSelectChip>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-5">
        Item Five
      </MultiSelectChip>
      <MultiSelectChip className={elHasGreyChips} id="item-grey-6">
        Item Six
      </MultiSelectChip>
    </MultiSelect>
  ),
}

export const ReactExample = {
  render: ({}) => (
    <MultiSelectInput
      id="react-example"
      options={[
        {
          name: 'Item one',
          value: 'item-one',
        },
        {
          name: 'Item two',
          value: 'item-two',
        },
        {
          name: 'Item three',
          value: 'item-three',
        },
      ]}
      defaultValues={['item-one']}
    />
  ),
}
