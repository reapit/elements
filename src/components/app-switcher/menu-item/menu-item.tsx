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
}

function AppSwitcherMenuItem({ logo, appName, description, url }: AppSwitcherMenuItemProps) {
  return (
    <ElAppSwitcherMenuItemAnchor href={url} target="_blank" rel="noopener noreferrer">
      <ElAppSwitcherMenuItemLogo>{logo}</ElAppSwitcherMenuItemLogo>
      <ElMenuItemTextWrapper>
        <ElAppSwitcherMenuItemName>{appName}</ElAppSwitcherMenuItemName>
        <ElAppSwitcherMenuItemDescription>{description}</ElAppSwitcherMenuItemDescription>
      </ElMenuItemTextWrapper>
    </ElAppSwitcherMenuItemAnchor>
  )
}
export { AppSwitcherMenuItem }
