import { styled } from '@linaria/react'
import { font } from '#src/utils/font'

export const ElFileUploaderMediaCard = styled.div`
  @layer elements.main {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--spacing-2);
  }
`

export const ElFileUploaderMediaCardThumbnail = styled.div`
  @layer elements.main {
    position: relative;
    /* display: grid, not the block default, so the Image wrapper below stretches to fill this element's
     * height via track sizing rather than a height: 100% percentage chain — that chain breaks once it has
     * to resolve through the Image wrapper's own nested elements against this element's flex-grown height. */
    display: grid;
    overflow: hidden;
    width: 100%;
    /* Lets the thumbnail absorb any extra height the outer card is stretched to (e.g. by a CSS grid row with
     * align-items: stretch, as FileUploader.FileList uses for the multi-select layout) — the caption below keeps its
     * own natural height since it has no flex-grow. min-height: 0 overrides flexbox's default min-height: auto,
     * which would otherwise floor this at the image's intrinsic height and stop it from ever shrinking. */
    flex: 1 1 auto;
    /* TODO: Check if 100px is an appropriate hard minimum */
    min-height: 100px;
    border: var(--border-width-default) solid var(--colour-border-neutral-light_default);
    border-radius: var(--border-radius-l);
    background: var(--colour-fill-neutral-lightest);

    &[data-status='error'] {
      border-color: var(--colour-border-error-default);
    }
  }
`

export const ElFileUploaderMediaCardOverlay = styled.div`
  @layer elements.main {
    position: absolute;
    inset: 0;
    background: var(--overlay-50);
  }
`

export const ElFileUploaderMediaCardRemoveButtonContainer = styled.div`
  @layer elements.main {
    position: absolute;
    top: 0;
    right: 0;
  }
`

export const ElFileUploaderMediaCardDuration = styled.span`
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

export const ElFileUploaderMediaCardStatusIcon = styled.div`
  @layer elements.main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const ElFileUploaderMediaCardErrorBadge = styled.div`
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

export const ElFileUploaderMediaCardContent = styled.div`
  @layer elements.main {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
`

export const ElFileUploaderMediaCardFileName = styled.p`
  @layer elements.main {
    ${font('sm', 'regular')}
    overflow: hidden;
    margin: 0;
    width: 100%;
    color: var(--colour-text-primary);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const ElFileUploaderMediaCardSecondaryInfo = styled.div`
  @layer elements.main {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-half);
    width: 100%;

    /* The error message is allowed to wrap onto a second line rather than truncate, matching FileCard. */
    &[data-wrap] {
      flex-wrap: wrap;
    }
  }
`

export const ElFileUploaderMediaCardStatusText = styled.span`
  @layer elements.main {
    ${font('2xs', 'regular')}
    overflow: hidden;
    min-width: 0;
    color: var(--colour-text-secondary);
    text-overflow: ellipsis;
    white-space: nowrap;

    &[data-error] {
      ${font('2xs', 'medium')}
      overflow: visible;
      color: var(--colour-text-error);
      text-overflow: unset;
      white-space: normal;
    }
  }
`
