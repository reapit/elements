import reapitLogoUrl from './icons/brand-reapit.svg'
import type { ImgHTMLAttributes } from 'react'

/** @deprecated */
interface ReapitLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {}

/** @deprecated Use `TopBar.BrandLogo` instead. */
export const ReapitLogo = (props: ReapitLogoProps) => {
  return <img {...props} src={reapitLogoUrl} />
}
