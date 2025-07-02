import { render } from '@testing-library/react'
import { ButtonGroup } from '../button-group'
import { DeprecatedButton } from '#src/components/deprecated-button/index'

describe('ButtonGroup', () => {
  test('renders its children horizontally with a gap of --spacing-2', () => {
    const { asFragment } = render(
      <ButtonGroup>
        <DeprecatedButton>Button 1</DeprecatedButton>
        <DeprecatedButton>Button 2</DeprecatedButton>
        <DeprecatedButton>Button 3</DeprecatedButton>
      </ButtonGroup>,
    )
    // NOTE: We do not currently assert the children are laid out horizontally
    // with the correct gap because that behaviour is defined within CSS.
    expect(asFragment()).toMatchSnapshot()
  })
})
