import { render } from '@testing-library/react'
import { TopBar } from '..'

test('TopBar snapshot', () => {
  const { asFragment } = render(
    <TopBar
      appSwitcher="App switcher"
      avatar="Profile"
      logo="Logo"
      mainNav="Main nav"
      menu="Mobile nav"
      search="Search"
      secondaryNav="Secondary nav"
    />,
  )
  expect(asFragment()).toMatchSnapshot()
})
