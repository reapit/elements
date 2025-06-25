import { cx } from '@linaria/core'
import { elIcon } from './styles'

import type { IconColour, IconSize } from './types'
import type { FunctionComponent, SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  color?: IconColour
  size?: IconSize
}

export function makeIcon(name: string, Svg: FunctionComponent<SVGProps<SVGSVGElement>>) {
  function Icon({ className, color = 'inherit', size = '100%', ...rest }: IconProps) {
    return <Svg {...rest} className={cx(elIcon, className)} color={color} data-size={size} />
  }

  Icon.displayName = name

  return Icon
}
