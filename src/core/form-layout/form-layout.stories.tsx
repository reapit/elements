import preview from "#.storybook/preview";
import { Button } from "#src/core/button";
import { ButtonGroup } from "#src/core/button-group";
import { Divider } from "#src/core/divider";
import { TextControl } from "#src/core/text-control";

import { FormLayout } from "./form-layout";

const meta = preview.meta({
  title: "Containers and layout/FormLayout",
  component: FormLayout,
  argTypes: {
    children: {
      control: "radio",
      options: ["Default", "Header only", "With footer", "No header"],
      mapping: {
        Default: (
          <>
            <FormLayout.Header>
              <FormLayout.Title>Contact details</FormLayout.Title>
              <FormLayout.Description>
                Add the primary contact information for this record.
              </FormLayout.Description>
            </FormLayout.Header>
            <FormLayout.Section>
              <FormLayout.SectionHeader>
                <FormLayout.SectionTitle>Personal details</FormLayout.SectionTitle>
              </FormLayout.SectionHeader>
              <TextControl label="First name" />
              <TextControl label="Last name" />
            </FormLayout.Section>
            <Divider />
            <FormLayout.Section>
              <FormLayout.SectionHeader>
                <FormLayout.SectionTitle>Contact information</FormLayout.SectionTitle>
              </FormLayout.SectionHeader>
              <TextControl label="Email address" type="email" />
              <TextControl label="Phone number" type="tel" />
            </FormLayout.Section>
          </>
        ),
        "Header only": (
          <>
            <FormLayout.Header>
              <FormLayout.Title>Edit property</FormLayout.Title>
              <FormLayout.Description>
                Update the details for this property listing.
              </FormLayout.Description>
            </FormLayout.Header>
            <FormLayout.Section>
              <FormLayout.SectionHeader>
                <FormLayout.SectionTitle>Property details</FormLayout.SectionTitle>
              </FormLayout.SectionHeader>
              <TextControl label="Address line 1" />
              <TextControl label="City" />
              <TextControl label="Postcode" />
            </FormLayout.Section>
          </>
        ),
        "With footer": (
          <>
            <FormLayout.Header>
              <FormLayout.Title>Create tenancy</FormLayout.Title>
              <FormLayout.Description>
                Complete the details below to set up a new tenancy agreement.
              </FormLayout.Description>
            </FormLayout.Header>
            <FormLayout.Section>
              <FormLayout.SectionHeader>
                <FormLayout.SectionTitle>Tenant details</FormLayout.SectionTitle>
              </FormLayout.SectionHeader>
              <TextControl label="First name" />
              <TextControl label="Last name" />
              <TextControl label="Email address" type="email" />
            </FormLayout.Section>
            <Divider />
            <FormLayout.Section>
              <FormLayout.SectionHeader>
                <FormLayout.SectionTitle>Property details</FormLayout.SectionTitle>
              </FormLayout.SectionHeader>
              <TextControl label="Address line 1" />
              <TextControl label="City" />
            </FormLayout.Section>
            <FormLayout.Footer>
              <ButtonGroup>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Create tenancy</Button>
              </ButtonGroup>
            </FormLayout.Footer>
          </>
        ),
        "No header": (
          <>
            <FormLayout.Section>
              <FormLayout.SectionHeader>
                <FormLayout.SectionTitle>Account details</FormLayout.SectionTitle>
              </FormLayout.SectionHeader>
              <TextControl label="Email address" type="email" />
              <TextControl label="Job title" />
            </FormLayout.Section>
            <FormLayout.Footer>
              <ButtonGroup>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Save</Button>
              </ButtonGroup>
            </FormLayout.Footer>
          </>
        ),
      },
    },
  },
});

export const Example = meta.story({
  args: {
    children: "Default",
  },
});
