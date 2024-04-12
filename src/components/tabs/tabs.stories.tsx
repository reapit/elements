import { Tabs } from './index'
import { useState } from 'react'
import { InputGroup } from '../input-group'
import { TextBase } from '../typography'

export default {
  title: 'Tabs',
  component: Tabs,
}

export const TabsDefault = {
  render: ({}) => (
    <Tabs
      name="my-cool-tabs-default"
      options={[
        {
          id: 'tab-1',
          value: 'tab-1',
          text: 'Tab Content 1',
          isChecked: true,
        },
        {
          id: 'tab-2',
          value: 'tab-2',
          text: 'Tab Content 2',
          isChecked: false,
        },
        {
          id: 'tab-3',
          value: 'tab-3',
          text: 'Tab Content 3',
          isChecked: false,
        },
      ]}
    />
  ),
  name: 'Tabs - Default',
}

export const TabsFullWidth = {
  render: ({}) => (
    <Tabs
      name="my-cool-tabs-full-width"
      isFullWidth
      options={[
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
      ]}
    />
  ),
  name: 'Tabs - Full Width',
}

export const TabsReactExampleUncontrolled = {
  render: ({}) => {
    const [tab, setTab] = useState('1')

    return (
      <>
        <Tabs
          name="my-cool-tabs-react"
          isFullWidth
          onChange={(e: any) => setTab(e.target.value)}
          options={[
            {
              id: 'tab-1-react',
              value: '1',
              text: 'Tab Content 1',
              isChecked: tab === '1',
            },
            {
              id: 'tab-2-react',
              value: '2',
              text: 'Tab Content 2',
              isChecked: tab === '2',
            },
            {
              id: 'tab-3-react',
              value: '3',
              text: 'Tab Content 3',
              isChecked: tab === '3',
            },
          ]}
        />
        {tab === '1' && <TextBase hasGreyText>Tab 1 Content</TextBase>}
        {tab === '2' && <TextBase hasGreyText>Tab 2 Content</TextBase>}
        {tab === '3' && <TextBase hasGreyText>Tab 3 Content</TextBase>}
        <InputGroup
          value={tab}
          label="The value of this input will change with the state, but updating the state of the input will not change the tab."
          type="number"
          min="1"
          max="3"
          onChange={(e) => {
            setTab(e.target.value)
          }}
        />
      </>
    )
  },
  name: 'Tabs - React Example uncontrolled',
}

export const TabsReactExampleControlled = {
  render: ({}) => {
    const [tab, setTab] = useState('1')

    return (
      <>
        <Tabs
          name="my-cool-tabs-react-controlled"
          isFullWidth
          isControlled
          onChange={(e: any) => setTab(e.target.value)}
          options={[
            {
              id: 'tab-1-react-controlled',
              value: '1',
              text: 'Tab Content 1',
              isChecked: tab === '1',
            },
            {
              id: 'tab-2-react-controlled',
              value: '2',
              text: 'Tab Content 2',
              isChecked: tab === '2',
            },
            {
              id: 'tab-3-react-controlled',
              value: '3',
              text: 'Tab Content 3',
              isChecked: tab === '3',
            },
          ]}
        />
        {tab === '1' && <TextBase hasGreyText>Tab 1 Content</TextBase>}
        {tab === '2' && <TextBase hasGreyText>Tab 2 Content</TextBase>}
        {tab === '3' && <TextBase hasGreyText>Tab 3 Content</TextBase>}
        <InputGroup
          value={tab}
          label="The value of this input will change with the state and updating the input will change the tab"
          type="number"
          min="1"
          max="3"
          onChange={(e) => {
            setTab(e.target.value)
          }}
        />
      </>
    )
  },
  name: 'Tabs - React Example controlled',
}
