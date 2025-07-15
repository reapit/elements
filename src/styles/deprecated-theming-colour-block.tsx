import { FC } from 'react'
import { DeprecatedTableRow, DeprecatedTableCell } from '../deprecated/table'
import { colord } from 'colord'
import { TextSM } from '../deprecated/typography'

/** @deprecated */
export const ThemingColourBlock: FC<{
  hex: string
  varName: string
  defaultValue?: string
}> = ({ hex, varName, defaultValue }) => {
  return (
    <DeprecatedTableRow>
      <DeprecatedTableCell>
        <div
          style={{
            borderRadius: '.5rem',
            backgroundColor: hex,
            width: '1.5rem',
            height: '1.5rem',
            border: `1px solid ${colord(hex).darken(0.1).toHex()}`,
          }}
        />
      </DeprecatedTableCell>
      <DeprecatedTableCell>
        <TextSM>{varName}</TextSM>
      </DeprecatedTableCell>
      <DeprecatedTableCell>
        <TextSM>{defaultValue}</TextSM>
      </DeprecatedTableCell>
    </DeprecatedTableRow>
  )
}
