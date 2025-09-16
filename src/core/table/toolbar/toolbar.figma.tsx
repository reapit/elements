import figma from '@figma/code-connect'
import { Table } from '../table'

figma.connect(Table.Toolbar, '<TABLE_TOOLBAR_URL>', {
  variant: { Variant: 'Standard' },
  props: {
    itemCount: figma.textContent('Item count'),
    entityName: figma.textContent('Item count'),
  },
  example: (props) => (
    <Table.Toolbar leftContent={`${props.itemCount} ${props.entityName}`} rightContent="TODO: Add page size select" />
  ),
})

figma.connect(Table.Toolbar, '<TABLE_TOOLBAR_URL>', {
  variant: { Variant: 'Bulk actions' },
  props: {
    itemCount: figma.textContent('Item count'),
    entityName: figma.textContent('Item count'),
    bulkActions: figma.children('Bulk actions'),
    selectionCount: figma.string('Selection count'),
  },
  example: (props) => (
    <Table.Toolbar leftContent={`${props.itemCount} ${props.entityName}`} rightContent={props.bulkActions} />
  ),
})
