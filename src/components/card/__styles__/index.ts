import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { isTablet } from '../../../styles/media'
import { ElDeprecatedAvatar } from '../../avatar'

export const elCardFocussed = css`
  background-color: var(--purple-050);
`

export const ElCardWrap = styled.div`
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.03);
  background: var(--white);
  position: relative;

  ${isTablet} {
    padding: 1.25rem;
    box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  }

  &.${elCardFocussed} {
    background-color: var(--purple-050);
  }
`

export const elCardSubHeadingWrapAvatar = css``

export const ElCardHeadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;

  &.${elCardSubHeadingWrapAvatar} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

export const ElCardMainWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;

  ${ElDeprecatedAvatar} {
    margin-right: 1rem;

    ${isTablet} {
      margin-right: 1.25rem;
    }
  }
`

export const ElCardHeading = styled.h5`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  margin-bottom: 0.25rem;
  width: 100%;
  font-size: var(--font-size-small);
`

export const ElCardSubHeading = styled.h6`
  color: var(--neutral-500);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: var(--font-size-smallest);
`

export const elCardSubHeadingAdditionalExpanded = css``

export const ElCardSubHeadingAdditional = styled.h6`
  color: var(--neutral-500);
  font-size: var(--font-size-smallest);
  font-weight: var(--font-weight-medium);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
`

export const elCardBodyWrapExpanded = css``

export const ElCardBodyWrap = styled.div`
  width: 100%;
  color: var(--black);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  height: 3rem;
  font-size: var(--font-size-smallest);
  transition: height 0.2s linear;
  transition: margin-bottom 0.2s linear;
  margin-top: 0.5rem;

  ${isTablet} {
    height: 3.25rem;
    font-size: var(--font-size-small);
  }
`

export const elMobileListToggle = css`
  top: 1.5rem;
  right: 0;
`

export const ElCardAvatarWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: var(--neutral-100);
  margin-right: 0.5rem;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;

  img {
    max-width: 2.5rem;
    border-radius: 50%;
  }
`

export const ElCardImageWrap = styled(ElCardAvatarWrap)`
  border-radius: 0;
  width: 4.5rem;
  height: 3.25rem;

  img {
    max-width: 4.5rem;
    border-radius: 0;
  }
`

export const ElCardList = styled.div`
  display: flex;
`

export const elCardListMainWrapExpanded = css``

export const ElCardListMainWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  flex-direction: column;
`

export const ElCardListHeading = styled.h5`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: var(--font-size-small);
  margin-bottom: 0.25rem;
`

export const ElCardListSubHeading = styled.h6`
  font-size: var(--font-size-smallest);
  color: var(--neutral-500);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 0.75rem;
`

export const elCardListItemExpanded = css`
  height: 2.5rem;
  margin-bottom: 0.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const ElCardListItem = styled.div`
  display: flex;
  height: 2rem;
  margin-bottom: 0.5rem;
  overflow: hidden;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const ElCardListItemTextWrap = styled.div`
  font-size: var(--font-size-smallest);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`

export const ElCardListItemTextPrimary = styled.div`
  color: var(--black);
`

export const ElCardListItemTextSecondary = styled.div`
  font-size: var(--font-size-smallest);
  color: var(--intent-primary);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`

export const ElCardListIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2em;
  width: 2em;
  margin-right: 0.5rem;
  flex-shrink: 0;
`
