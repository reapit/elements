import { SearchableDropdown, ControlledSearchableDropdown, SearchableDropdownSearchLabel } from './index'

export default {
  title: 'Deprecated/SearchableDropdown',
  component: SearchableDropdown,
}

export const BasicUsage = {
  render: ({}) => (
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
}

export const UseWithALabel = {
  render: ({}) => <SearchableDropdownSearchLabel>Select an option</SearchableDropdownSearchLabel>,
  name: 'Use with a label',
}

export const UseWithAnIcon = {
  render: ({}) => (
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
}

export const ControlledUsage = {
  render: ({}) => (
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
}

export const DefaultValue = {
  render: ({}) => <SearchableDropdownSearchLabel>Select an option</SearchableDropdownSearchLabel>,
}
