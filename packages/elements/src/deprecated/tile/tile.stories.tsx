import preview from "#.storybook/preview";

import { Tile } from ".";
import { elMb7 } from "../../styles/deprecated-spacing";
import { Grid, Col, ColSplitThird, ColSplitTwoThirds, GridThirds } from "../grid";
import { PageContainer } from "../layout";

const meta = preview.meta({
  title: "Deprecated/Tile",
  component: Tile,
});

export default meta;

export const BasicUsage = meta.story({
  render: () => <Tile>Some Content</Tile>,
});

export const PaddingVariants = meta.story({
  render: () => <Tile paddingSize="small">Some Content Here</Tile>,
});

export const TileLayouts = meta.story({
  render: () => (
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
});
