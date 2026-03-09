import { render } from '@testing-library/react'
import { InputGroup } from '..'
import { ElInputGroupLabel } from '../__styles__'
import { Input } from '../../input'
import { EmailIcon } from '#src/icons/email'

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
        <EmailIcon />
        <ElInputGroupLabel>Please enter a username</ElInputGroupLabel>
      </InputGroup>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
