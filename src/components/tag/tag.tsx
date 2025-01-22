import { ElTag, ElTagGroupItem, ElTagGroup } from './styles'

export interface TagProps extends React.HTMLAttributes<HTMLLIElement | HTMLSpanElement> {
  as?: 'span' | 'li'
}

export const Tag: React.FC<TagProps> = ({ children, as = 'li', ...props }) => {
  return as == 'span' ? <ElTag {...props}>{children}</ElTag> : <ElTagGroupItem {...props}>{children}</ElTagGroupItem>
}

export const TagGroup = ElTagGroup
