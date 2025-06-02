import { useContext } from 'react'
import AppAvatar from '../app-avatar/app-avatar'
import { apps } from '../appNames'
import { AppMenuGroupHasAccessContext } from '../menu-group-context'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'

type ReapitPMMenuItemProps = {
  url: string
}

export default function ReapitPMMenuItem({ url }: ReapitPMMenuItemProps) {
  const hasAccess = useContext(AppMenuGroupHasAccessContext)
  const { name, description } = apps.reapitPM

  return (
    <AppSwitcherMenuItem
      logo={<AppAvatar appName={'reapitPM'} hasAccess={hasAccess} />}
      appName={name}
      description={description}
      url={url}
    />
  )
}
