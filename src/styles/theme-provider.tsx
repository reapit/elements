import { FC, PropsWithChildren, useMemo } from 'react'

export interface ElementsThemeProviderProps extends PropsWithChildren {
  theme: {
    [key: string]: string
  }
}

export const toKebabCase = (theme: string) => theme.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

export const ElementsThemeProvider: FC<ElementsThemeProviderProps> = ({ children, theme }) => {
  const scopedTheme = useMemo(() => {
    const newScopedTheme = {}

    for (const key in theme) {
      const variableName = `--${toKebabCase(key)}`
      const value = theme[key]

      newScopedTheme[variableName] = value
    }

    return newScopedTheme
  }, [])

  return <div style={scopedTheme}>{children}</div>
}
