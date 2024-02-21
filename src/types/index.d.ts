/**
 * Gobal override types to make the compiler happy
 */

declare module '*.jpg'

declare module '*.svg?react' {
  const content: any
  export const ReactComponent: FC

  export default content
}
