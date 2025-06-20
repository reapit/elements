import { render } from '@testing-library/react'
import { Badge } from '..'
import { DeprecatedIcon } from '#src/components/deprecated-icon/index'

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
      <Badge
        iconLeft={<DeprecatedIcon icon="add" fontSize="1rem" />}
        iconRight={<DeprecatedIcon icon="chevronDown" fontSize="1rem" />}
      >
        Label
      </Badge>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with icon only', () => {
    const { asFragment } = render(
      <Badge iconLeft={<DeprecatedIcon icon="add" fontSize="1rem" />} aria-label="label"></Badge>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
