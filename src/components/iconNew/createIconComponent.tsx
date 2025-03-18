import { FC, HTMLAttributes, memo } from 'react'
import { cx } from '@linaria/core'
import { Intent, getIntentClassName } from '../../helpers/intent'
import { ElIcon } from '../icon/__styles__'

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
  fontSize?: string
  className?: string
  height?: string
  width?: string
}

export function createIconComponent(Svg: FC<React.SVGProps<SVGSVGElement> & { title?: string }>, iconName: string) {
  const IconComponent: FC<IconProps> = memo(({ intent, fontSize, className, height, width, ...rest }) => {
    const intentClassname = intent && getIntentClassName(intent)
    const combinedClassName = cx(className, intentClassname)
    const style = { fontSize, height, width }

    return (
      <ElIcon className={combinedClassName} {...rest} style={style}>
        <Svg role="img" title={`Icon image with name ${iconName}`} style={style} />
      </ElIcon>
    )
  })

  IconComponent.displayName = `${iconName}Icon`
  return IconComponent
}
