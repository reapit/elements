import preview from '#.storybook/preview'
import { Accordion } from '#src/core/accordion'
import { AccordionGroup } from '#src/core/accordion-group'
import { AddIcon } from '#src/icons/add'
import { AnchorButton } from '#src/core/button'
import { Badge } from '#src/core/badge'
import { Breadcrumbs } from '#src/core/breadcrumbs'
import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { Card } from '#src/core/card'
import { DescriptionList } from '#src/core/description-list'
import { Divider } from '#src/core/divider'
import { Features } from '#src/core/features'
import { Flex } from '#src/utils/flex'
import { Grid } from '#src/utils/grid'
import { Heading } from '#src/utils/heading'
import { Image } from '#src/utils/image'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'
import { LineClamp } from '#src/utils/line-clamp'
import { MainContainer } from '#src/core/main-container'
import { Menu } from '#src/core/menu'
import { MoreIcon } from '#src/icons/more'
import { OfficeSwitcher } from '#src/core/office-switcher'
import { PageHeader } from '#src/core/page-header'
import { PageLayout } from '#src/core/page-layout'
import { PrimaryTabs } from '#src/core/primary-tabs'
import { SupplementaryInfo } from '#src/core/supplementary-info'
import { Text } from '#src/utils/text'
import { TopBar } from '#src/core/top-bar'
import { useMatchMedia } from '#src/utils/match-media'
import { ChevronDownIcon } from '#src/icons/chevron-down'

const meta = preview.meta({
  title: 'Blocks/PropertyDetail',
  parameters: {
    layout: 'fullscreen',
  },
})

/**
 * A full-page detail view for a single property record.
 *
 * Demonstrates the standard composition for detail pages: page layout with top bar and office
 * switcher, a page header with breadcrumbs, status badge, property features and page-level
 * actions, primary tabs for section navigation, and an asymmetric two-column layout with
 * borderless description list sections, an image gallery, notes, and a people sidebar.
 */
export const Example = meta.story({
  render: () => {
    const isWidthAtOrAboveSM = useMatchMedia(isWidthAtOrAbove('SM'))
    const isWidthAtOrAboveMD = useMatchMedia(isWidthAtOrAbove('MD'))

    return (
      <PageLayout backgroundColour="--colour-fill-white" id="property-detail" scroll="body">
        <PageLayout.TopBarRegion>
          <TopBar
            avatar={
              <TopBar.AvatarMenu initials="JW">
                <Menu.Item>Profile</Menu.Item>
                <Menu.Item>Settings</Menu.Item>
                <Menu.Item>Sign out</Menu.Item>
              </TopBar.AvatarMenu>
            }
            logo={<TopBar.BrandLogo appName="Reapit Sales" href="#" />}
            mainNav={
              <TopBar.MainNav>
                <TopBar.NavItem aria-current="page" href="#">
                  Properties
                </TopBar.NavItem>
                <TopBar.NavItem aria-current={false} href="#">
                  Contacts
                </TopBar.NavItem>
                <TopBar.NavItem aria-current={false} href="#">
                  Applicants
                </TopBar.NavItem>
                <TopBar.NavItem aria-current={false} href="#">
                  Diary
                </TopBar.NavItem>
              </TopBar.MainNav>
            }
            menu={
              <TopBar.Menu>
                <TopBar.MenuList>
                  <TopBar.MenuMainNav>
                    <TopBar.MenuItem aria-current="page" href="#">
                      Properties
                    </TopBar.MenuItem>
                    <TopBar.MenuItem aria-current={false} href="#">
                      Contacts
                    </TopBar.MenuItem>
                    <TopBar.MenuItem aria-current={false} href="#">
                      Applicants
                    </TopBar.MenuItem>
                    <TopBar.MenuItem aria-current={false} href="#">
                      Diary
                    </TopBar.MenuItem>
                  </TopBar.MenuMainNav>
                  <TopBar.MenuProfileNav>
                    <TopBar.MenuItem aria-current={false} href="#">
                      Profile
                    </TopBar.MenuItem>
                    <TopBar.MenuItem aria-current={false} href="#">
                      Settings
                    </TopBar.MenuItem>
                    <TopBar.MenuItem aria-current={false} href="#">
                      Sign out
                    </TopBar.MenuItem>
                  </TopBar.MenuProfileNav>
                </TopBar.MenuList>
              </TopBar.Menu>
            }
            search={
              <TopBar.NavSearch
                button={<TopBar.NavSearchButton onClick={() => {}} />}
                iconItem={<TopBar.NavSearchIconItem aria-label="Search" onClick={() => {}} />}
              />
            }
          />
          <OfficeSwitcher>
            <OfficeSwitcher.Select>
              <OfficeSwitcher.Button />
              <OfficeSwitcher.Popup>
                <OfficeSwitcher.Listbox defaultValue="cheltenham">
                  <OfficeSwitcher.Option value="cheltenham">Cheltenham Central</OfficeSwitcher.Option>
                  <OfficeSwitcher.Option value="gloucester">Gloucester East</OfficeSwitcher.Option>
                  <OfficeSwitcher.Option value="bristol">Bristol South</OfficeSwitcher.Option>
                </OfficeSwitcher.Listbox>
              </OfficeSwitcher.Popup>
            </OfficeSwitcher.Select>
          </OfficeSwitcher>
        </PageLayout.TopBarRegion>

        <PageLayout.BodyRegion>
          <PageHeader
            backgroundColour="--colour-fill-neutral-lightest"
            navigation={
              <Breadcrumbs overflow="truncate">
                <Breadcrumbs.Item>
                  <Breadcrumbs.Link href="#">Properties</Breadcrumbs.Link>
                </Breadcrumbs.Item>
              </Breadcrumbs>
            }
            size="wide"
            supplementaryInfo={
              <PageHeader.SupplementaryInfo>
                <SupplementaryInfo size="sm">
                  <SupplementaryInfo.Item>House</SupplementaryInfo.Item>
                </SupplementaryInfo>
                <Features size="sm">
                  <Features.Bedrooms value={3} />
                  <Features.Bathrooms value={2} />
                  <Features.CarSpaces value={2} />
                </Features>
                <Badge colour="inactive" variant="reversed">
                  Market appraisal
                </Badge>
              </PageHeader.SupplementaryInfo>
            }
            title={
              <PageHeader.Title
                actions={
                  <ButtonGroup>
                    <Button iconLeft={<AddIcon />} size="medium" variant="secondary">
                      Add New
                    </Button>
                    <Button aria-label="More actions" iconLeft={<MoreIcon />} size="medium" variant="secondary" />
                  </ButtonGroup>
                }
              >
                10 High Street, Great Horwood, Buckinghamshire, MK17 0QL
              </PageHeader.Title>
            }
          />

          <MainContainer hasNoBottomPadding size="wide">
            <PrimaryTabs overflow="scroll">
              <PrimaryTabs.Item aria-current="page" href="#">
                Overview
              </PrimaryTabs.Item>
              <PrimaryTabs.Item aria-current={false} href="#">
                Activity
              </PrimaryTabs.Item>
              <PrimaryTabs.Item aria-current={false} href="#">
                Journal
              </PrimaryTabs.Item>
            </PrimaryTabs>
          </MainContainer>

          <MainContainer size="wide" template={isWidthAtOrAboveMD ? 'two-columns-asymmetrical-start' : 'single-column'}>
            {/* Main column */}
            <Flex direction="column" gap="--spacing-6" style={{ marginBottom: 'var(--spacing-12)' }}>
              {/* Property Features */}
              <Flex direction="column" gap="--spacing-4">
                <Flex alignItems="center" justifyContent="space-between">
                  <Heading font="text-lg/bold">Property Features</Heading>
                  <Button hasNoPadding size="small" useLinkStyle variant="tertiary">
                    Edit
                  </Button>
                </Flex>
                <DescriptionList
                  grid={isWidthAtOrAboveSM ? 'auto-flow / 1fr 1fr 1fr' : 'auto-flow / 1fr'}
                  layout="stacked"
                >
                  <DescriptionList.Item label="Property style">Property style</DescriptionList.Item>
                  <DescriptionList.Item label="Locality">Town/City</DescriptionList.Item>
                  <DescriptionList.Item label="Tenure">Freehold</DescriptionList.Item>
                  {isWidthAtOrAboveSM && (
                    <>
                      <DescriptionList.Item label="Age">Modern</DescriptionList.Item>
                      <DescriptionList.Item label="Decoration">Good</DescriptionList.Item>
                      <DescriptionList.Item label="Situation">Garden, Patio, Conservatory</DescriptionList.Item>
                      <DescriptionList.Item label="Parking">Off street parking, Double garage</DescriptionList.Item>
                      <DescriptionList.Item label="Special features">
                        Secondary accom, Swimming pool, Tennis court, Annexe
                      </DescriptionList.Item>
                      <DescriptionList.Item label="Keywords">
                        Sables, Bus links, Coastal, Train station
                      </DescriptionList.Item>
                      <DescriptionList.Item label="Internal area measurements">100–130 sqm</DescriptionList.Item>
                      <DescriptionList.Item label="External area">1.5 acres</DescriptionList.Item>
                      <DescriptionList.Item label="EPC Rating">72 (C)</DescriptionList.Item>
                      <DescriptionList.Item label="Potential EPC Rating">80 (C)</DescriptionList.Item>
                      <DescriptionList.Item label="Council Tax band">E</DescriptionList.Item>
                      <DescriptionList.Item label="Keys">38, 39</DescriptionList.Item>
                      <DescriptionList.Item
                        area={isWidthAtOrAboveSM ? 'auto / span 3' : undefined}
                        label="Viewing notes"
                      >
                        Contact landlord two days in advance to arrange viewing
                      </DescriptionList.Item>
                    </>
                  )}
                  {!isWidthAtOrAboveSM && (
                    <Button iconRight={<ChevronDownIcon />} onClick={() => {}} variant="secondary">
                      Show all
                    </Button>
                  )}
                </DescriptionList>
              </Flex>

              <Divider />

              {/* Market Appraisal */}
              <Flex direction="column" gap="--spacing-4">
                <Flex alignItems="center" justifyContent="space-between">
                  <Heading font="text-base/bold">Market Appraisal</Heading>
                  <Button hasNoPadding size="small" useLinkStyle variant="tertiary">
                    Edit
                  </Button>
                </Flex>
                <DescriptionList
                  grid={isWidthAtOrAboveSM ? 'auto-flow / 1fr 1fr 1fr' : 'auto-flow / 1fr'}
                  layout="stacked"
                >
                  <DescriptionList.Item label="Selling price">£500,000</DescriptionList.Item>
                  <DescriptionList.Item label="Qualifier">Guide price</DescriptionList.Item>
                  <DescriptionList.Item label="Recommended price">£480,000</DescriptionList.Item>
                  <DescriptionList.Item label="MA date">12 Dec 2025</DescriptionList.Item>
                  <DescriptionList.Item label="Selling agency">Sole agent</DescriptionList.Item>
                  <DescriptionList.Item label="Disposal">Private Treaty</DescriptionList.Item>
                  <DescriptionList.Item label="Commission">£15,000</DescriptionList.Item>
                </DescriptionList>
              </Flex>

              <Divider />

              {/* Description */}
              <Flex direction="column" gap="--spacing-4">
                <Flex alignItems="center" justifyContent="space-between">
                  <Heading font="text-base/bold">Description</Heading>
                  <Button hasNoPadding size="small" useLinkStyle variant="tertiary">
                    Edit
                  </Button>
                </Flex>
                <DescriptionList layout="stacked">
                  <DescriptionList.Item label="Strapline">A beautiful cottage house</DescriptionList.Item>
                  <DescriptionList.Item label="Description">
                    <LineClamp clampTo={3}>
                      This exceptional four-bedroom house, situated in the desirable MK17 0QL area, presents an
                      attractive opportunity for a discerning buyer seeking a comfortable and spacious home. With its
                      impressive layout, the property boasts four well-appointed bedrooms, ideal for families or
                      professionals, and two modern bathrooms, ensuring ample storage and convenience.
                    </LineClamp>
                  </DescriptionList.Item>
                </DescriptionList>
              </Flex>

              <Divider />

              {/* Room details */}
              <Flex direction="column" gap="--spacing-4">
                <Flex alignItems="center" justifyContent="space-between">
                  <Heading font="text-base/bold">Room Details</Heading>
                  <Button hasNoPadding size="small" useLinkStyle variant="tertiary">
                    Edit
                  </Button>
                </Flex>
                <DescriptionList layout="stacked">
                  <DescriptionList.Item label="Accommodation summary">
                    <ul style={{ paddingInlineStart: '20px' }}>
                      <li>Grade II listed 18th century house</li>
                      <li>Four double bedrooms</li>
                      <li>Ensuite shower room</li>
                      <li>Two reception rooms</li>
                      <li>Conservatory</li>
                      <li>Village location</li>
                      <li>Integral garage</li>
                      <li>Character features</li>
                    </ul>
                  </DescriptionList.Item>
                </DescriptionList>
                <AccordionGroup>
                  <Accordion summary={<Accordion.Summary>Living Room</Accordion.Summary>}>
                    <DescriptionList layout="stacked">
                      <DescriptionList.Item label="Dimensions">5.0m x 4.0m</DescriptionList.Item>
                      <DescriptionList.Item label="Flooring">Hardwood</DescriptionList.Item>
                      <DescriptionList.Item label="Features">Fireplace, Bay window</DescriptionList.Item>
                    </DescriptionList>
                  </Accordion>
                  <Accordion summary={<Accordion.Summary>Lounge</Accordion.Summary>}>
                    <DescriptionList layout="stacked">
                      <DescriptionList.Item label="Dimensions">4.5m x 3.5m</DescriptionList.Item>
                      <DescriptionList.Item label="Flooring">Carpet</DescriptionList.Item>
                      <DescriptionList.Item label="Features">Built-in shelving, French doors</DescriptionList.Item>
                    </DescriptionList>
                  </Accordion>
                  <Accordion summary={<Accordion.Summary>Bathroom</Accordion.Summary>}>
                    <DescriptionList layout="stacked">
                      <DescriptionList.Item label="Dimensions">2.5m x 2.0m</DescriptionList.Item>
                      <DescriptionList.Item label="Flooring">Tile</DescriptionList.Item>
                      <DescriptionList.Item label="Features">Shower, Bathtub, Vanity unit</DescriptionList.Item>
                    </DescriptionList>
                  </Accordion>
                  <Accordion summary={<Accordion.Summary>Kitchen</Accordion.Summary>}>
                    <DescriptionList layout="stacked">
                      <DescriptionList.Item label="Dimensions">4.0m x 3.5m</DescriptionList.Item>
                      <DescriptionList.Item label="Flooring">Tile</DescriptionList.Item>
                      <DescriptionList.Item label="Features">Island, Modern appliances</DescriptionList.Item>
                    </DescriptionList>
                  </Accordion>
                </AccordionGroup>
              </Flex>
            </Flex>

            {/* Secondary column */}
            <Flex direction="column" gap="--spacing-6">
              {/* Images */}
              <Flex direction="column" gap="--spacing-4">
                <Flex alignItems="center" justifyContent="space-between">
                  <Heading font="text-base/bold">Images</Heading>
                  <Button hasNoPadding size="small" useLinkStyle variant="tertiary">
                    Edit
                  </Button>
                </Flex>
                <Grid templateAreas='"feature feature feature" "two three more"' gap="--spacing-2">
                  <Grid.Item area="feature">
                    <Image
                      alt="Front view of 10 High Street, Great Horwood"
                      height="auto"
                      width="100%"
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop"
                      style={{
                        borderRadius: 'var(--border-radius-l)',
                      }}
                    />
                  </Grid.Item>
                  <Grid.Item area="two">
                    <Image
                      alt="Living room"
                      height="auto"
                      width="100%"
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=150&fit=crop"
                      style={{
                        borderRadius: 'var(--border-radius-l)',
                      }}
                    />
                  </Grid.Item>
                  <Grid.Item area="three">
                    <Image
                      alt="Kitchen"
                      height="auto"
                      width="100%"
                      src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop"
                      style={{
                        borderRadius: 'var(--border-radius-l)',
                      }}
                    />
                  </Grid.Item>
                  <Grid.Item area="more" style={{ position: 'relative' }}>
                    <img
                      alt="Bedroom"
                      src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=200&h=150&fit=crop"
                      style={{
                        display: 'block',
                        width: '100%',
                        aspectRatio: '4/3',
                        objectFit: 'cover',
                        borderRadius: 'var(--border-radius-l)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.45)',
                        borderRadius: 'var(--border-radius-l)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text as="span" font="text-sm/bold" style={{ color: 'var(--colour-fill-white)' }}>
                        +1
                      </Text>
                    </div>
                  </Grid.Item>
                </Grid>
              </Flex>

              <Divider />

              {/* Notes */}
              <Flex direction="column" gap="--spacing-4">
                <Flex alignItems="center" justifyContent="space-between">
                  <Heading font="text-base/bold">Notes</Heading>
                  <Button size="small" variant="secondary">
                    Edit
                  </Button>
                </Flex>
                <Text as="p" font="text-sm/regular">
                  <LineClamp clampTo={3}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip.
                  </LineClamp>
                </Text>
              </Flex>

              <Divider />

              {/* People */}
              <Flex direction="column" gap="--spacing-4">
                <Heading font="text-base/bold">People</Heading>
                <Card padding="--spacing-4">
                  <Badge colour="inactive">Negotiator</Badge>
                  <Text as="p" font="text-sm/bold" style={{ margin: 'var(--spacing-2) 0 var(--spacing-1)' }}>
                    <AnchorButton href="#" hasNoPadding useLinkStyle variant="tertiary">
                      Robin Williams
                    </AnchorButton>
                  </Text>
                  <Text as="p" colour="secondary" font="text-sm/regular" style={{ margin: '0 0 var(--spacing-1)' }}>
                    0489 998 987
                  </Text>
                  <Text as="p" colour="secondary" font="text-sm/regular">
                    robin.williams@realestatecompany.co.uk
                  </Text>
                </Card>
                <Card padding="--spacing-4">
                  <Badge colour="inactive">Vendor</Badge>
                  <Text as="p" font="text-sm/bold" style={{ margin: 'var(--spacing-2) 0 var(--spacing-1)' }}>
                    <AnchorButton href="#" hasNoPadding useLinkStyle variant="tertiary">
                      Helen White
                    </AnchorButton>
                  </Text>
                  <Text as="p" colour="secondary" font="text-sm/regular" style={{ margin: '0 0 var(--spacing-1)' }}>
                    0496 698 005
                  </Text>
                  <Text as="p" colour="secondary" font="text-sm/regular">
                    Contact info 2
                  </Text>
                </Card>
                <Card padding="--spacing-4">
                  <Badge colour="inactive">Vendor</Badge>
                  <Text as="p" font="text-sm/bold" style={{ margin: 'var(--spacing-2) 0 var(--spacing-1)' }}>
                    <AnchorButton href="#" hasNoPadding useLinkStyle variant="tertiary">
                      Eddie White
                    </AnchorButton>
                  </Text>
                  <Text as="p" colour="secondary" font="text-sm/regular">
                    helen.white76@gmail.com
                  </Text>
                </Card>
              </Flex>
            </Flex>
          </MainContainer>
        </PageLayout.BodyRegion>
      </PageLayout>
    )
  },
})
