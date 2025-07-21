import { DRAWER_CSS_CONTAINER_NAME, DRAWER_WIDTH_MD_2XL } from '../constants'
import { ElDrawerFooter } from '../footer'
import { styled } from '@linaria/react'

export const ElDrawerBody = styled.div`
  grid-area: body;
  background: var(--fill-white);
  height: 100%;

  padding-block: var(--spacing-5);
  padding-inline: var(--spacing-5);

  @container ${DRAWER_CSS_CONTAINER_NAME} (width >= ${DRAWER_WIDTH_MD_2XL}) {
    padding-inline: var(--spacing-8);
  }

  /* When the drawer body is followed by a footer, we remove the top padding because the header will not be
   * sticky (i.e. it'll scroll away with the body). */
  &:has(~ ${ElDrawerFooter}) {
    padding-block-start: 0;
  }
`
