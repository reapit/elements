import { DeprecatedButton } from '../deprecated/button'
import { DeprecatedElementsThemeProvider } from './deprecated-theme-provider'

export default {
  title: 'Deprecated/DeprecatedTheming',
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
      <DeprecatedButton variant="primary">Button Text</DeprecatedButton>
    </DeprecatedElementsThemeProvider>
  ),
}
