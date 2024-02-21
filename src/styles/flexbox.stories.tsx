import { GridDemoBlockWithMargin } from '../storybook/demo-block'

export default {
  title: 'Flexbox',
}

export const Flex = {
  render: () => (
    <div className="el-flex">
      <GridDemoBlockWithMargin>First Element</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>Second Element</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex',
}

export const IsFlexColumn = {
  render: () => (
    <div className="el-flex el-is-flex-column">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'is-flex-column',
}

export const FlexRow = {
  render: () => (
    <div className="el-flex el-flex-row">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-row',
}

export const FlexRowReverse = {
  render: () => (
    <div className="el-flex el-flex-row-reverse">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-row-reverse',
}

export const FlexColumn = {
  render: () => (
    <div className="el-flex el-flex-column">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-column',
}

export const FlexColumnReverse = {
  render: () => (
    <div className="el-flex el-flex-column-reverse">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-column-reverse',
}

export const FlexWrap = {
  render: () => (
    <div className="el-flex el-flex-row el-flex-wrap">
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        1
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        2
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        3
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        4
      </GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-wrap',
}

export const FlexNoWrap = {
  render: () => (
    <div className="el-flex el-flex-row el-flex-no-wrap">
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        1
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        2
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        3
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        4
      </GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-no-wrap',
}

export const FlexWrapReverse = {
  render: () => (
    <div className="el-flex el-flex-row el-flex-wrap-reverse">
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        1
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        2
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        3
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        4
      </GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-wrap-reverse',
}

export const Flex1 = {
  render: () => (
    <div className="el-flex el-flex-row">
      <GridDemoBlockWithMargin className="el-flex1">1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="el-flex1">4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex1',
}

export const FlexAuto = {
  render: () => (
    <div className="el-flex el-flex-row">
      <GridDemoBlockWithMargin className="el-flex-auto">1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-auto',
}

export const FlexInitial = {
  render: () => (
    <div className="el-flex el-flex-row el-flex-initial">
      <GridDemoBlockWithMargin className="el-flex-initial">1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-initial',
}

export const FlexGrow = {
  render: () => (
    <div className="el-flex el-flex-row">
      <GridDemoBlockWithMargin className="el-flex-grow">1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-grow',
}

export const FlexGrow0 = {
  render: () => (
    <div className="el-flex el-flex-row">
      <GridDemoBlockWithMargin className="">1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="el-flex-grow0">2</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-grow0',
}

export const FlexShrink = {
  render: () => (
    <div className="el-flex el-flex-row">
      <GridDemoBlockWithMargin className="el-flex-shrink">1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="el-flex-grow">2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="el-flex-grow">3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="el-flex-grow">4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-shrink',
}

export const FlexShrink0 = {
  render: () => (
    <div className="el-flex el-flex-row">
      <GridDemoBlockWithMargin className="el-flex-shrink0">1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="el-flex-grow">2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="el-flex-grow">3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="el-flex-grow">4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-shrink0',
}

export const FlexJustifyCenter = {
  render: () => (
    <div className="el-flex el-flex-row el-flex-justify-center">
      <GridDemoBlockWithMargin className="">1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="">2</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-justify-center',
}

export const FlexJustifyStart = {
  render: () => (
    <div className="el-flex el-flex-row el-flex-justify-start">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-justify-start',
}

export const FlexJustifyEnd = {
  render: () => (
    <div className="el-flex el-flex-row el-flex-justify-end">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-justify-end',
}

export const FlexJustifyBetween = {
  render: () => (
    <div className="el-flex el-flex-row el-flex-justify-between">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-justify-between',
}

export const FlexJustifyAround = {
  render: () => (
    <div className="el-flex el-flex-row el-flex-justify-around">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-justify-around',
}

export const FlexJustifyEvenly = {
  render: () => (
    <div className="el-flex el-flex-row el-flex-justify-evenly">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-justify-evenly',
}

export const FlexAlignCenter = {
  render: () => (
    <div className="el-flex el-flex-column el-flex-align-center">
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        1
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        2
      </GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-align-center',
}

export const FlexAlignStart = {
  render: () => (
    <div className="el-flex el-flex-column el-flex-align-start">
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        1
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        2
      </GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-align-start',
}

export const FlexAlignEnd = {
  render: () => (
    <div className="el-flex el-flex-column el-flex-align-end">
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        1
      </GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin
        style={{
          width: '300px',
        }}
      >
        2
      </GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-align-end',
}

export const FlexAlignSelfCenter = {
  render: () => (
    <div className="el-flex el-flex-column el-flex-align-end">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="el-flex-align-self-center">3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-align-self-center',
}

export const FlexAlignSelfStart = {
  render: () => (
    <div className="el-flex el-flex-column el-flex-align-end">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="el-flex-align-self-start">3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-align-self-start',
}

export const FlexAlignSelfEnd = {
  render: () => (
    <div className="el-flex el-flex-column el-flex-align-start">
      <GridDemoBlockWithMargin>1</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>2</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin className="el-flex-align-self-end">3</GridDemoBlockWithMargin>
      <GridDemoBlockWithMargin>4</GridDemoBlockWithMargin>
    </div>
  ),

  name: 'flex-align-self-end',
}
