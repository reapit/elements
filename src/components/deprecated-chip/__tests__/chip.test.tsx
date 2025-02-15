import { render } from '@testing-library/react'
import { DeprecatedChip as Chip, DeprecatedChipGroup as ChipGroup } from '..'

describe('Chip component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Chip>Some Content</Chip>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ChipGroup component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <ChipGroup>
        <Chip>Some Content</Chip>
        <Chip>Some Content</Chip>
      </ChipGroup>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
