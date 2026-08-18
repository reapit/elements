import preview from "#.storybook/preview";
import { Button } from "#src/core/button";
import { ButtonGroup } from "#src/core/button-group";

import { FormLayout } from "../form-layout";

const meta = preview.meta({
  title: "Containers and layout/FormLayout/Footer",
  component: FormLayout.Footer,
  parameters: {
    docs: { source: { type: "code" } },
  },
});

export const Example = meta.story({
  render: function Example() {
    return (
      <FormLayout.Footer>
        <ButtonGroup>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </ButtonGroup>
      </FormLayout.Footer>
    );
  },
});
