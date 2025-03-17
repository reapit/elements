import { render } from '@testing-library/react'
import { Breadcrumbs } from '..'

vi.mock('../../icon', () => ({
  Icon: () => <span data-testid="chevron-icon" />,
}))

describe('Breadcrumbs', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Breadcrumbs>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Level one</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
