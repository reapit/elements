import { render } from '@testing-library/react'
import { ButtonGroup } from '../button-group'
import { Button } from '@/components/button/button'

describe('ButtonGroup', () => {
  it('should match a snapshot for default Button Group', () => {
    expect(
      render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
          <Button>Button 5</Button>
        </ButtonGroup>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for Button Group with Primary button', () => {
    expect(
      render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
          {/* -- Dev -- to replace intent with replaced prop variant while updating Button Component */}
          <Button intent="primary">Button 5</Button>
        </ButtonGroup>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for Button Group with 1 Icon only button', () => {
    expect(
      render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
          <Button
            buttonIcon={{
              icon: 'more',
              position: 'only',
            }}
          ></Button>
        </ButtonGroup>,
      ),
    ).toMatchSnapshot()
  })
})
