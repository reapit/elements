import { MobileControls } from './index'

export default {
  title: 'MobileControls',
  component: MobileControls,
}

export const BasicUsage = {
  render: () => (
    <MobileControls
      isVisible
      mobileControlItems={[
        {
          label: 'Item One',
          onClick: () => console.log('Clicked Item One'),
        },
        {
          label: 'Item Two',
          onClick: () => console.log('Clicked Item Two'),
        },
        {
          label: 'Item Three',
          onClick: () => console.log('Clicked Item Three'),
        },
      ]}
    />
  ),
}
