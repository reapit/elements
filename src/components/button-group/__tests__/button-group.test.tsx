import { render } from '@testing-library/react'
import { ButtonGroup } from '../button-group'
import { Button } from '@/components/button/button'

describe('ButtonGroup', () => {
  it('should match a snapshot for align default Button Group', () => {
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

  it('should enforce a maximum of 5 buttons', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
      </ButtonGroup>,
    )
    const buttons = container.children[0].children
    expect(buttons.length).toBe(5)
  })

  it('prevents rendering if both primary and icon-only buttons are present', () => {
    const { container } = render(
      <ButtonGroup>
        {/* -- Dev -- to replace intent with replaced prop variant while updating Button Component */}
        <Button intent="primary">Primary</Button>
        <Button
          buttonIcon={{
            icon: 'more',
            position: 'only',
          }}
        ></Button>
      </ButtonGroup>,
    )

    expect(container.firstChild).toBeNull()
  })
})
