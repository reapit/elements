import { isTablet } from '#src/styles/deprecated-media'
import { styled } from '@linaria/react'

interface PageHeaderLeadingElementProps {
  'data-type': 'icon' | 'image'
}

export const ElPageHeaderLeadingElement = styled.div<PageHeaderLeadingElementProps>`
  display: flex;
  flex-flow: row nowrap;
  align-items: start;
  justify-content: start;

  &[data-type='icon'] {
    /* NOTE: We use content-box to ensure the padding we apply does not impact the size of the content region available
     * to the icon. */
    box-sizing: content-box;
    padding-block-start: var(--spacing-2);
    height: var(--size-6);
    width: var(--size-6);

    ${isTablet} {
      padding-block-start: var(--spacing-1);
      height: var(--size-10);
      width: var(--size-10);
    }

    @supports (container-type: inline-size) {
      @container (width < 768px) {
        padding-block-start: var(--spacing-2);
        height: var(--size-6);
        width: var(--size-6);
      }

      @container (width >= 768px) {
        padding-block-start: var(--spacing-1);
        height: var(--size-10);
        width: var(--size-10);
      }
    }
  }

  &[data-type='image'] {
    /* NOTE: We use border-box for a leading image because we do not need to ensure it has a specific height like
     * we do for a leading icon. */
    box-sizing: border-box;
    padding-block-start: var(--spacing-1);
    width: var(--size-16);

    ${isTablet} {
      width: var(--size-24);
    }

    @supports (container-type: inline-size) {
      @container (width < 768px) {
        width: var(--size-16);
      }

      @container (width >= 768px) {
        width: var(--size-24);
      }
    }
  }
`
