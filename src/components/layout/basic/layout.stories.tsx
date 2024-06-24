import { MainContainer, PageContainer, SecondaryNavContainer, FlexContainer } from '../index'
import { GridDemoBlock } from '../../../storybook/demo-block'
import { Grid, Col } from '../../grid'

export default {
  title: 'Basic Components/Layouts',
  // component: MainContainer,
}

export const MainContainerUsage = {
  render: ({}) => (
    <MainContainer>
      <FlexContainer isFlexGrow1>
        <PageContainer>
          <GridDemoBlock />
        </PageContainer>
      </FlexContainer>
    </MainContainer>
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
      <MainContainer tag="main">
        <FlexContainer tag="section" isFlexGrow1>
          <PageContainer tag="aside">These containers all have semanitic tags I passed as a prop</PageContainer>
        </FlexContainer>
      </MainContainer>
    </>
  ),
}
