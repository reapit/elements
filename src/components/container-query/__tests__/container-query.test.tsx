import React from 'react'
import { render } from '@testing-library/react'
import { ContainerQuery } from '../container-query'

describe('ContainerQuery', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <ContainerQuery containerName="main-container" not conditions="(max-width: 600px)">
        <p>Snapshot Test Content</p>
      </ContainerQuery>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
