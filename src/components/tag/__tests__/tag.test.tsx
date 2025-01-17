import { render } from '@testing-library/react'
import { Tag, TagGroup } from '../tag'

describe('Tag', () => {
  it('should render tag group properly and match snapshot', () => {
    const { asFragment } = render(
      <TagGroup>
        <Tag>Tag</Tag>
      </TagGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should render standalone tag properly and match snapshot', () => {
    const { asFragment } = render(<Tag isStandalone>Tag</Tag>)
    expect(asFragment()).toMatchSnapshot()
  })
})
