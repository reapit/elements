import preview from '#.storybook/preview'
import { Button } from '#src/core/button'
import { Card } from '#src/core/card'
import { CloseIcon } from '#src/icons/close'
import { CompactSelect } from '#src/core/compact-select'
import { FilterBar } from '#src/core/filter-bar'
import { Flex } from '#src/utils/flex'
import { FocusedLayout } from '#src/core/focused-layout'
import { FolderTabs } from '#src/core/folder-tabs'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'
import { SearchInput } from '#src/core/search-input'
import { Table } from '#src/core/table'
import { Text } from '#src/utils/text'
import { useMatchMedia } from '#src/utils/match-media'

const meta = preview.meta({
  title: 'Blocks/AllocateFunds',
  parameters: {
    layout: 'fullscreen',
  },
})

interface Transaction {
  id: string
  payer: string
  reference: string
  match: string
  matchDetail: string
  date: string
  amount: string
}

const MATCHED_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-1',
    payer: 'Max Smith',
    reference: 'max123',
    match: '12 Wattle Grove, Toowong',
    matchDetail: 'Invoice #234 · $350.00',
    date: '23 Jan 2025',
    amount: '$350.00',
  },
  {
    id: 'txn-2',
    payer: 'Chloe Nguyen',
    reference: 'refid1234',
    match: '5 Ironbark Pde, Springfield Lakes',
    matchDetail: 'Rent · July 2025',
    date: '23 Jan 2025',
    amount: '$510.00',
  },
  {
    id: 'txn-3',
    payer: "Liam O'Connor",
    reference: 'refid1234',
    match: '108/74 Palm Tree Lane, West End',
    matchDetail: 'Invoice #211 · $290.00',
    date: '24 Jan 2025',
    amount: '$290.00',
  },
  {
    id: 'txn-4',
    payer: 'Archie Singh',
    reference: 'refid1234',
    match: '710/15 Mango Place, West End',
    matchDetail: 'Rent · July 2025 · Paid-to-date: 16.05.2025',
    date: '23 Jan 2025',
    amount: '$110.00',
  },
  {
    id: 'txn-5',
    payer: 'Isla Roberts',
    reference: 'refid1234',
    match: '9 Main Rd, Brisbane City',
    matchDetail: 'Invoice #99875 · $75.20 · +1 another item',
    date: '23 Jan 2025',
    amount: '$93.50',
  },
  {
    id: 'txn-6',
    payer: 'Sarah Williams',
    reference: 'refid1234',
    match: '19 Banksia Ct, Buderim',
    matchDetail: 'Rent · June 2025 · $400.00',
    date: '23 Jan 2025',
    amount: '$400.00',
  },
]

/**
 * A focused flow for reviewing and allocating matched funds.
 *
 * Demonstrates the standard composition for distraction-free flows: a `FocusedLayout` with a dark
 * background, folder tabs for switching between matched and unmatched transactions, a tab-specific
 * primary action, a filter bar with search, and a data table. The Match column is hidden below the
 * MD breakpoint to keep the table legible on smaller viewports.
 */
export const Example = meta.story({
  render: () => {
    const isWidthAtOrAboveSM = useMatchMedia(isWidthAtOrAbove('SM'))
    const isWidthAtOrAboveMD = useMatchMedia(isWidthAtOrAbove('MD'))

    const showMatchColumn = isWidthAtOrAboveMD

    const columns = showMatchColumn ? '2fr 3fr 1fr 1fr' : '3fr 2fr 2fr'

    return (
      <FocusedLayout background="dark" id="allocate-funds">
        <FocusedLayout.TopBar logo={<FocusedLayout.ProductLogo product="Reapit PM" />} title="Allocate funds">
          {isWidthAtOrAboveSM ? (
            <Button size="medium" variant="secondary">
              Close
            </Button>
          ) : (
            <Button aria-label="Close" iconLeft={<CloseIcon />} size="large" variant="tertiary" />
          )}
        </FocusedLayout.TopBar>

        <FocusedLayout.Content>
          <Flex direction="column" style={{ padding: 'var(--spacing-6) 0' }}>
            <FolderTabs>
              <FolderTabs.Item aria-current="page" href="#">
                <FolderTabs.CountLabel count="87">Matched transactions</FolderTabs.CountLabel>
              </FolderTabs.Item>
              <FolderTabs.Item aria-current={false} href="#">
                <FolderTabs.CountLabel count="6">Unmatched transactions</FolderTabs.CountLabel>
              </FolderTabs.Item>
            </FolderTabs>

            <Card borderRadius="--border-radius-none" isBorderless padding="--spacing-10">
              <Flex direction="column" gap="--spacing-6">
                <Flex justifyContent="flex-end">
                  <Button size="medium" variant="primary">
                    Allocate all
                  </Button>
                </Flex>

                <FilterBar
                  leftContent={
                    <FilterBar.LeftContent>
                      <SearchInput
                        aria-label="Search transactions"
                        maxWidth="var(--size-64)"
                        placeholder="Search"
                        size="medium"
                      />
                    </FilterBar.LeftContent>
                  }
                  rightContent={
                    <FilterBar.RightContent>
                      <CompactSelect size="medium">
                        <CompactSelect.Button>
                          {(option) => (
                            <Text font="text-sm/regular" colour="secondary">
                              Sort by: {option.label}
                            </Text>
                          )}
                        </CompactSelect.Button>
                        <CompactSelect.Popup>
                          <CompactSelect.Listbox defaultValue={['relevance']} name="sortBy">
                            <CompactSelect.Option value="relevance">Relevance</CompactSelect.Option>
                            <CompactSelect.Option value="newest">Newest</CompactSelect.Option>
                            <CompactSelect.Option value="oldest">Oldest</CompactSelect.Option>
                            <CompactSelect.Option value="amount-desc">Amount (high to low)</CompactSelect.Option>
                            <CompactSelect.Option value="amount-asc">Amount (low to high)</CompactSelect.Option>
                          </CompactSelect.Listbox>
                        </CompactSelect.Popup>
                      </CompactSelect>
                    </FilterBar.RightContent>
                  }
                />

                <Table as="table" columns={columns}>
                  <Table.Head as="thead">
                    <Table.HeaderRow as="tr">
                      <Table.HeaderCell as="th" justifySelf="start">
                        Transaction
                      </Table.HeaderCell>
                      {showMatchColumn && <Table.HeaderCell as="th">Match</Table.HeaderCell>}
                      <Table.HeaderCell as="th">Date</Table.HeaderCell>
                      <Table.HeaderCell as="th">Amount</Table.HeaderCell>
                    </Table.HeaderRow>
                  </Table.Head>
                  <Table.Body as="tbody">
                    {MATCHED_TRANSACTIONS.map((transaction) => (
                      <Table.BodyRow as="tr" key={transaction.id}>
                        <Table.BodyCell as="th" justifySelf="start">
                          <Table.DoubleLineLayout supplementaryData={`Ref: ${transaction.reference}`}>
                            <Table.PrimaryAction href="#">{transaction.payer}</Table.PrimaryAction>
                          </Table.DoubleLineLayout>
                        </Table.BodyCell>
                        {showMatchColumn && (
                          <Table.BodyCell as="td">
                            <Table.DoubleLineLayout supplementaryData={transaction.matchDetail}>
                              {transaction.match}
                            </Table.DoubleLineLayout>
                          </Table.BodyCell>
                        )}
                        <Table.BodyCell as="td">{transaction.date}</Table.BodyCell>
                        <Table.BodyCell as="td">{transaction.amount}</Table.BodyCell>
                      </Table.BodyRow>
                    ))}
                  </Table.Body>
                </Table>
              </Flex>
            </Card>
          </Flex>
        </FocusedLayout.Content>
      </FocusedLayout>
    )
  },
})
