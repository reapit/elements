import type { Meta, StoryObj } from '@storybook/react'
import { EmptyData } from './empty-data'

const meta: Meta<typeof EmptyData> = {
  title: 'Components/Empty Data',
}

export default meta
type Story = StoryObj<typeof EmptyData>

/**
 * The EmptyData component is designed to emphasize that current section of the page
 * has empty data, but could possibly have different content when there is data available.
 * The default variant renders a circle with children.
 *
 * There are three variants available for the EmptyData component:
 * Default (full version), Description Only, and Action Only.
 * See the examples below for more details of the usage.
 */
export const Default: Story = {
  render() {
    return (
      <EmptyData>
        <EmptyData.Description>No things found</EmptyData.Description>
        <EmptyData.SecondaryDescription>Secondary text</EmptyData.SecondaryDescription>
        <EmptyData.ActionButton onClick={console.log}>Add Thing</EmptyData.ActionButton>
      </EmptyData>
    )
  },
}

export const DescriptionOnly: Story = {
  render() {
    return (
      <EmptyData>
        <EmptyData.Description>No things found</EmptyData.Description>
        <EmptyData.SecondaryDescription>Secondary text</EmptyData.SecondaryDescription>
      </EmptyData>
    )
  },
}
export const ActionOnly: Story = {
  render() {
    return (
      <EmptyData>
        <EmptyData.ActionButton onClick={console.log}>Action</EmptyData.ActionButton>
      </EmptyData>
    )
  },
}
