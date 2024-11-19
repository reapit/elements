import { render } from '@testing-library/react'
import { ButtonGroup } from '../button-group'
import { Button } from '#src/components/button'

describe('ButtonGroup', () => {
  test('renders its children horizontally with a gap of --spacing-2', () => {
    const { asFragment } = render(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>,
    )
    // NOTE: We do not currently assert the children are laid out horizontally
    // with the correct gap because that behaviour is defined within CSS.
    expect(asFragment()).toMatchSnapshot()
  })
})
