import { useRef } from 'react'

import type { FC, ReactNode } from 'react'

let baseId = 1

export namespace CSSContainerQuery {
  export interface Props {
    children: ReactNode
    condition: string
  }
}

/**
 * @deprecated Use `CSSContainerQuery.Props` instead.
 */
export type CSSContainerQueryProps = CSSContainerQuery.Props

export const CSSContainerQuery: FC<CSSContainerQuery.Props> = ({ children, condition }) => {
  /**
   * We need to create a unique class name to allow these styles to apply to the div being rendered here.
   * This is only necessary because Firefox does not yet support the @scope CSS at-rule
   * and the `useId` hook available via React does not produce IDs that are compatible with CSS.
   */
  const id = useRef(baseId++)
  return (
    <>
      <style>{`
        .el-css-container-query-${id.current} {
          display: contents;

          @container ${condition}  {
            display: none;
          }
        }
      `}</style>
      <div className={`el-css-container-query-${id.current}`}>{children}</div>
    </>
  )
}
