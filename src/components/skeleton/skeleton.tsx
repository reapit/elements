import { HTMLAttributes } from 'react'
import { ElSkeleton } from './styles'

interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  height?: string
  width?: string
  borderRadius?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ height = '1rem', width = '10rem', borderRadius, ...rest }) => {
  return <ElSkeleton style={{ height: height, width: width, borderRadius: borderRadius }} {...rest} />
}
