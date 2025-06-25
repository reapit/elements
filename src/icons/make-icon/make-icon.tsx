import { cx } from '@linaria/core'
import { elIcon } from './styles'

import type { IconColour, IconSize } from './types'
import type { FunctionComponent, SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  colour?: IconColour
  size?: IconSize
}

export function makeIcon(name: string, Svg: FunctionComponent<SVGProps<SVGSVGElement>>) {
  function Icon({ className, colour = 'inherit', size = '100%', ...rest }: IconProps) {
    return <Svg {...rest} className={cx(elIcon, className)} data-colour={colour} data-size={size} />
  }

  Icon.displayName = name

  return Icon
}
