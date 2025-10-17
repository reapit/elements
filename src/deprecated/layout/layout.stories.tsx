import { DeprecatedMainContainer, PageContainer, SecondaryNavContainer, FlexContainer } from './index'
import { GridDemoBlock } from '../../storybook/demo-block'
import { Grid, Col } from '../grid'

export default {
  title: 'Deprecated/Layouts',
}

export const MainContainerUsage = {
  render: ({}) => (
    <DeprecatedMainContainer>
      <FlexContainer isFlexGrow1>
        <PageContainer>
          <GridDemoBlock />
        </PageContainer>
      </FlexContainer>
    </DeprecatedMainContainer>
  ),
}

export const SecondaryNavContainerUsage = {
  render: ({}) => (
    <SecondaryNavContainer>
      <GridDemoBlock />
    </SecondaryNavContainer>
  ),
}

export const PageContainerUsage = {
  render: ({}) => (
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
}

export const PageContainerMaxWidth = {
  render: ({}) => (
    <PageContainer hasMaxWidth>
      <GridDemoBlock />
    </PageContainer>
  ),
}

export const HasGreyBackground = {
  render: ({}) => (
    <PageContainer hasGreyBackground>
      <GridDemoBlock />
    </PageContainer>
  ),
}

export const FlexContainerUsage = {
  render: ({}) => (
    <FlexContainer isFlexColumn>
      <GridDemoBlock />
      <GridDemoBlock />
    </FlexContainer>
  ),
}

export const TaggedLayouts = {
  render: ({}) => (
    <>
      <DeprecatedMainContainer tag="main">
        <FlexContainer tag="section" isFlexGrow1>
          <PageContainer tag="aside">These containers all have semanitic tags I passed as a prop</PageContainer>
        </FlexContainer>
      </DeprecatedMainContainer>
    </>
  ),
}
