import { Button } from '../components/button'
import { ElementsThemeProvider } from './theme-provider'

export default {
  title: 'Theming',
}

export const ThemingProvider = {
  render: ({}) => (
    <ElementsThemeProvider
      theme={{
        intentPrimary: '#ffa000',
        intentPrimaryDark: '#ad6c00',
        fontSizeSmall: '0.875rem',
      }}
    >
      <Button intent="primary">Button Text</Button>
    </ElementsThemeProvider>
  ),
}
