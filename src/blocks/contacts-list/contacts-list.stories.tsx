import preview from "#.storybook/preview";
import { AtAGlance } from "#src/core/at-a-glance";
import { Avatar } from "#src/core/avatar";
import { Button } from "#src/core/button";
import { CompactSelectNative } from "#src/core/compact-select-native";
import { FilterBar } from "#src/core/filter-bar";
import { MainContainer } from "#src/core/main-container";
import { Menu } from "#src/core/menu";
import { OfficeSwitcher } from "#src/core/office-switcher";
import { PageHeader } from "#src/core/page-header";
import { PageLayout } from "#src/core/page-layout";
import { Pagination } from "#src/core/pagination";
import { SearchInput } from "#src/core/search-input";
import { SplitButton } from "#src/core/split-button";
import { Table } from "#src/core/table";
import { TagGroup } from "#src/core/tag-group";
import { TopBar } from "#src/core/top-bar";
import { isWidthAtOrAbove } from "#src/utils/breakpoints";
import { Flex } from "#src/utils/flex";
import { useMatchMedia } from "#src/utils/match-media";

type ContactClass =
  | "Buyer"
  | "Developer"
  | "Investor"
  | "Landlord"
  | "Prospective Buyer"
  | "Prospective Vendor"
  | "Tenant"
  | "Vendor";

interface Contact {
  id: string;
  initials: string;
  name: string;
  propertyCount: number;
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  contactClasses: ContactClass[];
  lastContactDate: string;
  lastContactType: "E-Newsletter" | "Enquiry";
}

const CONTACTS: Contact[] = [
  {
    id: "CON240001",
    initials: "AA",
    name: "Aaron Abbott",
    propertyCount: 4,
    streetAddress: "42 Darling Street",
    suburb: "Balmain",
    state: "NSW",
    postcode: "2041",
    phone: "0452 123 456",
    email: "abroadbent@acme.com.au",
    contactClasses: ["Buyer", "Landlord", "Investor", "Developer"],
    lastContactDate: "01 Jun 2024",
    lastContactType: "Enquiry",
  },
  {
    id: "CON240002",
    initials: "RE",
    name: "Ralph Edwards",
    propertyCount: 8,
    streetAddress: "15 Norton Street",
    suburb: "Leichhardt",
    state: "NSW",
    postcode: "2040",
    phone: "0405 070 809",
    email: "ralphedw@gmail.com",
    contactClasses: ["Prospective Buyer", "Buyer", "Investor"],
    lastContactDate: "24 May 2023",
    lastContactType: "Enquiry",
  },
  {
    id: "CON240003",
    initials: "RW",
    name: "Ray White Newtown",
    propertyCount: 0,
    streetAddress: "100 King Street",
    suburb: "Newtown",
    state: "NSW",
    postcode: "2042",
    phone: "0452 226 397",
    email: "contact@raywhited.com.au",
    contactClasses: ["Buyer"],
    lastContactDate: "05 Mar 2024",
    lastContactType: "Enquiry",
  },
  {
    id: "CON240004",
    initials: "DL",
    name: "Devon Lane",
    propertyCount: 6,
    streetAddress: "50 Addison Road",
    suburb: "Marrickville",
    state: "NSW",
    postcode: "2204",
    phone: "07 8844 5841",
    email: "dlane@yahoo.com",
    contactClasses: ["Buyer", "Vendor", "Investor"],
    lastContactDate: "17 Apr 2024",
    lastContactType: "E-Newsletter",
  },
  {
    id: "CON240005",
    initials: "AC",
    name: "Arlene McCoy",
    propertyCount: 4,
    streetAddress: "32 Stanmore Road",
    suburb: "Stanmore",
    state: "NSW",
    postcode: "2048",
    phone: "0412 223 669",
    email: "arlene78@google.com",
    contactClasses: ["Prospective Vendor", "Vendor"],
    lastContactDate: "22 Mar 2024",
    lastContactType: "Enquiry",
  },
  {
    id: "CON240006",
    initials: "JW",
    name: "Jenny Wilson",
    propertyCount: 4,
    streetAddress: "77 Ramsay Street",
    suburb: "Haberfield",
    state: "NSW",
    postcode: "2045",
    phone: "0498 887 003",
    email: "jennywilson@cc.com.au",
    contactClasses: ["Buyer", "Tenant", "Landlord"],
    lastContactDate: "17 Apr 2024",
    lastContactType: "Enquiry",
  },
  {
    id: "CON240007",
    initials: "JC",
    name: "Jane Cooper",
    propertyCount: 6,
    streetAddress: "12 Liverpool Road",
    suburb: "Ashfield",
    state: "NSW",
    postcode: "2131",
    phone: "0452 123 456",
    email: "abroadbent@acme.com.au",
    contactClasses: ["Buyer", "Developer"],
    lastContactDate: "15 May 2024",
    lastContactType: "Enquiry",
  },
  {
    id: "CON240008",
    initials: "KW",
    name: "Kristin Watson",
    propertyCount: 7,
    streetAddress: "66 Victoria Road",
    suburb: "Dulwich Hill",
    state: "NSW",
    postcode: "2203",
    phone: "07 8844 5841",
    email: "kristin@watson.com.au",
    contactClasses: ["Vendor", "Investor", "Landlord"],
    lastContactDate: "24 May 2023",
    lastContactType: "E-Newsletter",
  },
];

const meta = preview.meta({
  title: "Blocks/ContactsList",
  parameters: {
    layout: "fullscreen",
  },
});

/**
 * A full-page list view for browsing and managing contacts.
 *
 * Demonstrates the standard composition for list pages: page layout with top bar and office
 * switcher, a page header with a primary action and contact list filter, at-a-glance summary
 * stats, a filter bar with search, and a paginated data table.
 */
export const Example = meta.story({
  render: () => {
    const showContactClasses = useMatchMedia(isWidthAtOrAbove("LG"));
    const showHomeAddress = useMatchMedia(isWidthAtOrAbove("MD"));

    const columns = showContactClasses
      ? "min-content 1.5fr 1.5fr 1.5fr 1.5fr 1fr min-content"
      : showHomeAddress
        ? "min-content 1.5fr 1.5fr 1.5fr 1fr min-content"
        : "min-content 1.5fr 1.5fr 1fr min-content";

    return (
      <PageLayout backgroundColour="--colour-fill-white" id="contacts-list" scroll="body">
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
                <TopBar.NavItem aria-current={false} href="#">
                  Properties
                </TopBar.NavItem>
                <TopBar.NavItem aria-current="page" href="#">
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
                    <TopBar.MenuItem aria-current={false} href="#">
                      Properties
                    </TopBar.MenuItem>
                    <TopBar.MenuItem aria-current="page" href="#">
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
                  <OfficeSwitcher.Option value="cheltenham">
                    Cheltenham Central
                  </OfficeSwitcher.Option>
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
            size="wide"
            supplementaryInfo={
              <PageHeader.SupplementaryInfo>
                <CompactSelectNative aria-label="Select contact list" size="small">
                  <option value="my-contacts">My Contacts</option>
                  <option value="all">All Contacts</option>
                </CompactSelectNative>
              </PageHeader.SupplementaryInfo>
            }
            title={
              <PageHeader.Title
                actions={
                  <SplitButton
                    action={<SplitButton.Action>Add New</SplitButton.Action>}
                    menu={
                      <SplitButton.Menu aria-label="More add options">
                        <Menu.Item>Import</Menu.Item>
                      </SplitButton.Menu>
                    }
                    size="medium"
                    variant="primary"
                  />
                }
              >
                Contacts
              </PageHeader.Title>
            }
          />

          <MainContainer size="wide">
            <Flex direction="column" gap="--spacing-10">
              <AtAGlance>
                <AtAGlance.Carousel columns="200px">
                  <AtAGlance.ButtonCard displayValue={807} label="Buyer" onClick={() => {}} />
                  <AtAGlance.ButtonCard
                    displayValue={4609}
                    label="Prospective Buyer"
                    onClick={() => {}}
                  />
                  <AtAGlance.ButtonCard displayValue={2399} label="Vendor" onClick={() => {}} />
                  <AtAGlance.ButtonCard
                    displayValue={3009}
                    label="Prospective Vendor"
                    onClick={() => {}}
                  />
                  <AtAGlance.ButtonCard displayValue={56} label="The Hot List" onClick={() => {}} />
                </AtAGlance.Carousel>
              </AtAGlance>

              <Flex direction="column" gap="--spacing-6">
                <FilterBar
                  leftContent={
                    <FilterBar.LeftContent>
                      <SearchInput
                        aria-label="Search contacts"
                        maxWidth="400px"
                        placeholder="Search by name, address or reference"
                        size="small"
                      />
                      <Button size="small" variant="secondary">
                        Filters
                      </Button>
                    </FilterBar.LeftContent>
                  }
                />
                <div>
                  <Table.Toolbar leftContent="248 contacts" />
                  <Table as="table" columns={columns}>
                    <Table.Head as="thead">
                      <Table.HeaderRow as="tr">
                        <Table.HeaderCell as="th">
                          <Table.Checkbox aria-label="Select all contacts" name="selectAll" />
                        </Table.HeaderCell>
                        <Table.HeaderCell as="th" justifySelf="start">
                          Name
                        </Table.HeaderCell>
                        {showHomeAddress && (
                          <Table.HeaderCell as="th">Home Address</Table.HeaderCell>
                        )}
                        <Table.HeaderCell as="th">Contact</Table.HeaderCell>
                        {showContactClasses && (
                          <Table.HeaderCell as="th">Contact Class</Table.HeaderCell>
                        )}
                        <Table.HeaderCell as="th">Last Contact</Table.HeaderCell>
                        <Table.HeaderCell aria-label="Actions" as="th" />
                      </Table.HeaderRow>
                    </Table.Head>
                    <Table.Body as="tbody">
                      {CONTACTS.map((contact) => (
                        <Table.BodyRow as="tr" key={contact.id}>
                          <Table.BodyCell as="td">
                            <Table.Checkbox
                              aria-label={`Select ${contact.name}`}
                              name="selections"
                              value={contact.id}
                            />
                          </Table.BodyCell>
                          <Table.BodyCell as="th" justifySelf="start">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--spacing-3)",
                              }}
                            >
                              <Avatar size="sm">{contact.initials}</Avatar>
                              <Table.DoubleLineLayout
                                supplementaryData={`${contact.propertyCount} ${contact.propertyCount === 1 ? "property" : "properties"}`}
                              >
                                <Table.PrimaryAction href="#">{contact.name}</Table.PrimaryAction>
                              </Table.DoubleLineLayout>
                            </div>
                          </Table.BodyCell>
                          {showHomeAddress && (
                            <Table.BodyCell as="td">
                              <Table.DoubleLineLayout
                                supplementaryData={`${contact.suburb}, ${contact.state} ${contact.postcode}`}
                              >
                                {contact.streetAddress}
                              </Table.DoubleLineLayout>
                            </Table.BodyCell>
                          )}
                          <Table.BodyCell as="td">
                            <Table.DoubleLineLayout supplementaryData={contact.email}>
                              {contact.phone}
                            </Table.DoubleLineLayout>
                          </Table.BodyCell>
                          {showContactClasses && (
                            <Table.BodyCell as="td">
                              <TagGroup>
                                {contact.contactClasses.slice(0, 1).map((cls) => (
                                  <TagGroup.Item key={cls}>{cls}</TagGroup.Item>
                                ))}
                                {contact.contactClasses.length > 1 && (
                                  <TagGroup.Item>
                                    +{contact.contactClasses.length - 1}
                                  </TagGroup.Item>
                                )}
                              </TagGroup>
                            </Table.BodyCell>
                          )}
                          <Table.BodyCell as="td">
                            <Table.DoubleLineLayout supplementaryData={contact.lastContactType}>
                              {contact.lastContactDate}
                            </Table.DoubleLineLayout>
                          </Table.BodyCell>
                          <Table.BodyCell as="td">
                            <Table.MoreActions aria-label={`More actions for ${contact.name}`}>
                              <Menu.Item>View</Menu.Item>
                              <Menu.Item>Edit</Menu.Item>
                              <Menu.Item>Archive</Menu.Item>
                            </Table.MoreActions>
                          </Table.BodyCell>
                        </Table.BodyRow>
                      ))}
                    </Table.Body>
                  </Table>
                  <Pagination pageCount={25} pageNumber={1} />
                </div>
              </Flex>
            </Flex>
          </MainContainer>
        </PageLayout.BodyRegion>
      </PageLayout>
    );
  },
});
