import { render } from '@testing-library/react'
import { type ComponentType } from 'react'
import * as icons from '../docs/all-icons'

const allIcons = Object.entries(icons)
  .filter(([iconName]) => iconName.endsWith('Icon'))
  .map(([iconName, IconComponent]) => ({
    iconName,
    IconComponent: IconComponent as ComponentType,
  }))

test.each(allIcons)('$iconName renders the correct SVG', ({ IconComponent }) => {
  const { asFragment } = render(<IconComponent />)
  expect(asFragment()).toMatchSnapshot()
})
