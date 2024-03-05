import React, { FC, HTMLAttributes, memo } from 'react'
import { cx } from '@linaria/core'
import { Intent, getIntentClassName } from '../../helpers/intent'
import { ElIcon } from './__styles__'
import { iconSet } from '../../icons'
export type IconNames = keyof typeof iconSet

export type IconSize = 'smallest' | 'small' | 'medium' | 'large' | 'largest'

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  icon: IconNames
  intent?: Intent
  fontSize?: string
  className?: string
  height?: string
  width?: string
}

export const Icon: FC<IconProps> = memo(({ icon, intent, fontSize, className, height, width, ...rest }) => {
  const Svg = iconSet[icon]
  const intentClassname = intent && getIntentClassName(intent)
  const combinedClassName = cx(className, intentClassname)

  if (!Svg) return <ElIcon className={combinedClassName} {...rest} />

  return (
    <ElIcon role="img" className={combinedClassName} {...rest} style={{ fontSize, height, width }}>
      <Svg style={{ fontSize, height, width }} />
    </ElIcon>
  )
})
