import { FC, HTMLAttributes, memo } from 'react'
import { cx } from '@linaria/core'
import { Intent, getIntentClassName } from '../../helpers/intent'
import { ElIcon } from './__styles__'
import { iconSet } from '../../icons'
export type IconNames = keyof typeof iconSet

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
    <ElIcon className={combinedClassName} {...rest} style={{ fontSize, height, width }}>
      <Svg
        role="img"
        // NOTE: We set width and height attributes to mimic the svgr plugin's `icon` option.
        // This option was originally used to set the width and height of the SVG to 1em
        // when an SVG file was imported as a React component. This is no longer the case,
        // so we now set the width and height attributes to 1em ourselves to ensure backwards
        // compatibility.
        height="1em"
        width="1em"
        title={`Icon image with name ${icon}`}
        style={{ fontSize, height, width }}
      />
    </ElIcon>
  )
})
