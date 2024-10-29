import { InputGroup } from '../input-group'
import { FormLayout, InputWrap, InputWrapMed, InputWrapFull, InputWrapSmall, FormSectionDivider } from './form-layout'
import { Toggle, ToggleRadio, ElToggleItem } from '../toggle'
import { TextArea } from '../textarea'
import { MultiSelectInput } from '../multi-select'
import { Button, DeprecatedButtonGroup } from '../button'
import { Label } from '../label'
import { Select } from '../select'
import { TextBase, TextSM } from '../typography'

export default {
  title: 'FormLayout',
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
        <InputWrapSmall>
          <InputGroup>
            <Toggle id="my-cool-toggle">
              <ElToggleItem>On</ElToggleItem>
              <ElToggleItem>Off</ElToggleItem>
            </Toggle>
            <Label>Active</Label>
          </InputGroup>
        </InputWrapSmall>
        <InputWrap>
          <InputGroup>
            <ToggleRadio
              name="my-cool-toggle-radio"
              options={[
                {
                  id: 'option-1',
                  value: 'option-1',
                  text: 'Opt 1',
                  isChecked: true,
                },
                {
                  id: 'option-2',
                  value: 'option-2',
                  text: 'Opt 2',
                  isChecked: false,
                },
                {
                  id: 'option-3',
                  value: 'option-3',
                  text: 'Opt 3',
                  isChecked: false,
                },
              ]}
            />
            <Label>Options</Label>
          </InputGroup>
        </InputWrap>
        <InputWrapFull>
          <InputGroup>
            <TextArea fieldSizing="content" placeholder="A placeholder" />
            <Label>Long Description</Label>
          </InputGroup>
        </InputWrapFull>
      </FormLayout>
      <DeprecatedButtonGroup alignment="left">
        <Button>Cancel</Button>
        <Button variant="primary">Submit</Button>
      </DeprecatedButtonGroup>
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
            <Label>Select Option</Label>
            <Select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Select>
          </InputGroup>
        </InputWrap>
        <InputWrapSmall>
          <InputGroup type="checkbox" label="Status" />
        </InputWrapSmall>
        <InputWrapSmall>
          <InputGroup>
            <Toggle id="my-cool-toggle">
              <ElToggleItem>On</ElToggleItem>
              <ElToggleItem>Off</ElToggleItem>
            </Toggle>
            <Label>Active</Label>
          </InputGroup>
        </InputWrapSmall>
        <InputWrap>
          <InputGroup>
            <ToggleRadio
              name="my-cool-toggle-radio"
              options={[
                {
                  id: 'option-1',
                  value: 'option-1',
                  text: 'Opt 1',
                  isChecked: true,
                },
                {
                  id: 'option-2',
                  value: 'option-2',
                  text: 'Opt 2',
                  isChecked: false,
                },
                {
                  id: 'option-3',
                  value: 'option-3',
                  text: 'Opt 3',
                  isChecked: false,
                },
              ]}
            />
            <Label>Options</Label>
          </InputGroup>
        </InputWrap>
        <InputWrapFull>
          <InputGroup>
            <TextArea fieldSizing="content" placeholder="A placeholder" />
            <Label>Long Description</Label>
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
            <Label>Select Items</Label>
          </InputGroup>
        </InputWrapFull>
      </FormLayout>
      <DeprecatedButtonGroup alignment="left">
        <Button>Cancel</Button>
        <Button variant="primary">Submit</Button>
      </DeprecatedButtonGroup>
    </form>
  ),
}
