import { GridDemoBlock } from '../../storybook/demo-block'
import { Grid, Col, ColHalf, ColQuarter, ColSplit, ColSplitThird, ColSplitTwoThirds, GridThirds } from './grid'
import { GridResponsive, ColResponsive } from './grid-responsive'
import { MediaStateProvider } from '../use-media-query'
import { cx } from '@linaria/core'
import { elColGap2, elRowGap3, elSpan12, elSpan8, elSpan4, elOffset4, elOffset8 } from './__styles__/units'

export default {
  title: 'Deprecated/Grid',
}

export const BasicUsage = {
  render: ({}) => (
    <Grid>
      <Col>
        <GridDemoBlock />
      </Col>
      <Col>
        <GridDemoBlock />
      </Col>
      <Col>
        <GridDemoBlock />
      </Col>
      <Col>
        <GridDemoBlock />
      </Col>
      <Col>
        <GridDemoBlock />
      </Col>
    </Grid>
  ),
}

export const BasicUsageQuarterAndHalves = {
  render: ({}) => (
    <Grid>
      <ColHalf>
        <GridDemoBlock />
      </ColHalf>
      <ColHalf>
        <GridDemoBlock />
      </ColHalf>
      <ColHalf>
        <GridDemoBlock />
      </ColHalf>
      <ColHalf>
        <GridDemoBlock />
      </ColHalf>
      <ColQuarter>
        <GridDemoBlock />
      </ColQuarter>
      <ColQuarter>
        <GridDemoBlock />
      </ColQuarter>
      <ColQuarter>
        <GridDemoBlock />
      </ColQuarter>
      <ColQuarter>
        <GridDemoBlock />
      </ColQuarter>
      <ColQuarter>
        <GridDemoBlock />
      </ColQuarter>
      <ColQuarter>
        <GridDemoBlock />
      </ColQuarter>
    </Grid>
  ),
  name: 'Basic Usage Quarter and Halves',
}

export const BasicUsageSplitScreenGrid = {
  render: ({}) => (
    <Grid>
      <ColSplit>
        <GridDemoBlock />
      </ColSplit>
      <ColSplit>
        <GridDemoBlock />
      </ColSplit>
    </Grid>
  ),
  name: 'Basic Usage - Split Screen Grid',
}

export const BasicUsageSplitScreenGridThirds = {
  render: ({}) => (
    <GridThirds>
      <ColSplitThird>
        <GridDemoBlock />
      </ColSplitThird>
      <ColSplitTwoThirds>
        <GridDemoBlock />
      </ColSplitTwoThirds>
    </GridThirds>
  ),
  name: 'Basic Usage - Split Screen Grid Thirds',
}

export const CustomUsage = {
  render: ({}) => (
    <Grid className={cx(elColGap2, elRowGap3)}>
      <Col className={cx(elSpan12)}>
        <GridDemoBlock />
      </Col>
      <Col className={cx(elSpan8, elOffset4)}>
        <GridDemoBlock />
      </Col>
      <Col className={cx(elSpan4, elOffset4)}>
        <GridDemoBlock />
      </Col>
      <Col className={cx(elSpan4, elOffset8)}>
        <GridDemoBlock />
      </Col>
    </Grid>
  ),
}

export const ReactExampleResponsiveCustomisation = {
  render: ({}) => (
    <MediaStateProvider>
      <GridResponsive
        colGapMobile={1}
        colGapTablet={2}
        colGapDesktop={3}
        colGapWideScreen={4}
        colGapSuperWideScreen={6}
        colGap4KScreen={8}
        rowGapMobile={1}
        rowGapTablet={2}
        rowGapDesktop={3}
        rowGapWideScreen={4}
        rowGapSuperWideScreen={6}
        rowGap4KScreen={8}
      >
        <ColResponsive
          spanMobile={2}
          spanTablet={2}
          spanDesktop={2}
          spanWideScreen={2}
          spanSuperWideScreen={2}
          span4KScreen={2}
        >
          <GridDemoBlock />
        </ColResponsive>
        <ColResponsive
          spanMobile={2}
          spanTablet={2}
          spanDesktop={2}
          spanWideScreen={2}
          spanSuperWideScreen={2}
          span4KScreen={2}
        >
          <GridDemoBlock />
        </ColResponsive>
        <ColResponsive
          spanMobile={2}
          spanTablet={2}
          spanDesktop={2}
          spanWideScreen={2}
          spanSuperWideScreen={2}
          span4KScreen={2}
        >
          <GridDemoBlock />
        </ColResponsive>
        <ColResponsive
          spanMobile={2}
          spanTablet={2}
          spanDesktop={2}
          spanWideScreen={2}
          spanSuperWideScreen={2}
          span4KScreen={2}
        >
          <GridDemoBlock />
        </ColResponsive>
        <ColResponsive
          spanMobile={2}
          spanTablet={2}
          spanDesktop={2}
          spanWideScreen={2}
          spanSuperWideScreen={2}
          span4KScreen={2}
        >
          <GridDemoBlock />
        </ColResponsive>
        <ColResponsive
          spanMobile={2}
          spanTablet={2}
          spanDesktop={2}
          spanWideScreen={2}
          spanSuperWideScreen={2}
          span4KScreen={2}
        >
          <GridDemoBlock />
        </ColResponsive>
        <ColResponsive
          spanMobile={2}
          spanTablet={2}
          spanDesktop={2}
          spanWideScreen={2}
          spanSuperWideScreen={2}
          span4KScreen={2}
        >
          <GridDemoBlock />
        </ColResponsive>
        <ColResponsive
          spanMobile={2}
          spanTablet={2}
          spanDesktop={2}
          spanWideScreen={2}
          spanSuperWideScreen={2}
          span4KScreen={2}
        >
          <GridDemoBlock />
        </ColResponsive>
        <ColResponsive
          spanMobile={2}
          spanTablet={2}
          spanDesktop={2}
          spanWideScreen={2}
          spanSuperWideScreen={2}
          span4KScreen={2}
        >
          <GridDemoBlock />
        </ColResponsive>
        <ColResponsive
          spanMobile={2}
          spanTablet={2}
          spanDesktop={2}
          spanWideScreen={2}
          spanSuperWideScreen={2}
          span4KScreen={2}
        >
          <GridDemoBlock />
        </ColResponsive>
      </GridResponsive>
    </MediaStateProvider>
  ),
  name: 'React Example - Responsive Customisation',
}
