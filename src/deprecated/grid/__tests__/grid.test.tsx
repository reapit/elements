import { render } from '@testing-library/react'
import { Grid, Col, ColSplit, GridThirds, ColSplitThird, ColSplitTwoThirds, ColHalf, ColQuarter } from '../grid'

describe('Grid', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <Grid>
        <p>I am child</p>
      </Grid>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('Col', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <Col>
        <p>I am child</p>
      </Col>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ColHalf', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <ColHalf>
        <p>I am child</p>
      </ColHalf>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ColQuarter', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <ColQuarter>
        <p>I am child</p>
      </ColQuarter>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ColSplit', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <ColSplit>
        <p>I am child</p>
      </ColSplit>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('GridThirds', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <GridThirds>
        <p>I am child</p>
      </GridThirds>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ColSplitThird', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <ColSplitThird>
        <p>I am child</p>
      </ColSplitThird>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ColSplitTwoThirds', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <ColSplitTwoThirds>
        <p>I am child</p>
      </ColSplitTwoThirds>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
