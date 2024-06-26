import { FC } from 'react'
import { TableRow, TableCell } from '../components/table'
import { colord } from 'colord'
import { TextSM } from '../components/typography'

export const ThemingColourBlock: FC<{
  hex: string
  varName: string
  defaultValue?: string
}> = ({ hex, varName, defaultValue }) => {
  return (
    <TableRow>
      <TableCell>
        <div
          style={{
            borderRadius: '.5rem',
            backgroundColor: hex,
            width: '1.5rem',
            height: '1.5rem',
            border: `1px solid ${colord(hex).darken(0.1).toHex()}`,
          }}
        />
      </TableCell>
      <TableCell>
        <TextSM>{varName}</TextSM>
      </TableCell>
      <TableCell>
        <TextSM>{defaultValue}</TextSM>
      </TableCell>
    </TableRow>
  )
}
