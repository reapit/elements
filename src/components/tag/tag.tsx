import { cx } from '@linaria/core'
import { elTag, ElTagGroup } from './styles'

export interface TagProps extends React.HTMLAttributes<HTMLLIElement | HTMLSpanElement> {
  as?: 'span' | 'li'
}

export const Tag: React.FC<TagProps> = ({ children, as: Element = 'li', ...props }) => {
  return (
    <Element {...props} className={cx(elTag, props.className)}>
      {children}
    </Element>
  )
}

export const TagGroup = ElTagGroup
