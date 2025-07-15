import { FC, PropsWithChildren, useMemo } from 'react'

/** @deprecated */
export interface DeprecatedElementsThemeProviderProps extends PropsWithChildren {
  theme: {
    [key: string]: string
  }
}

/** @deprecated */
export const toKebabCase = (theme: string) =>
  theme
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-z])(\d+)/g, '$1-$2')
    .toLowerCase()

/** @deprecated Use `ThemeProvider` instead */
export const DeprecatedElementsThemeProvider: FC<DeprecatedElementsThemeProviderProps> = ({ children, theme }) => {
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
