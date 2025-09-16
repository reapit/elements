import figma from '@figma/code-connect'
import { Pagination } from './pagination'

figma.connect(Pagination, '<PAGINATION_URL>', {
  props: {
    pageNumber: figma.string('Page number'),
    pageCount: figma.string('Page count'),
  },
  // @ts-ignore -- Figma does not allow us to parse the strings as numbers
  example: (props) => <Pagination pageCount={props.pageCount} pageNumber={props.pageNumber} />,
})
