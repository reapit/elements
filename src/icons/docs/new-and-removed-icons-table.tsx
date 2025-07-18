import { DeprecatedIcon } from '#src/deprecated/icon/index'
import { iconSet as v4Icons } from '#src/deprecated/icons/index'
import { Text } from '#src/core/text/index'
import * as v5Icons from '..'
import { Badge } from '#src/core/badge/badge'

export function NewAndRemovedIconsTable() {
  const tableStyles = { border: '1px solid #FA00FF', width: '50%' }
  const cellStyles = { padding: 'var(--spacing-2)', verticalAlign: 'middle' }
  const headingCellStyles = { padding: 'var(--spacing-2)' }
  const fallback = (
    <Text colour="secondary" size="sm">
      n/a
    </Text>
  )
  return (
    <table className="sb-unstyled" style={tableStyles}>
      <thead style={{ backgroundColor: 'var(--colour-fill-neutral-lightest)' }}>
        <tr>
          <th align="left" style={headingCellStyles}>
            <Text weight="bold">Icon Name</Text>
          </th>
          <th align="left" style={headingCellStyles}>
            <Text weight="bold">v4</Text>
          </th>
          <th align="left" style={headingCellStyles}>
            <Text weight="bold">v5</Text>
          </th>
          <th align="left" style={headingCellStyles}>
            <Text weight="bold">Status</Text>
          </th>
        </tr>
      </thead>
      {changeList.map((icon) => (
        <tr key={icon.name}>
          <td style={cellStyles}>
            <Text size="sm">{icon.name}</Text>
          </td>
          <td align="left" style={cellStyles}>
            {icon.v4 ?? fallback}
          </td>
          <td align="left" style={cellStyles}>
            {icon.v5 ?? fallback}
          </td>
          <td style={cellStyles}>{icon.notes}</td>
        </tr>
      ))}
    </table>
  )
}

const v4IconNames = new Set(Object.keys(v4Icons).sort())
const v5IconNames = new Set(Object.keys(v5Icons).sort().map(toV4IconName))

const changedIconNames = Array.from(v4IconNames.symmetricDifference(v5IconNames))

const changeList = changedIconNames.sort().map((icon) => {
  const deprecatedIcon = getOldIcon(icon)
  const newIcon = getNewIcon(icon)
  return {
    name: icon,
    v4: deprecatedIcon,
    v5: newIcon,
    notes: getNotes(deprecatedIcon, newIcon),
  }
})

function getOldIcon(icon: string) {
  if (icon in v4Icons) {
    return <DeprecatedIcon icon={icon as keyof typeof v4Icons} fontSize="24px" />
  }
  return null
}

function getNewIcon(icon: string) {
  const v5IconName = toV5IconName(icon) as keyof typeof v5Icons
  const Icon = v5Icons[v5IconName]
  return Icon ? <Icon color="primary" size="lg" /> : null
}

function getNotes(deprecatedIcon: React.ReactNode, newIcon: React.ReactNode) {
  if (!deprecatedIcon) {
    return <Badge colour="neutral">New</Badge>
  } else if (!newIcon) {
    return <Badge colour="danger">Removed</Badge>
  }
  return null
}

function toV5IconName(v4IconName: string) {
  return `${v4IconName.charAt(0).toUpperCase() + v4IconName.slice(1)}Icon`
}

function toV4IconName(v5IconName: string) {
  return v5IconName.charAt(0).toLowerCase() + v5IconName.slice(1).replace('Icon', '')
}
