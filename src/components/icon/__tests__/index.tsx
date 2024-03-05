import { render } from '@testing-library/react'
import { Icon } from '..'

describe('Icon component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Icon icon="add" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when intent prop is supplied', () => {
    const wrapper = render(<Icon icon="add" intent="primary" />)
    expect(wrapper).toMatchSnapshot()
  })
})
