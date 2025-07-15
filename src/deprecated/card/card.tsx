import { FC, HTMLAttributes } from 'react'
import {
  ElCardWrap,
  ElCardBodyWrap,
  ElCardHeadingWrap,
  ElCardHeading,
  ElCardImageWrap,
  ElCardList,
  ElCardListIcon,
  ElCardListItem,
  ElCardSubHeading,
  ElCardSubHeadingAdditional,
  ElCardListHeading,
  ElCardListSubHeading,
  ElCardListItemTextWrap,
  ElCardListItemTextPrimary,
  ElCardListItemTextSecondary,
  ElCardMainWrap,
  ElCardListMainWrap,
  ElCardAvatarWrap,
} from './__styles__'

/** @deprecated */
export interface CardBaseProps extends HTMLAttributes<HTMLDivElement> {}
/** @deprecated */
export interface CardButtonProps extends HTMLAttributes<HTMLButtonElement> {}

/** @deprecated */
export const CardWrap: FC<CardBaseProps> = ({ children, ...rest }) => <ElCardWrap {...rest}>{children}</ElCardWrap>

/** @deprecated */
export const CardHeadingWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardHeadingWrap {...rest}>{children}</ElCardHeadingWrap>
)

/** @deprecated */
export const CardHeading: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardHeading {...rest}>{children}</ElCardHeading>
)

/** @deprecated */
export const CardSubHeading: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardSubHeading {...rest}>{children}</ElCardSubHeading>
)

/** @deprecated */
export const CardSubHeadingAdditional: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardSubHeadingAdditional {...rest}>{children}</ElCardSubHeadingAdditional>
)

/** @deprecated */
export const CardMainWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardMainWrap {...rest}>{children}</ElCardMainWrap>
)

/** @deprecated */
export const CardBodyWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardBodyWrap {...rest}>{children}</ElCardBodyWrap>
)

/** @deprecated */
export const CardImageWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardImageWrap {...rest}>{children}</ElCardImageWrap>
)

/** @deprecated */
export const CardAvatarWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardAvatarWrap {...rest}>{children}</ElCardAvatarWrap>
)

/** @deprecated */
export const CardList: FC<CardBaseProps> = ({ children, ...rest }) => <ElCardList {...rest}>{children}</ElCardList>

/** @deprecated */
export const CardListMainWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListMainWrap {...rest}>{children}</ElCardListMainWrap>
)

/** @deprecated */
export const CardListHeading: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListHeading {...rest}>{children}</ElCardListHeading>
)

/** @deprecated */
export const CardListSubHeading: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListSubHeading {...rest}>{children}</ElCardListSubHeading>
)

/** @deprecated */
export const CardListItem: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListItem {...rest}>{children}</ElCardListItem>
)

/** @deprecated */
export const CardListItemTextWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListItemTextWrap {...rest}>{children}</ElCardListItemTextWrap>
)

/** @deprecated */
export const CardListItemTextPrimary: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListItemTextPrimary {...rest}>{children}</ElCardListItemTextPrimary>
)

/** @deprecated */
export const CardListItemTextSecondary: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListItemTextSecondary {...rest}>{children}</ElCardListItemTextSecondary>
)

/** @deprecated */
export const CardListIcon: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListIcon {...rest}>{children}</ElCardListIcon>
)
