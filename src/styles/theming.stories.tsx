import { PropsWithChildren, FC } from 'react'
import { Button } from '../components/button'
import { ElementsThemeProvider } from './theme-provider'
import { css } from '@linaria/core'

export default {
  title: 'Theming',
}

export const GlobalThemes = {
  render: ({}) => {
    const GlobalThemeProvider: FC<PropsWithChildren> = ({ children }) => {
      const globalTheme = css`
        :global() {
          :root {
            --intent-primary: #a0c862;
            --intent-primary-dark: #7f9c4b;
            --font-size-small: 24px;
          }
        }
      `

      return <div className={globalTheme}>{children}</div>
    }

    return (
      <GlobalThemeProvider>
        <Button intent="primary">Button Text</Button>
      </GlobalThemeProvider>
    )
  },
}

export const ScopedThemes = {
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
