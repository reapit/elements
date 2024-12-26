import { render } from '@testing-library/react'
import { Features } from '../features'

describe('Features', () => {
  it('should render the component', () => {
    expect(
      render(
        <Features>
          <Features.Item icon={<span>icon</span>} aria-label="Bathroom">
            1
          </Features.Item>
          <Features.Item icon={<span>icon</span>} aria-label="Bedroom">
            2
          </Features.Item>
        </Features>,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
