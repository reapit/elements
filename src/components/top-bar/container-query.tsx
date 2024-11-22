import { useRef } from 'react'

let baseId = 1

export default function ContainerQuery({ children, conditions, not = false }) {
  const id = useRef(baseId++)
  return (
    <>
      <style>
        {`
         .el-container-query-${id.current} {
          display: contents;

          @container top-bar ${not ? `not ${conditions}` : conditions}  {
            display: none;
          }
      }`}
      </style>
      <div className={`el-container-query-${id.current}`}>{children}</div>
    </>
  )
}
