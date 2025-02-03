import { ElLabelText, LabelText } from './index'

export default {
  title: 'Components/LabelText',
  component: ElLabelText,
}

export const BasicUsage = {
  render: ({ }) => (
    <>
      <LabelText>I&apos;m a label for a form input or something else</LabelText>
      <LabelText>example labeltext default</LabelText>
      <br />
      <LabelText size="small">example labeltext strong small</LabelText>
      <br />
      <LabelText variant="strong" size="medium">
        example labeltext strong medium
      </LabelText>
      <br />
      <LabelText variant="soft" size="small">
        example labeltext soft small
      </LabelText>
      <br />
      <LabelText variant="soft" isRequired>
        example labeltext soft isRequired
      </LabelText>
    </>
  ),
}
