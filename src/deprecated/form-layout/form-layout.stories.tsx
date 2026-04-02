import { InputGroup } from '../../deprecated/input-group'
import { FormLayout, InputWrap, InputWrapMed, InputWrapFull, InputWrapSmall, FormSectionDivider } from './form-layout'
import { Textarea } from '../../core/textarea'
import { MultiSelectInput } from '../../deprecated/multi-select'
import { Button } from '../../core/button'
import { ButtonGroup } from '../../core/button-group'
import { DeprecatedSelect } from '../../deprecated/select'
import { TextBase, TextSM } from '../../deprecated/typography'
import { ElInputGroupLabel } from '../input-group/__styles__'

export default {
  title: 'Deprecated/FormLayout',
  component: FormLayout,
}

export const BasicForm = {
  render: ({}) => (
    <form>
      <TextBase hasMargin hasBoldText>
        Basic Form
      </TextBase>
      <TextSM hasGreyText hasMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </TextSM>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup icon="property" label="Address" type="text" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="phone" label="Phone" type="number" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="calendar" label="Date of Birth" type="date" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="email" label="Email" type="text" />
        </InputWrap>
        <InputWrapSmall>
          <InputGroup type="checkbox" label="Status" />
        </InputWrapSmall>
        <InputWrapFull>
          <InputGroup>
            <Textarea fieldSizing="content" placeholder="A placeholder" />
            <ElInputGroupLabel>Long Description</ElInputGroupLabel>
          </InputGroup>
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup>
        <Button>Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ButtonGroup>
    </form>
  ),
}

export const ComplexForm = {
  render: ({}) => (
    <form>
      <TextBase hasMargin hasBoldText>
        Complex Form
      </TextBase>
      <TextSM hasGreyText hasMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </TextSM>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup icon="property" label="Address" type="text" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="phone" label="Phone" type="number" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="calendar" label="Date of Birth" type="date" />
        </InputWrap>
        <InputWrap>
          <InputGroup>
            <ElInputGroupLabel>Select Option</ElInputGroupLabel>
            <DeprecatedSelect>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </DeprecatedSelect>
          </InputGroup>
        </InputWrap>
        <InputWrapSmall>
          <InputGroup type="checkbox" label="Status" />
        </InputWrapSmall>
        <InputWrapFull>
          <InputGroup>
            <Textarea fieldSizing="content" placeholder="A placeholder" />
            <ElInputGroupLabel>Long Description</ElInputGroupLabel>
          </InputGroup>
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
          <InputGroup icon="property" label="Really Long Address" type="text" />
        </InputWrapMed>
        <InputWrapFull>
          <InputGroup>
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
            <ElInputGroupLabel>Select Items</ElInputGroupLabel>
          </InputGroup>
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup>
        <Button>Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ButtonGroup>
    </form>
  ),
}
