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

export interface CardBaseProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const CardWrap: FC<CardBaseProps> = ({ children, ...rest }) => <ElCardWrap {...rest}>{children}</ElCardWrap>

export const CardHeadingWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardHeadingWrap {...rest}>{children}</ElCardHeadingWrap>
)

export const CardHeading: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardHeading {...rest}>{children}</ElCardHeading>
)

export const CardSubHeading: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardSubHeading {...rest}>{children}</ElCardSubHeading>
)

export const CardSubHeadingAdditional: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardSubHeadingAdditional {...rest}>{children}</ElCardSubHeadingAdditional>
)

export const CardMainWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardMainWrap {...rest}>{children}</ElCardMainWrap>
)

export const CardBodyWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardBodyWrap {...rest}>{children}</ElCardBodyWrap>
)

export const CardImageWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardImageWrap {...rest}>{children}</ElCardImageWrap>
)

export const CardAvatarWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardAvatarWrap {...rest}>{children}</ElCardAvatarWrap>
)

export const CardList: FC<CardBaseProps> = ({ children, ...rest }) => <ElCardList {...rest}>{children}</ElCardList>

export const CardListMainWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListMainWrap {...rest}>{children}</ElCardListMainWrap>
)

export const CardListHeading: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListHeading {...rest}>{children}</ElCardListHeading>
)

export const CardListSubHeading: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListSubHeading {...rest}>{children}</ElCardListSubHeading>
)

export const CardListItem: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListItem {...rest}>{children}</ElCardListItem>
)

export const CardListItemTextWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListItemTextWrap {...rest}>{children}</ElCardListItemTextWrap>
)

export const CardListItemTextPrimary: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListItemTextPrimary {...rest}>{children}</ElCardListItemTextPrimary>
)

export const CardListItemTextSecondary: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListItemTextSecondary {...rest}>{children}</ElCardListItemTextSecondary>
)

export const CardListIcon: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListIcon {...rest}>{children}</ElCardListIcon>
)
