import { cx } from '@linaria/core'
import { GridDemoBlockFeatured, GridDemoBlockSizing, GridDemoBorders } from '../storybook/demo-block'
import { elM6, elMb6, elP6, elPb6 } from './spacing'
import { elH6, elHScreen, elW6, elWScreen } from './sizing'
import { elBorderBlue, elBorderGrey, elBorderGreyL, elBorderRadius, elBorderRadiusR, elBoxShadow } from './borders'

export default {
  title: 'Utilities',
}

export const Margin = {
  render: ({}) => (
    <>
      <GridDemoBlockFeatured className={cx(elMb6)}>elM6, el-mb6</GridDemoBlockFeatured>
      <GridDemoBlockFeatured className={cx(elM6)}>elM6, el-m6</GridDemoBlockFeatured>
    </>
  ),
}

export const Padding = {
  render: ({}) => (
    <>
      <GridDemoBlockFeatured className={cx(elPb6)}>elPb6, el-pb6</GridDemoBlockFeatured>
      <GridDemoBlockFeatured className={cx(elP6)}>elP6, el-p6</GridDemoBlockFeatured>
    </>
  ),
}

export const HeightAndWidth = {
  render: ({}) => (
    <>
      <GridDemoBlockSizing className={cx(elW6, elH6)}>elW6 elH6, el-w6 el-h6</GridDemoBlockSizing>
      <GridDemoBlockSizing className={cx(elWScreen, elHScreen)}>
        elWScreen elHScreen, el-w-screen el-h-screen
      </GridDemoBlockSizing>
    </>
  ),
}

export const BorderRadiusAndBoxShadow = {
  render: ({}) => (
    <>
      <GridDemoBorders className={elBorderGrey}>elBorderGrey, el-border-grey</GridDemoBorders>
      <GridDemoBorders className={elBorderBlue}>elBorderBlue, el-border-blue</GridDemoBorders>
      <GridDemoBorders className={elBorderGreyL}>elBorderGreyL, el-border-grey-l</GridDemoBorders>
      <GridDemoBorders className={cx(elBorderRadius, elBorderBlue)}>
        elBorderRadius elBorderBlue, el-border-radius el-border-blue
      </GridDemoBorders>
      <GridDemoBorders className={cx(elBorderRadiusR, elBorderGrey)}>
        elBorderRadiusR elBorderGrey, el-border-radius-r el-border-grey
      </GridDemoBorders>
      <GridDemoBorders className={elBoxShadow}>elBoxShadow, el-box-shadow</GridDemoBorders>
    </>
  ),
}
