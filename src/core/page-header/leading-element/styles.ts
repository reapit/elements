import { isWidthAtOrAbove, isWidthBelow } from '#src/utils/breakpoints'
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

    @media screen and ${isWidthAtOrAbove('SM')} {
      padding-block-start: var(--spacing-1);
      height: var(--size-10);
      width: var(--size-10);
    }

    @container ${isWidthAtOrAbove('SM')} {
      padding-block-start: var(--spacing-1);
      height: var(--size-10);
      width: var(--size-10);
    }

    /* NOTE: This container query will override the default media query behaviour above if there's
     * an ancestor is a container. If there's no ancestral container, the media query will behave
     * as defined above. */
    @container ${isWidthBelow('SM')} {
      padding-block-start: var(--spacing-2);
      height: var(--size-6);
      width: var(--size-6);
    }
  }

  &[data-type='image'] {
    /* NOTE: We use border-box for a leading image because we do not need to ensure it has a specific height like
     * we do for a leading icon. */
    box-sizing: border-box;
    padding-block-start: var(--spacing-1);
    width: var(--size-16);

    @media screen and ${isWidthAtOrAbove('SM')} {
      width: var(--size-24);
    }

    @container ${isWidthAtOrAbove('SM')} {
      width: var(--size-24);
    }

    /* NOTE: This container query will override the default media query behaviour above if there's
     * an ancestor is a container. If there's no ancestral container, the media query will behave
     * as defined above. */
    @container ${isWidthBelow('SM')} {
      width: var(--size-16);
    }
  }
`
