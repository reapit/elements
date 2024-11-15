import { render } from '@testing-library/react'
import { AvatarRectangle } from '..'

describe('AvatarRectangle', () => {
  it('renders correctly with residential variant and medium size', () => {
    const { asFragment } = render(
      <AvatarRectangle variant="residential" size="medium" src="test-image.jpg" alt="Test Image" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with residential variant and small size without src', () => {
    const { asFragment } = render(<AvatarRectangle variant="residential" size="small" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with commercial variant and small size', () => {
    const { asFragment } = render(
      <AvatarRectangle variant="commercial" size="small" src="test-image.jpg" alt="Test Image" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with commercial variant and medium size without src', () => {
    const { asFragment } = render(<AvatarRectangle variant="commercial" size="medium" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when image fails to load', () => {
    const { asFragment } = render(
      <AvatarRectangle variant="commercial" size="medium" src="invalid-image.jpg" alt="Test Image" />,
    )
    // Simulate image error
    const img = document.querySelector('img')
    if (img) {
      img.dispatchEvent(new Event('error'))
    }
    expect(asFragment()).toMatchSnapshot()
  })
})
