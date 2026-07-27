import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElFileUploaderMediaThumbnail = styled.div`
  @layer elements.main {
    position: relative;
    /* display: grid, not the block default, so the Image wrapper below stretches to fill this element's
     * height via track sizing rather than a height: 100% percentage chain — that chain breaks once it has
     * to resolve through the Image wrapper's own nested elements against this element's flex-grown height. */
    display: grid;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: var(--border-width-default) solid var(--colour-border-neutral-light_default);
    border-radius: var(--border-radius-l);
    background: var(--colour-fill-neutral-lightest);

    min-width: var(--size-32);
    min-height: var(--size-20);

    &[data-status='error'] {
      border-color: var(--colour-border-error-default);
    }
  }
`

export const ElFileUploaderMediaThumbnailOverlay = styled.div`
  @layer elements.main {
    position: absolute;
    inset: 0;
    background: var(--overlay-50);
  }
`

export const ElFileUploaderMediaThumbnailActionContainer = styled.div`
  @layer elements.main {
    position: absolute;
    top: 0;
    right: 0;
  }
`

export const ElFileUploaderMediaThumbnailDuration = styled.span`
  @layer elements.main {
    ${font('3xs', 'medium')}
    position: absolute;
    right: var(--spacing-2);
    bottom: var(--spacing-2);
    color: var(--colour-text-white);
    text-shadow: 0 0 10px var(--overlay-50);
    white-space: nowrap;
  }
`

export const ElFileUploaderMediaThumbnailStatusIcon = styled.div`
  @layer elements.main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const ElFileUploaderMediaThumbnailErrorBadge = styled.div`
  @layer elements.main {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size-8);
    height: var(--size-8);
    border-radius: var(--border-radius-3xl);
    background: var(--colour-fill-white);
    transform: translate(-50%, -50%);
  }
`
