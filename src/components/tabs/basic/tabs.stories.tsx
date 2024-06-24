import {
  Tab,
  TabsFooter,
  TabsLabel,
  TabsOptionsWrap,
  TabsWrap,
  TabsItem,
  elTabsFullWidth,
  elTabsHasNoBorder,
} from '../index'

export default {
  title: 'Basic Components/Tabs',
}

export const BasicUsage = {
  render: ({}) => (
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
}

export const FullWidth = {
  render: ({}) => (
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
}

export const NoBorder = {
  render: ({}) => (
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
}
