import { render } from '@testing-library/react'
import { EmptyData } from '..'

describe('EmptyData', () => {
  it('should render default component properly and match snapshot', () => {
    const { asFragment } = render(
      <EmptyData>
        <EmptyData.Description>Description</EmptyData.Description>
        <EmptyData.SecondaryDescription>Secondary Description</EmptyData.SecondaryDescription>
        <EmptyData.ActionButton onClick={console.log}>Action Button Text</EmptyData.ActionButton>
      </EmptyData>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
