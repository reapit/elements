import { useState } from 'react'
import { Pagination, PaginationWrap, PaginationText, PaginationButton } from './index'
import { elPaginationPrimary } from './__styles__'
import { Icon } from '../icon'

export default {
  title: 'Pagination',
}

export const BasicExample = {
  render: () => (
    <PaginationWrap>
      <PaginationText>
        <strong>1</strong>of 4
      </PaginationText>
      <PaginationButton>
        <Icon icon="chevronLeft" />
      </PaginationButton>
      <PaginationButton>
        <Icon icon="chevronRight" className={elPaginationPrimary} />
      </PaginationButton>
    </PaginationWrap>
  ),
}

export const ReactExample = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    return <Pagination callback={setCurrentPage} currentPage={currentPage} numberPages={4} />
  },
}

export const ReactExampleWithStartEndButtons = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <Pagination callback={setCurrentPage} currentPage={currentPage} hasStartButton hasEndButton numberPages={4} />
    )
  },
}
