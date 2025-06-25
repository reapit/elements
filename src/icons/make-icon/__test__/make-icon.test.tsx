import { elIcon } from '../styles'
import { makeIcon } from '../make-icon'
import { render, screen } from '@testing-library/react'

import type { SVGProps } from 'react'

function FakeSvg(props: SVGProps<SVGSVGElement>) {
  return <svg data-testid="mock-svg" {...props} />
}

test('icon renders an svg with default colour and size', () => {
  const Icon = makeIcon('FakeIcon', FakeSvg)
  render(<Icon />)

  const svg = screen.getByTestId('mock-svg')
  expect(svg).toBeVisible()
  expect(svg.tagName).toBe('svg')
  expect(svg).toHaveAttribute('data-colour', 'inherit')
  expect(svg).toHaveAttribute('data-size', '100%')
})

test('icon has correct displayName', () => {
  const Icon = makeIcon('FakeIcon', FakeSvg)
  expect(Icon.displayName).toBe('FakeIcon')
})

test('icon accepts colour prop', () => {
  const Icon = makeIcon('FakeIcon', FakeSvg)
  render(<Icon colour="primary" />)

  const svg = screen.getByTestId('mock-svg')
  expect(svg).toHaveAttribute('data-colour', 'primary')
})

test('icon accepts size prop', () => {
  const Icon = makeIcon('FakeIcon', FakeSvg)
  render(<Icon size="sm" />)

  const svg = screen.getByTestId('mock-svg')
  expect(svg).toHaveAttribute('data-size', 'sm')
})

test('icon can accept a custom className', () => {
  const Icon = makeIcon('FakeIcon', FakeSvg)
  render(<Icon className="custom-class" />)

  const svg = screen.getByTestId('mock-svg')
  expect(svg).toHaveClass(`${elIcon} custom-class`)
})

test('icon forwards additional props to the svg element', () => {
  const Icon = makeIcon('FakeIcon', FakeSvg)
  render(<Icon data-testid="alt-id" width="24" height="24" fill="red" />)

  expect(screen.getByTestId('alt-id')).toBeVisible()
})
