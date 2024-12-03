import React from 'react'
import { render } from '@testing-library/react'
import { CSSContainerQuery } from '../container-query'

describe('ContainerQuery', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <CSSContainerQuery condition="(max-width: 600px)">
        <p>Snapshot Test Content</p>
      </CSSContainerQuery>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
