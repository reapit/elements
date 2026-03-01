import { css } from '@linaria/core'

import '#src/tokens/dist/reapit.css'
import '#src/tokens/dist/payprop.css'

export const elGlobals = css`
  :global() {
    @import 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro&display=swap';

    *,
    *::after,
    *::before {
      box-sizing: border-box;
    }

    :root {
      /** Z-index layering tokens */
      --z-index-base: 0;
      --z-index-elevated: 1;
      --z-index-sticky: 10;
    }
  }
`
