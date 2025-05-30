import { useContext } from 'react'
import AppAvatar from '../app-avatar/app-avatar'
import { apps } from '../appNames'
import { AppMenuGroupHasAccessContext } from '../menu-group-context'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'

type ReapitProposalsMenuItemProps = {
  url: string
}

export default function ReapitProposalsMenuItem({ url }: ReapitProposalsMenuItemProps) {
  const hasAccess = useContext(AppMenuGroupHasAccessContext)
  const { name, description } = apps.reapitProposals

  return (
    <AppSwitcherMenuItem
      logo={<AppAvatar appName={'reapitProposals'} hasAccess={hasAccess} />}
      appName={name}
      description={description}
      url={url}
    />
  )
}
