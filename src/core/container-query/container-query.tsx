import { ReactNode, useRef, type FC } from 'react'

let baseId = 1

interface CSSContainerQueryProps {
  children: ReactNode
  condition: string
}

export const CSSContainerQuery: FC<CSSContainerQueryProps> = ({ children, condition }) => {
  /**
   * We need to create a unique class name to allow these styles to apply to the div being rendered here.
   * This is only necessary because Firefox does not yet support the @scope CSS at-rule
   * and the `useId` hook available via React does not produce IDs that are compatible with CSS.
   */
  const id = useRef(baseId++)
  return (
    <>
      <style>
        {`
         .el-container-query-${id.current} {
          display: contents;

          @container ${condition}  {
            display: none;
          }
      }`}
      </style>
      <div className={`el-container-query-${id.current}`}>{children}</div>
    </>
  )
}
