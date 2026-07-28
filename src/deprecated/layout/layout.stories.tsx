import preview from "#.storybook/preview";

import { GridDemoBlock } from "../../storybook/demo-block";
import { Grid, Col } from "../grid";
import {
  DeprecatedMainContainer,
  PageContainer,
  SecondaryNavContainer,
  FlexContainer,
} from "./index";

const meta = preview.meta({
  title: "Deprecated/Layouts",
});

export default meta;

export const MainContainerUsage = meta.story({
  render: () => (
    <DeprecatedMainContainer>
      <FlexContainer isFlexGrow1>
        <PageContainer>
          <GridDemoBlock />
        </PageContainer>
      </FlexContainer>
    </DeprecatedMainContainer>
  ),
});

export const SecondaryNavContainerUsage = meta.story({
  render: () => (
    <SecondaryNavContainer>
      <GridDemoBlock />
    </SecondaryNavContainer>
  ),
});

export const PageContainerUsage = meta.story({
  render: () => (
    <PageContainer>
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
    </PageContainer>
  ),
});

export const PageContainerMaxWidth = meta.story({
  render: () => (
    <PageContainer hasMaxWidth>
      <GridDemoBlock />
    </PageContainer>
  ),
});

export const HasGreyBackground = meta.story({
  render: () => (
    <PageContainer hasGreyBackground>
      <GridDemoBlock />
    </PageContainer>
  ),
});

export const FlexContainerUsage = meta.story({
  render: () => (
    <FlexContainer isFlexColumn>
      <GridDemoBlock />
      <GridDemoBlock />
    </FlexContainer>
  ),
});

export const TaggedLayouts = meta.story({
  render: () => (
    <>
      <DeprecatedMainContainer tag="main">
        <FlexContainer tag="section" isFlexGrow1>
          <PageContainer tag="aside">
            These containers all have semanitic tags I passed as a prop
          </PageContainer>
        </FlexContainer>
      </DeprecatedMainContainer>
    </>
  ),
});
