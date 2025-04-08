import { Button } from '../components/button'
import { DeprecatedElementsThemeProvider } from './deprecated-theme-provider'

export default {
  title: 'DeprecatedTheming',
}

export const DeprecatedThemingProvider = {
  render: ({}) => (
    <DeprecatedElementsThemeProvider
      theme={{
        intentPrimary: '#ffa000',
        intentPrimaryDark: '#ad6c00',
        fontSizeSmall: '0.875rem',
      }}
    >
      <Button variant="primary">Button Text</Button>
    </DeprecatedElementsThemeProvider>
  ),
}
