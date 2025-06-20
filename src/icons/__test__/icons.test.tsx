import { render } from '@testing-library/react'
import * as icons from '../index'

const allIcons = Object.entries(icons).map(([iconName, IconComponent]) => ({
  iconName,
  IconComponent,
}))

test.each(allIcons)('$iconName renders the correct SVG', ({ IconComponent }) => {
  const { asFragment } = render(<IconComponent />)
  expect(asFragment()).toMatchSnapshot()
})
