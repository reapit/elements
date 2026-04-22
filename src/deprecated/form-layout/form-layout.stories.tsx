import preview from '#.storybook/preview'
import { FormLayout, InputWrap, InputWrapMed, InputWrapFull, InputWrapSmall, FormSectionDivider } from './form-layout'
import { Textarea } from '../../core/textarea'
import { TextInput } from '../../core/text-input'
import { MultiSelectInput } from '../../deprecated/multi-select'
import { Button } from '../../core/button'
import { ButtonGroup } from '../../core/button-group'
import { DeprecatedSelect } from '../../deprecated/select'
import { TextBase, TextSM } from '../../deprecated/typography'

const meta = preview.meta({
  title: 'Deprecated/FormLayout',
  component: FormLayout,
})

export const BasicForm = meta.story({
  render: () => (
    <form>
      <TextBase hasMargin hasBoldText>
        Basic Form
      </TextBase>
      <TextSM hasGreyText hasMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </TextSM>
      <FormLayout hasMargin>
        <InputWrap>
          <TextInput placeholder="Address" />
        </InputWrap>
        <InputWrap>
          <TextInput type="tel" placeholder="Phone" />
        </InputWrap>
        <InputWrap>
          <TextInput type="date" placeholder="Date of Birth" />
        </InputWrap>
        <InputWrap>
          <TextInput type="email" placeholder="Email" />
        </InputWrap>
        <InputWrapSmall>
          <input type="checkbox" aria-label="Status" />
        </InputWrapSmall>
        <InputWrapFull>
          <Textarea fieldSizing="content" placeholder="A placeholder" />
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup>
        <Button>Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ButtonGroup>
    </form>
  ),
})

export const ComplexForm = meta.story({
  render: () => (
    <form>
      <TextBase hasMargin hasBoldText>
        Complex Form
      </TextBase>
      <TextSM hasGreyText hasMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </TextSM>
      <FormLayout hasMargin>
        <InputWrap>
          <TextInput placeholder="Address" />
        </InputWrap>
        <InputWrap>
          <TextInput type="tel" placeholder="Phone" />
        </InputWrap>
        <InputWrap>
          <TextInput type="date" placeholder="Date of Birth" />
        </InputWrap>
        <InputWrap>
          <label htmlFor="select-option">Select Option</label>
          <DeprecatedSelect id="select-option">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </DeprecatedSelect>
        </InputWrap>
        <InputWrapSmall>
          <input type="checkbox" aria-label="Status" />
        </InputWrapSmall>
        <InputWrapFull>
          <Textarea fieldSizing="content" placeholder="A placeholder" />
        </InputWrapFull>
      </FormLayout>
      <FormSectionDivider />
      <TextBase hasMargin hasBoldText>
        Sub Form
      </TextBase>
      <TextSM hasGreyText hasMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </TextSM>
      <FormLayout hasMargin>
        <InputWrapMed>
          <TextInput placeholder="Really Long Address" />
        </InputWrapMed>
        <InputWrapFull>
          <label htmlFor="react-example">Select Items</label>
          <MultiSelectInput
            id="react-example"
            options={[
              {
                name: 'Item one',
                value: 'item-one',
              },
              {
                name: 'Item two',
                value: 'item-two',
              },
              {
                name: 'Item three',
                value: 'item-three',
              },
            ]}
            defaultValues={['item-one']}
          />
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup>
        <Button>Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ButtonGroup>
    </form>
  ),
})
