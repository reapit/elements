import preview from "#.storybook/preview";
import { ContactIcon } from "#src/icons/contact";
import { PropertyIcon } from "#src/icons/property";

import { elMb5 } from "../../styles/deprecated-spacing";
import { DeprecatedAvatar } from "../avatar";
import { elCardFocussed, elCardSubHeadingWrapAvatar } from "./__styles__";
import {
  CardWrap,
  CardHeading,
  CardSubHeading,
  CardSubHeadingAdditional,
  CardHeadingWrap,
  CardBodyWrap,
  CardListHeading,
  CardListSubHeading,
  CardListItem,
  CardListIcon,
  CardListItemTextWrap,
  CardListItemTextPrimary,
  CardListItemTextSecondary,
  CardMainWrap,
  CardListMainWrap,
} from "./card";
import { Card } from "./card-components";

const meta = preview.meta({
  title: "Deprecated/Card",
  component: Card,
});

export default meta;

export const CardWithAvatar = meta.story({
  render: () => (
    <CardWrap>
      <CardMainWrap>
        <DeprecatedAvatar src="https://picsum.photos/200" />
        <CardHeadingWrap className={elCardSubHeadingWrapAvatar}>
          <CardHeading>Main Heading</CardHeading>
          <CardSubHeading>Sub Heading</CardSubHeading>
          <CardSubHeadingAdditional>Sub Heading Additional</CardSubHeadingAdditional>
        </CardHeadingWrap>
      </CardMainWrap>
    </CardWrap>
  ),
});

export const CardWithImage = meta.story({
  render: () => (
    <CardWrap>
      <CardMainWrap>
        <DeprecatedAvatar type="image" src="https://picsum.photos/200/300" />
        <CardHeadingWrap>
          <CardHeading>Main Heading</CardHeading>
          <CardSubHeading>Sub Heading</CardSubHeading>
          <CardSubHeadingAdditional>Sub Heading Additional</CardSubHeadingAdditional>
        </CardHeadingWrap>
      </CardMainWrap>
    </CardWrap>
  ),
});

export const CardWithBody = meta.story({
  render: () => (
    <CardWrap>
      <CardMainWrap>
        <CardHeadingWrap>
          <CardHeading>Main Heading</CardHeading>
          <CardSubHeading>Sub Heading</CardSubHeading>
          <CardSubHeadingAdditional>Sub Heading Additional</CardSubHeadingAdditional>
        </CardHeadingWrap>
      </CardMainWrap>
      <CardBodyWrap>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </CardBodyWrap>
    </CardWrap>
  ),
});

export const CardFocussed = meta.story({
  render: () => (
    <CardWrap className={elCardFocussed}>
      <CardMainWrap>
        <DeprecatedAvatar type="image" src="https://picsum.photos/200/300" />
        <CardHeadingWrap>
          <CardHeading>Main Heading</CardHeading>
          <CardSubHeading>Sub Heading</CardSubHeading>
          <CardSubHeadingAdditional>Sub Heading Additional</CardSubHeadingAdditional>
        </CardHeadingWrap>
      </CardMainWrap>
      <CardBodyWrap>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </CardBodyWrap>
    </CardWrap>
  ),
});

export const CardWithList = meta.story({
  render: () => (
    <CardWrap>
      <CardListMainWrap>
        <CardListHeading>Secondary Heading</CardListHeading>
        <CardListSubHeading>Secondary Sub Heading</CardListSubHeading>
      </CardListMainWrap>
      <CardListItem>
        <CardListIcon>
          <PropertyIcon color="action" />
        </CardListIcon>
        <CardListItemTextWrap>
          <CardListItemTextPrimary>Item Title</CardListItemTextPrimary>
          <CardListItemTextSecondary>Item Details</CardListItemTextSecondary>
        </CardListItemTextWrap>
      </CardListItem>
      <CardListItem>
        <CardListIcon>
          <ContactIcon color="action" />
        </CardListIcon>
        <CardListItemTextWrap>
          <CardListItemTextPrimary>Item Title</CardListItemTextPrimary>
          <CardListItemTextSecondary>Item Details</CardListItemTextSecondary>
        </CardListItemTextWrap>
      </CardListItem>
    </CardWrap>
  ),
});

export const CardCompleteExample = meta.story({
  render: () => (
    <CardWrap>
      <CardMainWrap>
        <DeprecatedAvatar type="image" src="https://picsum.photos/200/300" />
        <CardHeadingWrap>
          <CardHeading>Main Heading</CardHeading>
          <CardSubHeading>Sub Heading</CardSubHeading>
          <CardSubHeadingAdditional>Sub Heading Additional</CardSubHeadingAdditional>
        </CardHeadingWrap>
      </CardMainWrap>
      <CardBodyWrap className={elMb5}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </CardBodyWrap>
      <CardListMainWrap>
        <CardListHeading>Secondary Heading</CardListHeading>
        <CardListSubHeading>Secondary Sub Heading</CardListSubHeading>
      </CardListMainWrap>
      <CardListItem>
        <CardListIcon>
          <PropertyIcon color="action" />
        </CardListIcon>
        <CardListItemTextWrap>
          <CardListItemTextPrimary>Item Title</CardListItemTextPrimary>
          <CardListItemTextSecondary>Item Details</CardListItemTextSecondary>
        </CardListItemTextWrap>
      </CardListItem>
      <CardListItem>
        <CardListIcon>
          <ContactIcon color="action" />
        </CardListIcon>
        <CardListItemTextWrap>
          <CardListItemTextPrimary>Item Title</CardListItemTextPrimary>
          <CardListItemTextSecondary>Item Details</CardListItemTextSecondary>
        </CardListItemTextWrap>
      </CardListItem>
    </CardWrap>
  ),
});

export const ReactShorthandAvatarBody = meta.story({
  render: () => (
    <Card
      hasMainCard
      hasListCard
      mainCardHeading="Main Heading"
      mainCardSubHeading="Main Subheading"
      mainCardSubHeadingAdditional="Main Subheading Additional"
      mainCardBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      mainCardAvatarUrl="https://picsum.photos/200/200"
    />
  ),

  name: "React Shorthand Avatar & Body",
});

export const ReactShorthandList = meta.story({
  render: () => (
    <Card
      hasListCard
      listCardHeading="List Card Heading"
      listCardSubHeading="List Card Sub Heading"
      listCardItems={[
        {
          listCardItemHeading: "Applicant",
          listCardItemSubHeading: "Bob Smith",
          listCardItemIcon: "contact",
          onClick: () => console.log("Clicking"),
        },
        {
          listCardItemHeading: "Property",
          listCardItemSubHeading: "Some Address",
          listCardItemIcon: "property",
          onClick: () => console.log("Clicking"),
        },
      ]}
    />
  ),
});

export const ReactShorthandComplete = meta.story({
  render: () => (
    <Card
      hasMainCard
      hasListCard
      mainCardHeading="Main Heading"
      mainCardSubHeading="Main Subheading"
      mainCardSubHeadingAdditional="Main Subheading Additional"
      mainCardBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      mainCardImgUrl="https://picsum.photos/200/300"
      listCardHeading="List Card Heading"
      listCardSubHeading="List Card Sub Heading"
      listCardItems={[
        {
          listCardItemHeading: "Applicant",
          listCardItemSubHeading: "Bob Smith",
          listCardItemIcon: "contact",
          onClick: () => console.log("Clicking"),
        },
        {
          listCardItemHeading: "Property",
          listCardItemSubHeading: "Some Address",
          listCardItemIcon: "property",
          onClick: () => console.log("Clicking"),
        },
      ]}
    />
  ),
});
