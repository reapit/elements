import preview from '#.storybook/preview'
import { useState } from 'react'
import { SecondaryNav, SecondaryNavItem } from './index'
import { SecondaryNavContainer } from '../layout'

const meta = preview.meta({
  title: 'Deprecated/SecondaryNav',
  component: SecondaryNav,
})

export const BasicUsage = meta.story({
  render: () => (
    <SecondaryNavContainer>
      <SecondaryNav>
        <SecondaryNavItem>App List</SecondaryNavItem>
        <SecondaryNavItem active>Create App</SecondaryNavItem>
      </SecondaryNav>
    </SecondaryNavContainer>
  ),
})

export const ReactExample = meta.story({
  render: () => {
    const [selectedItem, setSelectedItem] = useState(1)

    return (
      <SecondaryNavContainer>
        <SecondaryNav>
          <SecondaryNavItem active={selectedItem === 1} onClick={() => setSelectedItem(1)}>
            App List
          </SecondaryNavItem>
          <SecondaryNavItem active={selectedItem === 2} onClick={() => setSelectedItem(2)}>
            Create App
          </SecondaryNavItem>
        </SecondaryNav>
      </SecondaryNavContainer>
    )
  },
})
