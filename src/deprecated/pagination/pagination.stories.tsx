import { useState } from 'react'
import {
  DeprecatedPagination,
  DeprecatedPaginationWrap,
  DeprecatedPaginationText,
  DeprecatedPaginationButton,
} from './index'
import { elDeprecatedPaginationPrimary } from './__styles__'
import { DeprecatedIcon } from '../icon'

export default {
  title: 'Deprecated/DeprecatedPagination',
  component: DeprecatedPagination,
}

export const BasicExample = {
  render: ({}) => (
    <DeprecatedPaginationWrap>
      <DeprecatedPaginationButton>
        <DeprecatedIcon icon="chevronLeft" />
      </DeprecatedPaginationButton>
      <DeprecatedPaginationText>
        <strong>1</strong> of 4
      </DeprecatedPaginationText>
      <DeprecatedPaginationButton>
        <DeprecatedIcon icon="chevronRight" className={elDeprecatedPaginationPrimary} />
      </DeprecatedPaginationButton>
    </DeprecatedPaginationWrap>
  ),
}

export const ReactExample = {
  render: ({}) => {
    const [currentPage, setCurrentPage] = useState(1)
    return <DeprecatedPagination callback={setCurrentPage} currentPage={currentPage} numberPages={4} />
  },
}

export const ReactExampleWithStartEndButtons = {
  render: ({}) => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <DeprecatedPagination
        callback={setCurrentPage}
        currentPage={currentPage}
        hasStartButton
        hasEndButton
        numberPages={4}
      />
    )
  },
}
