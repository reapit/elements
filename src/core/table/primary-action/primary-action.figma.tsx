import figma from '@figma/code-connect'
import { Table } from '../table'

figma.connect(Table.PrimaryAction, '<TABLE_TEXT_SM_URL>', {
  props: {
    children: figma.textContent('Value'),
  },
  example: (props) => <>{props.children}</>,
})

figma.connect(Table.PrimaryAction, '<TABLE_TEXT_SM_URL>', {
  variant: { Style: 'Primary' },
  props: {
    children: figma.textContent('Value'),
  },
  example: (props) => <Table.PrimaryAction href="#replace-me">{props.children}</Table.PrimaryAction>,
})
