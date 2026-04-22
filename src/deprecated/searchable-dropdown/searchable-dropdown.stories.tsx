import preview from '#.storybook/preview'
import { SearchableDropdown, ControlledSearchableDropdown, SearchableDropdownSearchLabel } from './index'

const meta = preview.meta({
  title: 'Deprecated/SearchableDropdown',
  component: SearchableDropdown,
})

export const BasicUsage = meta.story({
  render: () => (
    <SearchableDropdown
      getResults={async () => {
        return new Promise<any>((resolve) => {
          setTimeout(() => {
            resolve([
              {
                id: '1',
                name: 'First',
              },
              {
                id: '2',
                name: 'Second',
              },
              {
                id: '3',
                name: 'Third',
              },
            ])
          }, 1000)
        })
      }}
      getResultLabel={(result: any) => result.name}
      getResultValue={(result: any) => result.id}
      onChange={(e) => console.log(e.target.value)}
      placeholder="Search"
    />
  ),
})

export const UseWithALabel = meta.story({
  render: () => <SearchableDropdownSearchLabel>Select an option</SearchableDropdownSearchLabel>,
  name: 'Use with a label',
})

export const UseWithAnIcon = meta.story({
  render: () => (
    <SearchableDropdown
      getResults={async () => {
        return new Promise<any>((resolve) => {
          setTimeout(() => {
            resolve([
              {
                id: '1',
                name: 'First',
              },
              {
                id: '2',
                name: 'Second',
              },
              {
                id: '3',
                name: 'Third',
              },
            ])
          }, 1000)
        })
      }}
      getResultLabel={(result: any) => result.name}
      getResultValue={(result: any) => result.id}
      onChange={(e) => console.log(e.target.value)}
      icon="locationAlt"
    />
  ),

  name: 'Use with an icon',
})

export const ControlledUsage = meta.story({
  render: () => (
    <ControlledSearchableDropdown
      isResultsListVisible={true}
      isClearVisible={true}
      loading={false}
      selectedValue=""
      resultsList={[
        {
          result: '1',
          label: 'First',
        },
        {
          result: '2',
          label: 'Second',
        },
        {
          result: '3',
          label: 'Third',
        },
      ]}
      onResultClick={(result) => console.log(result)}
      onClear={() => console.log('clear')}
      icon="locationAlt"
    />
  ),
})

export const DefaultValue = meta.story({
  render: () => <SearchableDropdownSearchLabel>Select an option</SearchableDropdownSearchLabel>,
})
