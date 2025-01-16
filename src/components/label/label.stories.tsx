import { Label } from './index'

export default {
  title: 'Components/Label',
  component: Label,
}

export const BasicUsage = {
  render: ({}) => (
    <>
      <Label>example label default</Label>
      <br />
      <Label size="small">example label strong small</Label>
      <br />
      <Label variant="strong" size="medium">
        example label strong medium
      </Label>
      <br />
      <Label variant="soft" size="small">
        example label soft small
      </Label>
      <br />
      <Label variant="soft" isRequired>
        example label soft required
      </Label>
    </>
  ),
}
