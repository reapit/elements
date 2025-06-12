import { AppLogo, supportedAppNames } from '../app-logo'
import { render } from '@testing-library/react'

test.each(supportedAppNames)('returns an svg with an accessible name of %s', (appName) => {
  const { container } = render(<AppLogo appName={appName} />)
  const svg = container.querySelector('svg')
  expect(svg).toHaveAttribute('aria-label', appName)
})
