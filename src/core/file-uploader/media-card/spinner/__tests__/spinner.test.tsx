import { FileUploaderSpinner } from '../spinner'
import { render } from '@testing-library/react'

test('is hidden from assistive technology', () => {
  const { container } = render(<FileUploaderSpinner />)
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
})

test('renders a track and an indicator circle', () => {
  const { container } = render(<FileUploaderSpinner />)
  expect(container.querySelectorAll('circle')).toHaveLength(2)
})
