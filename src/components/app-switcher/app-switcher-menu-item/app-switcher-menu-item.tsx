import {
  ElAppSwitcherMenuItemAnchor,
  ElAppSwitcherMenuItemDescription,
  ElAppSwitcherMenuItemLogo,
  ElAppSwitcherMenuItemName,
  ElMenuItemTextWrapper,
} from './styles'

type AppSwitcherMenuItemProps = {
  logo: React.ReactNode
  appName: string
  description: string
  url: string
  isFocused?: boolean
}

function AppSwitcherMenuItem({ logo, appName, description, url, isFocused = false }: AppSwitcherMenuItemProps) {
  return (
    <ElAppSwitcherMenuItemAnchor data-focused={isFocused} href={url} target="_blank" rel="noopener noreferrer">
      <ElAppSwitcherMenuItemLogo>{logo}</ElAppSwitcherMenuItemLogo>
      <ElMenuItemTextWrapper>
        <ElAppSwitcherMenuItemName>{appName}</ElAppSwitcherMenuItemName>
        <ElAppSwitcherMenuItemDescription>{description}</ElAppSwitcherMenuItemDescription>
      </ElMenuItemTextWrapper>
    </ElAppSwitcherMenuItemAnchor>
  )
}
export { AppSwitcherMenuItem }
