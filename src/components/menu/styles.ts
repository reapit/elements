import { styled } from '@linaria/react'
import { ElIcon } from '../icon'
import { elTextSM, Text2XS } from '../typography'

export const ElMenuPopover = styled.div`
  position: absolute;
  white-space: nowrap;
  z-index: 99;
`

export const ElMenu = styled.div`
  overflow: hidden;
  display: flex;
  min-width: 200px;
  width: fit-content;
  padding: var(--spacing-2) var(--spacing-none);
  flex-direction: column;
  align-items: flex-start;
  border-radius: var(--corner-default);
  background-color: var(--fill-white);
  box-shadow: 0px 4px 16px 0px rgba(34, 43, 51, 0.16);
`

export const ElMenuRadioItem = styled.li`
  cursor: pointer;

  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 400;
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
  text-align: left;
  color: var(--text-primary);

  ${ElIcon} {
    font-size: var(--icon-sm);
  }
  &[data-selected='false'] {
    padding-left: var(--spacing-9);
  }
  padding: 0 var(--spacing-4);
  gap: var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: start;
  &:hover {
    color: var(--text-white);
    ${ElIcon} {
      color: var(--text-white);
    }
    background: var(--fill-action-dark);
  }
  height: var(--size-7);
  padding: var(--spacing-none) var(--spacing-4);
  gap: var(--spacing-4);
`

export const ElMenuItemContainer = styled.li`
  a,
  button {
    font-family: var(--font-family);
    font-size: var(--font-size-sm);
    font-weight: 400;
    line-height: var(--line-height-sm);
    letter-spacing: var(--letter-spacing-sm);
    text-align: left;
    color: var(--text-primary);

    display: flex;
    align-items: center;
    justify-content: start;
    &:hover {
      color: var(--text-white);
      background: var(--fill-action-dark);
    }
    height: var(--size-7);
    padding: var(--spacing-none) var(--spacing-4);
    gap: var(--spacing-4);
  }

  button {
    /* customize html default button */
    background-color: transparent;
    cursor: pointer;
    .${elTextSM} {
      text-align: left;
    }

    /* customize customized button */
    &:focus {
      box-shadow: none;
    }

    /* customize both default and custom */
    border: none !important;
    border-radius: 0 !important;
  }
`

export const ElMenuItemGroup = styled.ul`
  width: 100%;
  li,
  a,
  button {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const ElMenuItemGroupTitle = styled(Text2XS)`
  display: flex;
  align-items: center;
  height: 32px;
  padding: var(--spacing-none) var(--spacing-4) var(--spacing-none) var(--spacing-4);
  margin-bottom: 0;
  color: var(--text-placeholder);
  font-weight: 600;
  text-align: left;
  text-transform: uppercase;
`
