import preview from "#.storybook/preview";
import { Button } from "#src/core/button";
import { ButtonGroup } from "#src/core/button-group";
import { Card } from "#src/core/card";
import { CheckboxControl } from "#src/core/checkbox-control";
import { CurrencyControl } from "#src/core/currency-control";
import { DateTimeControl } from "#src/core/date-time-control";
import { Divider } from "#src/core/divider";
import { FocusedLayout } from "#src/core/focused-layout";
import { FormLayout } from "#src/core/form-layout";
import { MainContainer } from "#src/core/main-container";
import { SelectNativeControl } from "#src/core/select-native-control";
import { TextControl } from "#src/core/text-control";
import { TextareaControl } from "#src/core/textarea-control";
import { ArrowLeftIcon } from "#src/icons/arrow-left";
import { CloseIcon } from "#src/icons/close";
import { isWidthAtOrAbove } from "#src/utils/breakpoints";
import { Flex } from "#src/utils/flex";
import { Heading } from "#src/utils/heading";
import { useMatchMedia } from "#src/utils/match-media";
import { Text } from "#src/utils/text";

const meta = preview.meta({
  title: "Blocks/CreateManagementAgreement",
  parameters: {
    layout: "fullscreen",
  },
});

/**
 * A focused flow for creating a management agreement within an ownership.
 *
 * Demonstrates a `FocusedLayout` with a dark background and a multi-step top bar (cancel, back,
 * and save actions), a step indicator, heading, and description, and a long-form card made up of
 * `FormLayout` sections divided by `Divider`. Each section groups related fields, using a mix of
 * date, text, select, textarea, and checkbox controls to show how form fields of different widths
 * compose within a shared row.
 *
 * On smaller breakpoints (XS/SM), the multi-step navigation buttons move to a sticky bottom bar
 * and the top bar shows a single close action, following the standard `FocusedLayout` multi-step
 * pattern.
 */
export const Example = meta.story({
  render: () => {
    const isWidthAtOrAboveMD = useMatchMedia(isWidthAtOrAbove("MD"));

    return (
      <FocusedLayout background="dark" id="create-management-agreement">
        <FocusedLayout.TopBar
          logo={<FocusedLayout.ProductLogo product="Reapit PM" />}
          title="Change Ownership"
        >
          {isWidthAtOrAboveMD ? (
            <ButtonGroup>
              <Button size="medium" variant="secondary">
                Cancel
              </Button>
              <Button iconLeft={<ArrowLeftIcon />} size="medium" variant="secondary">
                Back
              </Button>
              <Button size="medium" variant="primary">
                Save &amp; exit
              </Button>
            </ButtonGroup>
          ) : (
            <Button aria-label="Cancel" iconLeft={<CloseIcon />} size="large" variant="tertiary" />
          )}
        </FocusedLayout.TopBar>

        <FocusedLayout.Content isFullBleed>
          <MainContainer size="narrow">
            <Flex direction="column" gap="--spacing-10">
              <Flex direction="column" gap="--spacing-3">
                <Flex direction="column" gap="--spacing-1">
                  <Text colour="secondary" font="text-base/regular">
                    Step 3 of 3
                  </Text>
                  <Heading as="h1" font="text-2xl/bold">
                    Create Management Agreement
                  </Heading>
                </Flex>
                <Text font="text-base/regular">
                  This agreement will sit inside the ownership. It will adopt the owner contact and
                  payment details and contribute to shared funds for bill transfers and processing.
                </Text>
              </Flex>

              <Card padding="--spacing-8">
                <FormLayout>
                  <FormLayout.Section>
                    <FormLayout.SectionHeader>
                      <FormLayout.SectionTitle>Details</FormLayout.SectionTitle>
                    </FormLayout.SectionHeader>
                    <Flex gap="--spacing-6">
                      <DateTimeControl
                        label="Start date"
                        name="startDate"
                        size="medium"
                        type="date"
                      />
                      <DateTimeControl
                        label="Expiry date"
                        name="expiryDate"
                        size="medium"
                        type="date"
                      />
                    </Flex>
                    <TextControl
                      label="Agreement reference"
                      name="agreementReference"
                      size="medium"
                    />
                  </FormLayout.Section>

                  <Divider />

                  <FormLayout.Section>
                    <FormLayout.SectionHeader>
                      <FormLayout.SectionTitle>Advertising</FormLayout.SectionTitle>
                    </FormLayout.SectionHeader>
                    <Flex gap="--spacing-6">
                      <SelectNativeControl label="Rent period" name="rentPeriod" size="medium">
                        <option value="weekly">Weekly</option>
                        <option value="fortnightly">Fortnightly</option>
                        <option value="monthly">Monthly</option>
                      </SelectNativeControl>
                      <CurrencyControl
                        currency="AUD"
                        label="Rent"
                        locale="en-AU"
                        name="rent"
                        size="medium"
                      />
                    </Flex>
                    <CurrencyControl
                      currency="AUD"
                      label="Bond"
                      locale="en-AU"
                      name="bond"
                      size="medium"
                    />
                  </FormLayout.Section>

                  <Divider />

                  <FormLayout.Section>
                    <FormLayout.SectionHeader>
                      <FormLayout.SectionTitle>Gained</FormLayout.SectionTitle>
                    </FormLayout.SectionHeader>
                    <Flex gap="--spacing-6">
                      <DateTimeControl
                        label="Gained date"
                        name="gainedDate"
                        size="medium"
                        type="date"
                      />
                      <SelectNativeControl label="Reason" name="gainedReason" size="medium">
                        <option value="">Select</option>
                        <option value="new-listing">New listing</option>
                        <option value="switched-agency">Switched agency</option>
                      </SelectNativeControl>
                    </Flex>
                    <TextareaControl
                      fieldSizing="content"
                      label="Details"
                      name="gainedDetails"
                      placeholder="Add details"
                      size="small"
                    />
                  </FormLayout.Section>

                  <Divider />

                  <FormLayout.Section>
                    <FormLayout.SectionHeader>
                      <FormLayout.SectionTitle>Maintenance</FormLayout.SectionTitle>
                    </FormLayout.SectionHeader>
                    <CurrencyControl
                      currency="AUD"
                      label="Spend limit"
                      locale="en-AU"
                      maxWidth="var(--size-40)"
                      name="spendLimit"
                      size="medium"
                    />
                    <TextareaControl
                      fieldSizing="content"
                      label="Instructions"
                      name="maintenanceInstructions"
                      placeholder="Add instructions"
                      size="small"
                    />
                  </FormLayout.Section>

                  <Divider />

                  <FormLayout.Section>
                    <FormLayout.SectionHeader>
                      <FormLayout.SectionTitle>Console Owner</FormLayout.SectionTitle>
                    </FormLayout.SectionHeader>
                    <CheckboxControl
                      label="Show owner documents in the Owner Portal"
                      name="showOwnerDocuments"
                      supplementaryInfo="Owner statements are always shared. This setting will also make inspection reports available to owners."
                    />
                  </FormLayout.Section>

                  <Divider />

                  <FormLayout.Section>
                    <FormLayout.SectionHeader>
                      <FormLayout.SectionTitle>Owner Portal</FormLayout.SectionTitle>
                    </FormLayout.SectionHeader>
                    <CheckboxControl
                      defaultChecked
                      label="Michael Borones"
                      name="ownerPortalInvite"
                      supplementaryInfo="Landlords that have received or accepted an invitation won't receive another one."
                    />
                  </FormLayout.Section>

                  <Divider />

                  <FormLayout.Section>
                    <FormLayout.SectionHeader>
                      <FormLayout.SectionTitle>Additional information</FormLayout.SectionTitle>
                    </FormLayout.SectionHeader>
                    <TextareaControl
                      fieldSizing="content"
                      label="Notes"
                      name="additionalNotes"
                      placeholder="Add optional notes"
                      size="small"
                    />
                  </FormLayout.Section>
                </FormLayout>
              </Card>
            </Flex>
          </MainContainer>
        </FocusedLayout.Content>

        {!isWidthAtOrAboveMD && (
          <FocusedLayout.BottomBar>
            <ButtonGroup>
              <Button iconLeft={<ArrowLeftIcon />} size="medium" variant="secondary">
                Back
              </Button>
              <Button size="medium" variant="primary">
                Save &amp; exit
              </Button>
            </ButtonGroup>
          </FocusedLayout.BottomBar>
        )}
      </FocusedLayout>
    );
  },
});
