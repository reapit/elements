export interface StringMap {
  [key: string]: string
}

export interface PropsWithChildren {
  // Not ideal but need to polyfill while we wait to upgrade to React 18
  children?: any
}

export type sizeType = `--size-${string}`
