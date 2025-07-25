import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElTile, elTilePaddingSmall, elTilePaddingNone } from './__styles__'

/** @deprecated */
export interface TileProps extends HTMLAttributes<HTMLSpanElement> {
  paddingSize?: 'none' | 'small' | 'regular'
}

/** @deprecated */
export const Tile: FC<TileProps> = ({ children, paddingSize, className, ...rest }) => (
  <ElTile
    className={cx(
      className,
      paddingSize === 'none' && elTilePaddingNone,
      paddingSize === 'small' && elTilePaddingSmall,
    )}
    {...rest}
  >
    {children}
  </ElTile>
)
