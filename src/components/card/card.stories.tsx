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
} from './card'
import { elCardFocussed, elCardSubHeadingWrapAvatar } from './__styles__'
import { Icon } from '../icon'
import { elMb5 } from '../../styles/spacing'
import { Card } from './card-components'
import { MediaStateProvider } from '../../hooks/use-media-query'
import { Avatar } from '../avatar'

export default {
  title: 'Card',
  component: Card,
}

export const CardWithAvatar = {
  render: ({}) => (
    <CardWrap>
      <CardMainWrap>
        <Avatar src="https://picsum.photos/200" />
        <CardHeadingWrap className={elCardSubHeadingWrapAvatar}>
          <CardHeading>Main Heading</CardHeading>
          <CardSubHeading>Sub Heading</CardSubHeading>
          <CardSubHeadingAdditional>Sub Heading Additional</CardSubHeadingAdditional>
        </CardHeadingWrap>
      </CardMainWrap>
    </CardWrap>
  ),
}

export const CardWithImage = {
  render: ({}) => (
    <CardWrap>
      <CardMainWrap>
        <Avatar type="image" src="https://picsum.photos/200/300" />
        <CardHeadingWrap>
          <CardHeading>Main Heading</CardHeading>
          <CardSubHeading>Sub Heading</CardSubHeading>
          <CardSubHeadingAdditional>Sub Heading Additional</CardSubHeadingAdditional>
        </CardHeadingWrap>
      </CardMainWrap>
    </CardWrap>
  ),
}

export const CardWithBody = {
  render: ({}) => (
    <CardWrap>
      <CardMainWrap>
        <CardHeadingWrap>
          <CardHeading>Main Heading</CardHeading>
          <CardSubHeading>Sub Heading</CardSubHeading>
          <CardSubHeadingAdditional>Sub Heading Additional</CardSubHeadingAdditional>
        </CardHeadingWrap>
      </CardMainWrap>
      <CardBodyWrap>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
      </CardBodyWrap>
    </CardWrap>
  ),
}

export const CardFocussed = {
  render: ({}) => (
    <CardWrap className={elCardFocussed}>
      <CardMainWrap>
        <Avatar type="image" src="https://picsum.photos/200/300" />
        <CardHeadingWrap>
          <CardHeading>Main Heading</CardHeading>
          <CardSubHeading>Sub Heading</CardSubHeading>
          <CardSubHeadingAdditional>Sub Heading Additional</CardSubHeadingAdditional>
        </CardHeadingWrap>
      </CardMainWrap>
      <CardBodyWrap>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
      </CardBodyWrap>
    </CardWrap>
  ),
}

export const CardWithList = {
  render: ({}) => (
    <CardWrap>
      <CardListMainWrap>
        <CardListHeading>Secondary Heading</CardListHeading>
        <CardListSubHeading>Secondary Sub Heading</CardListSubHeading>
      </CardListMainWrap>
      <CardListItem>
        <CardListIcon>
          <Icon intent="primary" icon="property" />
        </CardListIcon>
        <CardListItemTextWrap>
          <CardListItemTextPrimary>Item Title</CardListItemTextPrimary>
          <CardListItemTextSecondary>Item Details</CardListItemTextSecondary>
        </CardListItemTextWrap>
      </CardListItem>
      <CardListItem>
        <CardListIcon>
          <Icon intent="primary" icon="contact" />
        </CardListIcon>
        <CardListItemTextWrap>
          <CardListItemTextPrimary>Item Title</CardListItemTextPrimary>
          <CardListItemTextSecondary>Item Details</CardListItemTextSecondary>
        </CardListItemTextWrap>
      </CardListItem>
    </CardWrap>
  ),
}

export const CardCompleteExample = {
  render: ({}) => (
    <CardWrap>
      <CardMainWrap>
        <Avatar type="image" src="https://picsum.photos/200/300" />
        <CardHeadingWrap>
          <CardHeading>Main Heading</CardHeading>
          <CardSubHeading>Sub Heading</CardSubHeading>
          <CardSubHeadingAdditional>Sub Heading Additional</CardSubHeadingAdditional>
        </CardHeadingWrap>
      </CardMainWrap>
      <CardBodyWrap className={elMb5}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
      </CardBodyWrap>
      <CardListMainWrap>
        <CardListHeading>Secondary Heading</CardListHeading>
        <CardListSubHeading>Secondary Sub Heading</CardListSubHeading>
      </CardListMainWrap>
      <CardListItem>
        <CardListIcon>
          <Icon intent="primary" icon="property" />
        </CardListIcon>
        <CardListItemTextWrap>
          <CardListItemTextPrimary>Item Title</CardListItemTextPrimary>
          <CardListItemTextSecondary>Item Details</CardListItemTextSecondary>
        </CardListItemTextWrap>
      </CardListItem>
      <CardListItem>
        <CardListIcon>
          <Icon intent="primary" icon="contact" />
        </CardListIcon>
        <CardListItemTextWrap>
          <CardListItemTextPrimary>Item Title</CardListItemTextPrimary>
          <CardListItemTextSecondary>Item Details</CardListItemTextSecondary>
        </CardListItemTextWrap>
      </CardListItem>
    </CardWrap>
  ),
}

export const ReactShorthandAvatarBody = {
  render: ({}) => (
    <MediaStateProvider>
      <Card
        hasMainCard
        hasListCard
        mainCardHeading="Main Heading"
        mainCardSubHeading="Main Subheading"
        mainCardSubHeadingAdditional="Main Subheading Additional"
        mainCardBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        mainCardAvatarUrl="https://picsum.photos/200/200"
      />
    </MediaStateProvider>
  ),

  name: 'React Shorthand Avatar & Body',
}

export const ReactShorthandList = {
  render: ({}) => (
    <MediaStateProvider>
      <Card
        hasListCard
        listCardHeading="List Card Heading"
        listCardSubHeading="List Card Sub Heading"
        listCardItems={[
          {
            listCardItemHeading: 'Applicant',
            listCardItemSubHeading: 'Bob Smith',
            listCardItemIcon: 'contact',
            onClick: () => console.log('Clicking'),
          },
          {
            listCardItemHeading: 'Property',
            listCardItemSubHeading: 'Some Address',
            listCardItemIcon: 'property',
            onClick: () => console.log('Clicking'),
          },
        ]}
      />
    </MediaStateProvider>
  ),
}

export const ReactShorthandComplete = {
  render: ({}) => (
    <MediaStateProvider>
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
            listCardItemHeading: 'Applicant',
            listCardItemSubHeading: 'Bob Smith',
            listCardItemIcon: 'contact',
            onClick: () => console.log('Clicking'),
          },
          {
            listCardItemHeading: 'Property',
            listCardItemSubHeading: 'Some Address',
            listCardItemIcon: 'property',
            onClick: () => console.log('Clicking'),
          },
        ]}
      />
    </MediaStateProvider>
  ),
}
