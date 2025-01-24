import { cx } from '@linaria/core'
import { elTag, ElTagGroup } from './styles'
import type { HTMLAttributes } from 'react'

interface TagAsSpanProps extends HTMLAttributes<HTMLSpanElement> {
  as: 'span'
}

interface TagAsListItemProps extends HTMLAttributes<HTMLLIElement> {
  as?: 'li'
}

export type TagProps = TagAsSpanProps | TagAsListItemProps

export const Tag: React.FC<TagProps> = ({ children, as: Element = 'li', ...props }) => {
  return (
    <Element {...props} className={cx(elTag, props.className)}>
      {children}
    </Element>
  )
}

export const TagGroup = ElTagGroup
