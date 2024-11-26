import { useRef } from 'react'

let baseId = 1

export function ContainerQuery({ children, conditions, not = false, containerName = 'container' }) {
  const id = useRef(baseId++)
  return (
    <>
      <style>
        {`
         .el-container-query-${id.current} {
          display: contents;

          @container ${containerName} ${not ? `not ${conditions}` : conditions}  {
            display: none;
          }
      }`}
      </style>
      <div className={`el-container-query-${id.current}`}>{children}</div>
    </>
  )
}
