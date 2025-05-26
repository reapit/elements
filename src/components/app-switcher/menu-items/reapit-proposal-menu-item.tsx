import AppAvatar from '../app-avatar/app-avatar'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'
import { appNames } from '../appNames'

type ReapitProposalsMenuItemProps = {
  url: string
  isFocused?: boolean
}

export default function ReapitProposalsMenuItem({ url, isFocused = false }: ReapitProposalsMenuItemProps) {
  const { name, description } = appNames.reapitProposals

  return (
    <AppSwitcherMenuItem
      logo={<AppAvatar appName={name} />}
      appName={name}
      description={description}
      url={url}
      isFocused={isFocused} // (AA)TODO: Can this be handled by the child component?
    />
  )
}
