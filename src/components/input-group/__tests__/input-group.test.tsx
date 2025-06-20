import { render } from '@testing-library/react'
import { InputGroup } from '..'
import { Input } from '../../input'
import { DeprecatedLabel } from '../../deprecated-label'
import { DeprecatedIcon } from '../../deprecated-icon'

describe('InputGroup component', () => {
  it('should match a snapshot when used in react shorthand mode', () => {
    const wrapper = render(<InputGroup id="myId" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when used in react shorthand mode, with a label', () => {
    const wrapper = render(<InputGroup id="myId" label="Enter your username" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when used in react shorthand mode, with an icon', () => {
    const wrapper = render(<InputGroup id="myId" icon="email" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when used in react shorthand mode, with an icon and a label', () => {
    const wrapper = render(<InputGroup id="myId" icon="email" label="Enter your username" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when used in explicit mode', () => {
    const wrapper = render(
      <InputGroup>
        <Input />
        <DeprecatedIcon icon="email">Please enter an email</DeprecatedIcon>
        <DeprecatedLabel>Please enter a username</DeprecatedLabel>
      </InputGroup>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
