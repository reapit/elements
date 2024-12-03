import { render } from '@testing-library/react'
import { Skeleton } from '../index'

describe('Skeleton', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<Skeleton />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with height, width and borderRadius', () => {
    const { asFragment } = render(<Skeleton width="3rem" height="3rem" borderRadius="100%" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
