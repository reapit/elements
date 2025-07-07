import { useState } from 'react'
import { MainContainer, PageContainer, SecondaryNavContainer, FlexContainer } from '../index'
import { GridDemoBlock } from '../storybook/demo-block'
import { NavStateProvider } from '../hooks/use-nav-state'
import { MediaStateProvider } from '../hooks/use-media-query'
import { SecondaryNav, SecondaryNavItem } from '../components/secondary-nav'
import { DeprecatedPageHeader } from '../components/deprecated-page-header'
import { DeprecatedNavResponsive as NavResponsive } from '../components/deprecated-nav'
import { Grid, Col, ColSplitThird, ColSplitTwoThirds, GridThirds } from '../components/grid'

export default {
  title: 'Deprecated/Layout Patterns',
}

export const CompleteCombinedExample = {
  render: ({}) => {
    const [selectedItem, setSelectedItem] = useState(1)

    return (
      <NavStateProvider>
        <MediaStateProvider>
          <MainContainer>
            <NavResponsive
              defaultNavIndex={1}
              appSwitcherOptions={[
                {
                  text: 'AppMarket',
                  callback: () => console.log('Navigating'),
                },
                {
                  text: 'DevPortal',
                  callback: () => console.log('Navigating'),
                },
              ]}
              avatarText="JD"
              avatarOptions={[
                {
                  text: 'Settings',
                  callback: () => console.log('Navigating'),
                },
                {
                  text: 'Profile',
                  callback: () => console.log('Navigating'),
                },
                {
                  text: 'Log Out',
                  callback: () => console.log('Navigating'),
                },
              ]}
              options={[
                {
                  itemIndex: 0,
                  callback: () => console.log('Navigating'),
                },
                {
                  itemIndex: 1,
                  callback: () => console.log('Navigating'),
                  text: 'Apps',

                  subItems: [
                    {
                      itemIndex: 0,
                      callback: () => console.log('Navigating'),
                      text: 'App List',
                    },
                    {
                      itemIndex: 1,
                      callback: () => console.log('Navigating'),
                      text: 'Create App',
                    },
                  ],
                },
                {
                  itemIndex: 2,
                  callback: () => console.log('Navigating'),
                  text: 'Analytics',

                  subItems: [
                    {
                      itemIndex: 2,
                      callback: () => console.log('Navigating'),
                      text: 'Hits Per Day',
                    },
                    {
                      itemIndex: 3,
                      callback: () => console.log('Navigating'),
                      text: 'Weekly Hits',
                    },
                  ],
                },
                {
                  itemIndex: 3,
                  href: 'https://marketplace.reapit.cloud',
                  text: 'Marketplace',
                },
              ]}
            />
            <FlexContainer isFlexGrow1>
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
              <PageContainer>
                <DeprecatedPageHeader
                  breadcrumb={{
                    defaultActiveIndex: 3,

                    items: [
                      {
                        text: 'Home',
                        onClick: () => console.log('Home clicked'),
                      },
                      {
                        text: 'Level 1',
                        onClick: () => console.log('1 clicked'),
                      },
                      {
                        text: 'Level 2',
                        onClick: () => console.log('2 clicked'),
                      },
                      {
                        text: 'Level 3',
                        onClick: () => console.log('3 clicked'),
                      },
                    ],
                  }}
                  avatar={{
                    type: 'image',
                    src: 'https://picsum.photos/200/300',
                  }}
                  pageTitle={{
                    children: 'Page Title',
                    hasBoldText: true,
                  }}
                  tags={[
                    {
                      intent: 'primary',
                      children: 'Tag 1',
                    },
                    {
                      intent: 'primary',
                      children: 'Tag 2',
                    },
                  ]}
                  pageSubtitle={{
                    children: 'Page Sub Title',
                    hasBoldText: true,
                  }}
                  pageInfo={[
                    {
                      children: 'Page Info 1',
                    },
                    {
                      children: 'Page Info 2',
                    },
                    {
                      children: 'Page Info 3',
                    },
                  ]}
                  buttons={[
                    {
                      children: 'Button 1',
                    },
                    {
                      children: 'Button 2',
                    },
                  ]}
                  tabs={{
                    name: 'my-cool-tabs-full-width',
                    isFullWidth: true,
                    hasNoBorder: true,

                    options: [
                      {
                        id: 'tab-1-fw',
                        value: 'tab-1-fw',
                        text: 'Tab Content 1',
                        isChecked: true,
                      },
                      {
                        id: 'tab-2-fw',
                        value: 'tab-2-fw',
                        text: 'Tab Content 2',
                        isChecked: false,
                      },
                      {
                        id: 'tab-3-fw',
                        value: 'tab-3-fw',
                        text: 'Tab Content 3',
                        isChecked: false,
                      },
                    ],
                  }}
                />
                <Grid>
                  <Col>
                    <GridDemoBlock />
                  </Col>
                  <Col>
                    <GridDemoBlock />
                  </Col>
                  <Col>
                    <GridDemoBlock />
                  </Col>
                  <Col>
                    <GridDemoBlock />
                  </Col>
                  <Col>
                    <GridDemoBlock />
                  </Col>
                  <Col>
                    <GridDemoBlock />
                  </Col>
                  <Col>
                    <GridDemoBlock />
                  </Col>
                  <Col>
                    <GridDemoBlock />
                  </Col>
                </Grid>
              </PageContainer>
            </FlexContainer>
          </MainContainer>
        </MediaStateProvider>
      </NavStateProvider>
    )
  },
}

export const CompleteCombinedExampleMaxWidth = {
  render: ({}) => {
    return (
      <NavStateProvider>
        <MediaStateProvider>
          <MainContainer hasGreyBackground>
            <NavResponsive
              defaultNavIndex={1}
              appSwitcherOptions={[
                {
                  text: 'AppMarket',
                  callback: () => console.log('Navigating'),
                },
                {
                  text: 'DevPortal',
                  callback: () => console.log('Navigating'),
                },
              ]}
              avatarText="JD"
              avatarOptions={[
                {
                  text: 'Settings',
                  callback: () => console.log('Navigating'),
                },
                {
                  text: 'Profile',
                  callback: () => console.log('Navigating'),
                },
                {
                  text: 'Log Out',
                  callback: () => console.log('Navigating'),
                },
              ]}
              options={[
                {
                  itemIndex: 0,
                  callback: () => console.log('Navigating'),
                },
                {
                  itemIndex: 1,
                  callback: () => console.log('Navigating'),
                  text: 'Apps',

                  subItems: [
                    {
                      itemIndex: 0,
                      callback: () => console.log('Navigating'),
                      text: 'App List',
                    },
                    {
                      itemIndex: 1,
                      callback: () => console.log('Navigating'),
                      text: 'Create App',
                    },
                  ],
                },
                {
                  itemIndex: 2,
                  callback: () => console.log('Navigating'),
                  text: 'Analytics',

                  subItems: [
                    {
                      itemIndex: 2,
                      callback: () => console.log('Navigating'),
                      text: 'Hits Per Day',
                    },
                    {
                      itemIndex: 3,
                      callback: () => console.log('Navigating'),
                      text: 'Weekly Hits',
                    },
                  ],
                },
                {
                  itemIndex: 3,
                  href: 'https://marketplace.reapit.cloud',
                  text: 'Marketplace',
                },
              ]}
            />
            <PageContainer hasGreyBackground>
              <DeprecatedPageHeader
                hasMaxWidth
                breadcrumb={{
                  defaultActiveIndex: 3,

                  items: [
                    {
                      text: 'Home',
                      onClick: () => console.log('Home clicked'),
                    },
                    {
                      text: 'Level 1',
                      onClick: () => console.log('1 clicked'),
                    },
                    {
                      text: 'Level 2',
                      onClick: () => console.log('2 clicked'),
                    },
                    {
                      text: 'Level 3',
                      onClick: () => console.log('3 clicked'),
                    },
                  ],
                }}
                avatar={{
                  type: 'image',
                  src: 'https://picsum.photos/200/300',
                }}
                pageTitle={{
                  children: 'Page Title',
                  hasBoldText: true,
                }}
                tags={[
                  {
                    intent: 'primary',
                    children: 'Tag 1',
                  },
                  {
                    intent: 'primary',
                    children: 'Tag 2',
                  },
                ]}
                pageSubtitle={{
                  children: 'Page Sub Title',
                  hasBoldText: true,
                }}
                pageInfo={[
                  {
                    children: 'Page Info 1',
                  },
                  {
                    children: 'Page Info 2',
                  },
                  {
                    children: 'Page Info 3',
                  },
                ]}
                buttons={[
                  {
                    children: 'Button 1',
                  },
                  {
                    children: 'Button 2',
                  },
                ]}
                tabs={{
                  name: 'my-cool-tabs-max-width',
                  isFullWidth: true,
                  hasNoBorder: true,

                  options: [
                    {
                      id: 'tab-1-mw',
                      value: 'tab-1-mw',
                      text: 'Tab Content 1',
                      isChecked: true,
                    },
                    {
                      id: 'tab-2-mw',
                      value: 'tab-2-mw',
                      text: 'Tab Content 2',
                      isChecked: false,
                    },
                    {
                      id: 'tab-3-mw',
                      value: 'tab-3-mw',
                      text: 'Tab Content 3',
                      isChecked: false,
                    },
                  ],
                }}
              />
              <FlexContainer hasMaxWidth isFlexColumn>
                <GridThirds>
                  <ColSplitThird>
                    <GridDemoBlock />
                  </ColSplitThird>
                  <ColSplitTwoThirds>
                    <GridDemoBlock />
                  </ColSplitTwoThirds>
                </GridThirds>
              </FlexContainer>
            </PageContainer>
          </MainContainer>
        </MediaStateProvider>
      </NavStateProvider>
    )
  },
}
