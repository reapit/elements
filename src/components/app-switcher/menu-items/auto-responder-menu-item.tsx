import { useContext } from 'react'
import AppAvatar from '../app-avatar/app-avatar'
import { apps } from '../appNames'
import { AppMenuGroupHasAccessContext } from '../menu-group-context'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'

type AutoResponderMenuItemProps = {
  url: string
}

export default function AutoResponderMenuItem({ url }: AutoResponderMenuItemProps) {
  const hasAccess = useContext(AppMenuGroupHasAccessContext)
  const { name, description } = apps.autoResponder

  return (
    <AppSwitcherMenuItem
      logo={<AppAvatar appName={'autoResponder'} hasAccess={hasAccess} />}
      appName={name}
      description={description}
      url={url}
    />
  )
}
