import { FC, HTMLAttributes, InputHTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElChipCheckbox, ElChipLabel, ElChipGroup, ElChipGroupInner } from './__styles__'
import { useId } from '../../storybook/random-id'

export interface ChipProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Chip: FC<ChipProps> = ({ children, className, id, ...rest }) => {
  const chipId = useId(id)
  return (
    <>
      <ElChipCheckbox id={id ?? chipId} type="checkbox" {...rest} />
      <ElChipLabel htmlFor={id ?? chipId} className={cx(className)}>
        {children}
      </ElChipLabel>
    </>
  )
}

export const ChipGroup: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElChipGroup className={cx(className)} {...rest}>
    <ElChipGroupInner>{children}</ElChipGroupInner>
  </ElChipGroup>
)
