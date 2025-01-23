import { ElStandaloneTag, ElTag, ElTagGroup } from './styles'

export interface TagProps extends React.HTMLAttributes<HTMLLIElement | HTMLSpanElement> {
  isStandalone?: boolean
}

export const Tag: React.FC<TagProps> = ({ children, isStandalone = false, ...props }) => {
  return isStandalone ? <ElStandaloneTag {...props}>{children}</ElStandaloneTag> : <ElTag {...props}>{children}</ElTag>
}

export const TagGroup = ElTagGroup
