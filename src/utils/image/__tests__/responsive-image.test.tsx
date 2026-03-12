import { render, screen } from '@testing-library/react'
import { ResponsiveImage } from '../responsive-image'

test('renders an img element', () => {
  render(<ResponsiveImage alt="A test image" src="https://picsum.photos/200/300" />)
  expect(screen.getByRole('img')).toBeVisible()
})

test('defaults data-object-fit to "contain"', () => {
  render(<ResponsiveImage alt="A test image" src="https://picsum.photos/200/300" />)
  expect(screen.getByRole('img')).toHaveAttribute('data-object-fit', 'contain')
})

test.each(['contain', 'cover', 'fill', 'none', 'scale-down'] as const)(
  'sets data-object-fit to "%s" when objectFit is "%s"',
  (objectFit) => {
    render(<ResponsiveImage alt="A test image" src="https://picsum.photos/200/300" objectFit={objectFit} />)
    expect(screen.getByRole('img')).toHaveAttribute('data-object-fit', objectFit)
  },
)

test('forwards the src attribute', () => {
  render(<ResponsiveImage alt="A test image" src="https://picsum.photos/seed/test/200/300" />)
  expect(screen.getByRole('img')).toHaveAttribute('src', 'https://picsum.photos/seed/test/200/300')
})

test('forwards the alt attribute', () => {
  render(<ResponsiveImage alt="A descriptive caption" src="https://picsum.photos/200/300" />)
  expect(screen.getByRole('img', { name: 'A descriptive caption' })).toBeVisible()
})

test('forwards srcSet and sizes attributes', () => {
  render(
    <ResponsiveImage
      alt="A test image"
      sizes="(min-width: 1024px) 50vw, 100vw"
      src="https://picsum.photos/400/300"
      srcSet="https://picsum.photos/400/300 1x, https://picsum.photos/800/600 2x"
    />,
  )

  const image = screen.getByRole('img')
  expect(image).toHaveAttribute('srcset', 'https://picsum.photos/400/300 1x, https://picsum.photos/800/600 2x')
  expect(image).toHaveAttribute('sizes', '(min-width: 1024px) 50vw, 100vw')
})

test('forwards additional HTML attributes', () => {
  render(
    <ResponsiveImage
      alt="A test image"
      src="https://picsum.photos/200/300"
      data-testid="my-image"
      width={200}
      height={300}
      loading="lazy"
    />,
  )
  const image = screen.getByTestId('my-image')

  expect(image).toHaveAttribute('width', '200')
  expect(image).toHaveAttribute('height', '300')
  expect(image).toHaveAttribute('loading', 'lazy')
})

test('merges a custom className with the base class', () => {
  render(<ResponsiveImage alt="A test image" src="https://picsum.photos/200/300" className="custom-class" />)
  expect(screen.getByRole('img').className).toContain('custom-class')
})
