import { render } from '@testing-library/react'
import { Tag, TagGroup } from '../tag'

describe('Tag', () => {
  it('should render properly and match snapshot', () => {
    const { asFragment } = render(
      <TagGroup>
        <Tag>Tag</Tag>
      </TagGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
