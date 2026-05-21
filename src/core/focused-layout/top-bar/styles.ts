import { styled } from '@linaria/react'
import { font } from '#src/utils/font'

export const ElFocusedLayoutTopBar = styled.header`
  @layer elements.main {
    z-index: var(--z-index-sticky);

    display: flex;
    align-items: center;
    gap: var(--spacing-4);

    /* min-height: var(--size-14); */
    padding: var(--spacing-2) var(--spacing-5);

    background: var(--comp-focused_overlay-colour-fill-top_bar);
    border-bottom: var(--comp-focused_overlay-border-width-top_bar) solid
      var(--comp-focused_overlay-colour-border-top_bar);

    /* Sticky when top bar contains action elements */
    &:has(button, a) {
      position: sticky;
      top: 0;
    }
  }
`

export const ElFocusedLayoutTopBarContainer = styled.div`
  @layer elements.main {
    display: flex;
    flex: 1 0 0;
    align-items: start;
    gap: var(--spacing-4);
    padding: var(--spacing-1) 0;
    min-width: 0;
    min-height: 0;
  }
`

export const ElFocusedLayoutTopBarLogoContainer = styled.div`
  @layer elements.main {
    display: flex;
    align-items: start;
    padding: var(--spacing-1) 0 var(--spacing-half) 0;
  }
`

export const ElFocusedLayoutTopBarTitleContainer = styled.div`
  @layer elements.main {
    display: flex;
    flex: 1 0 0;
    align-items: start;
  }
`

export const ElFocusedLayoutTopBarTitle = styled.h1`
  flex: 1 0 0;

  ${font('xl', 'bold')}
  color: var(--comp-focused_overlay-colour-text);

  padding: 0;
  margin: 0;
`

export const ElFocusedLayoutTopBarActions = styled.div`
  @layer elements.main {
    display: flex;
  }
`
