import { FC } from 'react'
import { NavIconItem } from '../nav-icon-item'
import { Icon } from '../icon'
import { ElTopBarMenuHeader } from './styles'
import { useTopBarMenuContext } from './top-bar-menu-context'

export const TopBarMenuHeader: FC = () => {
  const { onClose } = useTopBarMenuContext()
  return (
    <ElTopBarMenuHeader>
      <NavIconItem aria-label="Close" icon={<Icon icon="close" fontSize="24px" />} onClick={onClose} />
    </ElTopBarMenuHeader>
  )
}
