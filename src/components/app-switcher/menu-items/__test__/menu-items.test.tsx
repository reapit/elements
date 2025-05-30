import { render } from '@testing-library/react'
import { AppMenuGroupHasAccessContext } from '../../menu-group-context'
import AutoResponderMenuItem from '../auto-responder-menu-item'
import KeyWhereMenuItem from '../keyWhere-menu-item'
import ReapitFormsMenuItem from '../reapit-forms-menu-item'
import ReapitLettingMenuItem from '../reapit-letting-menu-item'
import ReapitPMMenuItem from '../reapit-pm-menu-item'
import ReapitProposalsMenuItem from '../reapit-proposal-menu-item'
import ReapitSalesMenuItem from '../reapit-sales-menu-item'
import ReapitWebsitesMenuItem from '../reapit-websites-menu-item'

const testUrl = 'https://www.test.com'
describe('AutoResponderMenuItem', () => {
  test('renders properly when `hasAccess` is true', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={true}>
        <AutoResponderMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders properly when `hasAccess` is false', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={false}>
        <AutoResponderMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('KeyWhereMenuItem', () => {
  test('renders properly when `hasAccess` is true', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={true}>
        <KeyWhereMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders properly when `hasAccess` is false', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={false}>
        <KeyWhereMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('ReapitFormsMenuItem', () => {
  test('renders properly when `hasAccess` is true', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={true}>
        <ReapitFormsMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders properly when `hasAccess` is false', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={false}>
        <ReapitFormsMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('ReapitLettingMenuItem', () => {
  test('renders properly when `hasAccess` is true', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={true}>
        <ReapitLettingMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders properly when `hasAccess` is false', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={false}>
        <ReapitLettingMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('ReapitPMMenuItem', () => {
  test('renders properly when `hasAccess` is true', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={true}>
        <ReapitPMMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders properly when `hasAccess` is false', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={false}>
        <ReapitPMMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('ReapitProposalsMenuItem', () => {
  test('renders properly when `hasAccess` is true', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={true}>
        <ReapitProposalsMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders properly when `hasAccess` is false', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={false}>
        <ReapitProposalsMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('ReapitSalesMenuItem', () => {
  test('renders properly when `hasAccess` is true', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={true}>
        <ReapitSalesMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders properly when `hasAccess` is false', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={false}>
        <ReapitSalesMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('ReapitWebsitesMenuItem', () => {
  test('renders properly when `hasAccess` is true', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={true}>
        <ReapitWebsitesMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders properly when `hasAccess` is false', () => {
    const { asFragment } = render(
      <AppMenuGroupHasAccessContext.Provider value={false}>
        <ReapitWebsitesMenuItem url={testUrl} />
      </AppMenuGroupHasAccessContext.Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('ReapitFormsMenuItem', () => {
  test('renders properly when `hasAccess` is true', () => {
    const { asFragment } = render(<ReapitFormsMenuItem url="" />)
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders properly when a url pass in', () => {
    const { asFragment } = render(<ReapitFormsMenuItem url={testUrl} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
