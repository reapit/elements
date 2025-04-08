/**
 * Add test names here to exclude from test run. The below typically use placeholder images which vary at each load
 * e.g. Avatar, hence removing - we should ensure the images are static in the story ideally and then can be removed
 * from this list. Also, if the component uses a Portal, it doesn't render correctly in the storybook iframe.
 */
export const flakeyTestList = [
  'avatar--with-src',
  'avatar--with-image',
  'card--card-with-avatar',
  'card--card-with-image',
  'card--card-focussed',
  'card--card-complete-example',
  'card--react-shorthand-avatar-body',
  'card--react-shorthand-complete',
  'layouts--complete-combined-example',
  'layouts--complete-combined-example-max-width',
  'pageheader--basic-usage',
  'table--basic-usage',
  'table--column-widths',
  'table--basic-customisation-table-cells',
  'table--react-shorthand-usage',
  'drawer--basic-usage-closed',
  'mobilecontrols--basic-usage',
  'modal--basic-usage-closed',
  'persistentnotification--full-react-example-fixed-position',
  'portal--portal-usage',
  'deprecatedtable--basic-usage',
  'deprecatedtable--column-widths',
  'deprecatedtable--basic-customisation-table-cells',
  'deprecatedtable--react-shorthand-usage',
  'loader--inline',
  'patterns-layouts--complete-combined-example',
  'patterns-layouts--complete-combined-example-max-width',
]
