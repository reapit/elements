import { InputGroup } from '../input-group'
import { FormLayout, InputWrap, InputWrapMed, InputWrapFull, InputWrapSmall, FormSectionDivider } from './form-layout'
import { Toggle, ToggleRadio, ElToggleItem } from '../toggle'
import { BodyText, SmallText } from '../typography'
import { TextArea } from '../textarea'
import { MultiSelectInput } from '../multi-select'
import { Button, ButtonGroup } from '../button'
import { Label } from '../label'

export default {
  title: 'FormLayout',
  component: FormLayout,
}

export const BasicForm = {
  render: ({}) => (
    <form>
      <BodyText hasBoldText>Basic Form</BodyText>
      <SmallText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </SmallText>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup icon="homeSystem" label="Address" type="text" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="phoneSystem" label="Phone" type="number" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="calendarSystem" label="Date of Birth" type="date" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="emailSystem" label="Email" type="text" />
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
            <TextArea type="text" placeholder="A placeholder" />
            <Label>Long Description</Label>
          </InputGroup>
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup alignment="left">
        <Button intent="neutral">Cancel</Button>
        <Button intent="primary">Submit</Button>
      </ButtonGroup>
    </form>
  ),
}

export const ComplexForm = {
  render: ({}) => (
    <form>
      <BodyText hasBoldText>Main Form</BodyText>
      <SmallText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </SmallText>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup icon="homeSystem" label="Address" type="text" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="phoneSystem" label="Phone" type="number" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="calendarSystem" label="Date of Birth" type="date" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="emailSystem" label="Email" type="text" />
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
            <TextArea type="text" placeholder="A placeholder" />
            <Label>Long Description</Label>
          </InputGroup>
        </InputWrapFull>
      </FormLayout>
      <FormSectionDivider />
      <BodyText hasBoldText>Sub Form</BodyText>
      <SmallText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </SmallText>
      <FormLayout hasMargin>
        <InputWrapMed>
          <InputGroup icon="homeSystem" label="Really Long Address" type="text" />
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
      <ButtonGroup alignment="left">
        <Button intent="neutral">Cancel</Button>
        <Button intent="primary">Submit</Button>
      </ButtonGroup>
    </form>
  ),
}
