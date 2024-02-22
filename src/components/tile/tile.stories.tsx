import { Tile } from '.'
import { PageContainer } from '../layout'
import { Grid, Col, ColSplitThird, ColSplitTwoThirds, GridThirds } from '../grid'
import { elMb7 } from '../../styles/spacing'

export default {
  title: 'Tile',
  component: Tile,
}

export const BasicUsage = {
  render: ({}) => <Tile>Some Content</Tile>,
}

export const PaddingVariants = {
  render: ({}) => <Tile paddingSize="small">Some Content Here</Tile>,
}

export const TileLayouts = {
  render: ({}) => (
    <PageContainer hasMaxWidth hasGreyBackground>
      <Grid className={elMb7}>
        <Col>
          <Tile paddingSize="small">Some Content Here</Tile>
        </Col>
        <Col>
          <Tile paddingSize="small">Some Content Here</Tile>
        </Col>
        <Col>
          <Tile paddingSize="small">Some Content Here</Tile>
        </Col>
        <Col>
          <Tile paddingSize="small">Some Content Here</Tile>
        </Col>
        <Col>
          <Tile paddingSize="small">Some Content Here</Tile>
        </Col>
        <Col>
          <Tile paddingSize="small">Some Content Here</Tile>
        </Col>
      </Grid>
      <GridThirds>
        <ColSplitThird>
          <Tile>Some Content Here</Tile>
        </ColSplitThird>
        <ColSplitTwoThirds>
          <Tile>Some Content Here</Tile>
        </ColSplitTwoThirds>
      </GridThirds>
    </PageContainer>
  ),
}
