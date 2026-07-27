import { FileUploaderCircularProgress } from '../circular-progress'
import { render } from '@testing-library/react'

test('is hidden from assistive technology', () => {
  const { container } = render(<FileUploaderCircularProgress value={50} />)
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
})

test('renders a wedge path for a partial value', () => {
  const { container } = render(<FileUploaderCircularProgress value={50} />)
  expect(container.querySelector('path')).toBeInTheDocument()
})

test('renders a full circle instead of a wedge when value is 100', () => {
  const { container } = render(<FileUploaderCircularProgress value={100} />)
  expect(container.querySelector('path')).toBeNull()
  expect(container.querySelectorAll('circle')).toHaveLength(2)
})

test('renders no wedge when value is 0', () => {
  const { container } = render(<FileUploaderCircularProgress value={0} />)
  expect(container.querySelector('path')).toBeNull()
  expect(container.querySelectorAll('circle')).toHaveLength(1)
})

test('clamps values above 100 to a full circle', () => {
  const { container } = render(<FileUploaderCircularProgress value={150} />)
  expect(container.querySelector('path')).toBeNull()
  expect(container.querySelectorAll('circle')).toHaveLength(2)
})

test('clamps values below 0 to no wedge', () => {
  const { container } = render(<FileUploaderCircularProgress value={-10} />)
  expect(container.querySelector('path')).toBeNull()
  expect(container.querySelectorAll('circle')).toHaveLength(1)
})
