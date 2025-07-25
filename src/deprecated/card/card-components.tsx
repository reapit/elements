import { cx } from '@linaria/core'
import { Dispatch, FC, HTMLAttributes, SetStateAction, ReactNode } from 'react'
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
import { DeprecatedIcon, IconNames } from '../icon'
import { elMb5, elMt5 } from '../../styles/deprecated-spacing'
import { Intent } from '../../helpers/intent'
import { DeprecatedAvatar } from '../avatar'

/** @deprecated */
export interface CardListItemProps {
  // Card list items have a heading, a sub heading an icon name from our icon list and an onClick action
  listCardItemHeading?: ReactNode
  listCardItemSubHeading?: ReactNode
  listCardItemIcon?: IconNames
  onClick?: () => void
}

/** @deprecated */
export interface ContextMenuItem {
  icon: IconNames
  onClick: () => void
  intent?: Intent
}

// As per above, each of the context menu options should have an icon name, a click action and
// optionally, an intent for example "danger", will render a red icon
/** @deprecated */
export interface CardContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  contextMenuItems?: ContextMenuItem[]
}

/** @deprecated */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hasMainCard?: boolean // Should we render an Image card as the main card?
  // Supplied text options for the various fields
  mainCardHeading?: ReactNode
  mainCardSubHeading?: ReactNode
  mainCardSubHeadingAdditional?: ReactNode
  mainCardBody?: ReactNode
  mainCardImgUrl?: ReactNode
  mainCardAvatarUrl?: ReactNode
  // Should we render a bottom list section. If supplied without hasMainCard, will just render a list
  hasListCard?: boolean
  // Heading strings for the list
  listCardHeading?: ReactNode
  listCardSubHeading?: ReactNode
  listCardItems?: CardListItemProps[] // A list of options for the list - see CardList item above
  isSelected?: boolean // Does the card have the blue selected border
}

/** @deprecated */
export const handleMouseHover =
  (hoverIndex: number | null, setHoverIndex: Dispatch<SetStateAction<number | null>>) => () => {
    setHoverIndex(hoverIndex)
  }

/** @deprecated */
export const Card: FC<CardProps> = ({
  className,
  hasMainCard,
  hasListCard,
  mainCardHeading,
  mainCardSubHeading,
  mainCardSubHeadingAdditional,
  mainCardBody,
  mainCardImgUrl,
  mainCardAvatarUrl,
  listCardItems,
  listCardHeading,
  listCardSubHeading,
  isSelected,
  ...rest
}) => {
  return (
    <CardWrap className={cx(className, isSelected && elCardFocussed)} {...rest}>
      {hasMainCard && (
        <>
          <CardMainWrap>
            {mainCardAvatarUrl ? (
              <DeprecatedAvatar src={typeof mainCardAvatarUrl === 'string' ? mainCardAvatarUrl : undefined}>
                {mainCardAvatarUrl}
              </DeprecatedAvatar>
            ) : mainCardImgUrl ? (
              <DeprecatedAvatar src={typeof mainCardImgUrl === 'string' ? mainCardImgUrl : undefined} type="image">
                {mainCardImgUrl}
              </DeprecatedAvatar>
            ) : null}
            <CardHeadingWrap className={cx(mainCardAvatarUrl && elCardSubHeadingWrapAvatar)}>
              <CardHeading>{mainCardHeading}</CardHeading>
              <CardSubHeading>{mainCardSubHeading}</CardSubHeading>
              <CardSubHeadingAdditional>{mainCardSubHeadingAdditional}</CardSubHeadingAdditional>
            </CardHeadingWrap>
          </CardMainWrap>
          {mainCardBody && <CardBodyWrap className={cx(hasListCard && elMb5)}>{mainCardBody}</CardBodyWrap>}
        </>
      )}
      {hasListCard && (
        <>
          <CardListMainWrap className={cx(hasMainCard && elMt5)}>
            <CardListHeading>{listCardHeading}</CardListHeading>
            <CardListSubHeading>{listCardSubHeading}</CardListSubHeading>
          </CardListMainWrap>
          {listCardItems &&
            listCardItems.map(({ listCardItemHeading, listCardItemSubHeading, listCardItemIcon, onClick }, index) => (
              <CardListItem key={index} onClick={onClick}>
                {listCardItemIcon && (
                  <CardListIcon>
                    <DeprecatedIcon intent="primary" icon={listCardItemIcon} />
                  </CardListIcon>
                )}
                <CardListItemTextWrap>
                  <CardListItemTextPrimary>{listCardItemHeading}</CardListItemTextPrimary>
                  <CardListItemTextSecondary>{listCardItemSubHeading}</CardListItemTextSecondary>
                </CardListItemTextWrap>
              </CardListItem>
            ))}
        </>
      )}
    </CardWrap>
  )
}
