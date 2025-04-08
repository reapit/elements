import { render } from '@testing-library/react'
import { Features } from '../features'

describe('Features', () => {
  it('should render the component', () => {
    expect(
      render(
        <Features>
          <Features.Item icon={<span>icon</span>} aria-label="Bathrooms">
            1
          </Features.Item>
          <Features.Item icon={<span>icon</span>} aria-label="Bedrooms">
            2
          </Features.Item>
        </Features>,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
