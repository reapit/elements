import { render } from '@testing-library/react'
import { Badge } from '..'
import { Icon } from '#src/components/icon'

describe('Badge', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<Badge>Label</Badge>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with reversed badge', () => {
    const { asFragment } = render(<Badge isReversed>Label</Badge>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with success variant and label', () => {
    const { asFragment } = render(<Badge variant="success">Label</Badge>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with icons and label', () => {
    const { asFragment } = render(
      <Badge iconLeft={<Icon icon="add" fontSize="1rem" />} iconRight={<Icon icon="chevronDown" fontSize="1rem" />}>
        Label
      </Badge>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with icon only', () => {
    const { asFragment } = render(<Badge iconLeft={<Icon icon="add" fontSize="1rem" />} aria-label="label"></Badge>)
    expect(asFragment()).toMatchSnapshot()
  })
})
