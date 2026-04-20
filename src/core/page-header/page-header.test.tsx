import { PageHeader } from '../page-header'
import { render } from '@testing-library/react'

test('opts out of MainContainer block padding', () => {
  const { container } = render(<PageHeader size="wide" title="Title" />)
  const content = container.querySelector('[data-has-no-top-padding]')
  expect(content).toHaveAttribute('data-has-no-top-padding', 'true')
  expect(content).toHaveAttribute('data-has-no-bottom-padding', 'true')
})
