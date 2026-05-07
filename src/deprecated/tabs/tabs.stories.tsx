import preview from '#.storybook/preview'
import { useState } from 'react'
import {
  Tab,
  TabsFooter,
  TabsLabel,
  TabsOptionsWrap,
  TabsWrap,
  TabsItem,
  elTabsFullWidth,
  elTabsHasNoBorder,
  Tabs,
} from './index'
import { TextBase } from '../typography'
import { TextInput } from '../../core/text-input'

const meta = preview.meta({
  title: 'Deprecated/Tabs',
})

export default meta

export const StylesOnlyUsage = meta.story({
  render: () => (
    <TabsWrap>
      <TabsOptionsWrap role="tablist">
        <Tab id="tab-1" name="my-cool-tabs" value="tab-1" type="radio" defaultChecked />
        <TabsLabel htmlFor="tab-1" role="tab" tabIndex={0}>
          <TabsItem>Tab Content 1</TabsItem>
        </TabsLabel>
        <Tab id="tab-2" name="my-cool-tabs" value="tab-2" type="radio" />
        <TabsLabel htmlFor="tab-2" role="tab" tabIndex={0}>
          <TabsItem>Tab Content 1</TabsItem>
        </TabsLabel>
        <Tab id="tab-3" name="my-cool-tabs" value="tab-3" type="radio" />
        <TabsLabel htmlFor="tab-3" role="tab" tabIndex={0}>
          <TabsItem>Tab Content 1</TabsItem>
        </TabsLabel>
      </TabsOptionsWrap>
      <TabsFooter />
    </TabsWrap>
  ),
})

export const FullWidth = meta.story({
  render: () => (
    <TabsWrap className={elTabsFullWidth}>
      <TabsOptionsWrap role="tablist">
        <Tab id="tab-1-fw" name="my-cool-tabs-full-width" value="tab-1-fw" type="radio" defaultChecked />
        <TabsLabel htmlFor="tab-1-fw" role="tab" tabIndex={0}>
          <TabsItem>Tab Content 1</TabsItem>
        </TabsLabel>
        <Tab id="tab-2-fw" name="my-cool-tabs-full-width" value="tab-2-fw" type="radio" />
        <TabsLabel htmlFor="tab-2-fw" role="tab" tabIndex={0}>
          <TabsItem>Tab Content 1</TabsItem>
        </TabsLabel>
        <Tab id="tab-3-fw" name="my-cool-tabs-full-width" value="tab-3-fw" type="radio" />
        <TabsLabel htmlFor="tab-3-fw" role="tab" tabIndex={0}>
          <TabsItem>Tab Content 1</TabsItem>
        </TabsLabel>
      </TabsOptionsWrap>
      <TabsFooter className={elTabsFullWidth} />
    </TabsWrap>
  ),
})

export const NoBorder = meta.story({
  render: () => (
    <TabsWrap>
      <TabsOptionsWrap role="tablist">
        <Tab id="tab-1-nb" name="my-cool-tabs-no-border" value="tab-1-nb" type="radio" defaultChecked />
        <TabsLabel htmlFor="tab-1-nb" role="tab" tabIndex={0}>
          <TabsItem>Tab Content 1</TabsItem>
        </TabsLabel>
        <Tab id="tab-2-nb" name="my-cool-tabs-no-border" value="tab-2-nb" type="radio" />
        <TabsLabel htmlFor="tab-2-nb" role="tab" tabIndex={0}>
          <TabsItem>Tab Content 1</TabsItem>
        </TabsLabel>
        <Tab id="tab-3-nb" name="my-cool-tabs-no-border" value="tab-3-nb" type="radio" />
        <TabsLabel htmlFor="tab-3-nb" role="tab" tabIndex={0}>
          <TabsItem>Tab Content 1</TabsItem>
        </TabsLabel>
      </TabsOptionsWrap>
      <TabsFooter className={elTabsHasNoBorder} />
    </TabsWrap>
  ),
})

export const ReactUsage = meta.story({
  render: () => (
    <Tabs
      name="my-cool-tabs-default"
      options={[
        {
          id: 'react-tab-1',
          value: 'tab-1',
          text: 'Tab Content 1',
          isChecked: true,
        },
        {
          id: 'react-tab-2',
          value: 'tab-2',
          text: 'Tab Content 2',
          isChecked: false,
        },
        {
          id: 'react-tab-3',
          value: 'tab-3',
          text: 'Tab Content 3',
          isChecked: false,
        },
      ]}
    />
  ),
})

export const ReactFullWidth = meta.story({
  render: () => (
    <Tabs
      name="my-cool-tabs-full-width"
      isFullWidth
      options={[
        {
          id: 'react-tab-1-fw',
          value: 'tab-1-fw',
          text: 'Tab Content 1',
          isChecked: true,
        },
        {
          id: 'react-tab-2-fw',
          value: 'tab-2-fw',
          text: 'Tab Content 2',
          isChecked: false,
        },
        {
          id: 'react-tab-3-fw',
          value: 'tab-3-fw',
          text: 'Tab Content 3',
          isChecked: false,
        },
      ]}
    />
  ),
})

export const ReactUncontrolled = meta.story({
  render: () => {
    const [tab, setTab] = useState('1')

    return (
      <>
        <Tabs
          name="my-cool-tabs-react"
          isFullWidth
          onChange={(e: any) => setTab(e.target.value)}
          options={[
            {
              id: 'react-tab-1-react',
              value: '1',
              text: 'Tab Content 1',
              isChecked: tab === '1',
            },
            {
              id: 'react-tab-2-react',
              value: '2',
              text: 'Tab Content 2',
              isChecked: tab === '2',
            },
            {
              id: 'react-tab-3-react',
              value: '3',
              text: 'Tab Content 3',
              isChecked: tab === '3',
            },
          ]}
        />
        {tab === '1' && <TextBase hasGreyText>Tab 1 Content</TextBase>}
        {tab === '2' && <TextBase hasGreyText>Tab 2 Content</TextBase>}
        {tab === '3' && <TextBase hasGreyText>Tab 3 Content</TextBase>}
        <TextInput aria-label="Current tab value" value={tab} readOnly />
      </>
    )
  },
})

export const ReactControlled = meta.story({
  render: () => {
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
              id: 'react-tab-1-react-controlled',
              value: '1',
              text: 'Tab Content 1',
              isChecked: tab === '1',
            },
            {
              id: 'react-tab-2-react-controlled',
              value: '2',
              text: 'Tab Content 2',
              isChecked: tab === '2',
            },
            {
              id: 'react-tab-3-react-controlled',
              value: '3',
              text: 'Tab Content 3',
              isChecked: tab === '3',
            },
          ]}
        />
        {tab === '1' && <TextBase hasGreyText>Tab 1 Content</TextBase>}
        {tab === '2' && <TextBase hasGreyText>Tab 2 Content</TextBase>}
        {tab === '3' && <TextBase hasGreyText>Tab 3 Content</TextBase>}
        <TextInput aria-label="Current tab value" value={tab} onChange={(e) => setTab(e.target.value)} />
      </>
    )
  },
})
