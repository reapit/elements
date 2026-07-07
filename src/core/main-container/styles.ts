import { isWidthAtOrAbove } from '#src/utils/breakpoints'
import { styled } from '@linaria/react'

interface ElMainContainerProps {
  'data-size': 'fluid' | 'wide' | 'narrow'
}

export const ElMainContainer = styled.div<ElMainContainerProps>`
  @layer elements.main {
    --main_container-max_width: 100%;

    display: grid;
    grid-template: auto / minmax(0, var(--main_container-max_width, 1fr));
    justify-content: center;

    /* NOTE: This is a default value; it can be overridden via inline styles */
    background-color: transparent;

    @container ${isWidthAtOrAbove('MD')} {
      &[data-size='narrow'] {
        --main_container-max_width: 800px;
      }
      &[data-size='wide'] {
        --main_container-max_width: 1200px;
      }
    }
    @container ${isWidthAtOrAbove('XL')} {
      &[data-size='narrow'] {
        --main_container-max_width: 1200px;
      }
      &[data-size='wide'] {
        --main_container-max_width: 1600px;
      }
    }
    @container ${isWidthAtOrAbove('2XL')} {
      &[data-size='narrow'] {
        --main_container-max_width: 1400px;
      }
      &[data-size='wide'] {
        --main_container-max_width: 1800px;
      }
    }
  }
`

interface ElMainContainerContentProps {
  'data-template':
    | 'single-column'
    | 'two-columns-symmetrical'
    | 'two-columns-asymmetrical-start'
    | 'two-columns-asymmetrical-end'
    | 'three-columns'
}

export const ElMainContainerContent = styled.div<ElMainContainerContentProps>`
  @layer elements.main {
    display: grid;

    padding: var(--spacing-5);

    @container ${isWidthAtOrAbove('SM')} {
      padding: var(--spacing-8);
    }

    @container ${isWidthAtOrAbove('MD')} {
      padding: var(--spacing-10);
    }

    &[data-has-no-bottom-padding='true'] {
      padding-block-end: 0;
    }

    &[data-has-no-top-padding='true'] {
      padding-block-start: 0;
    }

    &,
    &[data-template='single-column'] {
      grid-template: auto / 100%;
    }

    /* minmax(0, Xfr) prevents content from forcing columns wider than their fraction */
    &[data-template='two-columns-asymmetrical-start'] {
      grid-template: auto / minmax(0, 2fr) minmax(0, 1fr);
      column-gap: var(--spacing-10);
    }

    &[data-template='two-columns-asymmetrical-end'] {
      grid-template: auto / minmax(0, 1fr) minmax(0, 2fr);
      column-gap: var(--spacing-10);
    }

    &[data-template='two-columns-symmetrical'] {
      grid-template: auto / minmax(0, 1fr) minmax(0, 1fr);

      @container ${isWidthAtOrAbove('SM')} {
        column-gap: var(--spacing-8);
      }

      @container ${isWidthAtOrAbove('MD')} {
        column-gap: var(--spacing-10);
      }
    }

    &[data-template='three-columns'] {
      grid-template: auto / minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
      column-gap: var(--spacing-10);
    }
  }
`
