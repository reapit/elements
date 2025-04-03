import { FC } from 'react'
import { NavIconItem } from '../nav-icon-item'
import { ElMobileNavMenuHeader } from './styles'
import { Icon } from '../icon'

export interface MobileNavMenuHeaderProps {
  onClose: VoidFunction
}

export const MobileNavMenuHeader: FC<MobileNavMenuHeaderProps> = ({ onClose }) => {
  return (
    <ElMobileNavMenuHeader>
      <NavIconItem aria-label="Close" icon={<Icon icon="close" fontSize="24px" />} onClick={onClose} />
    </ElMobileNavMenuHeader>
  )
}
