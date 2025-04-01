import { render } from '@testing-library/react'
import { TableText } from '..'
import { Icon } from '#src/components/icon'

describe('TableText', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<TableText>Value</TableText>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with extra small size and text', () => {
    const { asFragment } = render(<TableText size="extra-small">Value</TableText>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with success variant and text', () => {
    const { asFragment } = render(<TableText variant="success">Value</TableText>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with icons and label', () => {
    const { asFragment } = render(
      <TableText iconLeft={<Icon icon="add" fontSize="1rem" />} iconRight={<Icon icon="chevronDown" fontSize="1rem" />}>
        Value
      </TableText>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with icon only', () => {
    const { asFragment } = render(<TableText iconLeft={<Icon icon="add" fontSize="1rem" />}></TableText>)
    expect(asFragment()).toMatchSnapshot()
  })
})
