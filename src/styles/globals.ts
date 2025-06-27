import { css } from '@linaria/core'
// TODO: These are the legacy tokens. We should remove them once all our V5 components are using the new ones
import '#src/tokens/legacy-reapit/tokens.css'

import '#src/tokens/dist/reapit.css'
import '#src/tokens/dist/payprop.css'

// export javascript colours for the SVG background in the button
export const intentPrimary = '#4e56ea'
export const intentNeutral = '#0080ff'
export const intentSuccess = '#20c040'
export const intentPending = '#ffa000'
export const intentWarning = '#ff6000'
export const intentDanger = '#f01830'
export const intentDefault = '#607890'

/** @peprecated - to remove in v5. */
export const intentCritical = '##4e56ea'
export const intentSecondary = '#4e56ea'

export const elGlobals = css`
  :global() {
    @import 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro&display=swap';
    /* Reset CSS */
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
      margin: 0;
      padding: 0;
      border: 0;
      font: inherit;
      vertical-align: baseline;
      line-height: 1.2;
    }
    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }
    body {
      line-height: 1;
    }
    ol,
    ul {
      list-style: none;
    }
    blockquote,
    q {
      quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    /* Some basic defaults */

    html {
      font-size: 16px;
      font-family: 'Inter', Helvetica, Arial, sans-serif;
      color: #222b33; /* Neutral 900 */
      height: 100%;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: rgb(0 0 0 / 0);
      overflow: hidden;

      * {
        box-sizing: border-box;
        letter-spacing: -0.01em;
      }
    }

    body {
      height: 100%;
      background: #ffffff;
      position: relative;
    }

    #root {
      height: 100%;
    }

    a {
      text-decoration: none;
      cursor: pointer;
      color: #4e56ea; /* Purple 500 */
    }

    code,
    pre {
      font-family: 'Source Code Pro', monospace;
    }

    strong {
      font-weight: bold;
    }

    :root {
      /* Neutral color variables */
      --white: #ffffff;
      --black: var(--neutral-900);
      --neutral-darkest: var(--neutral-700);
      --neutral-dark: var(--neutral-500);
      --neutral-medium: var(--neutral-400);
      --neutral-medium-light: var(--neutral-300);
      --neutral-light: var(--neutral-100);
      --neutral-lightest: var(--neutral-050);

      /** intent color variables */
      --intent-primary: var(--purple-500);
      --intent-neutral: var(--blue-500);
      --intent-success: var(--green-500);
      --intent-pending: var(--yellow-500);
      --intent-warning: var(--orange-500);
      --intent-danger: var(--red-500);
      --intent-default: var(--neutral-500);

      /* intent light colors */
      --intent-primary-light: var(--purple-300);
      --intent-neutral-light: var(--blue-300);
      --intent-success-light: var(--green-300);
      --intent-pending-light: var(--yellow-300);
      --intent-warning-light: var(--orange-300);
      --intent-danger-light: var(--red-300);
      --intent-default-light: var(--neutral-300);

      /* intent lightest colors */
      --intent-primary-lightest: var(--purple-050);
      --intent-neutral-lightest: var(--blue-050);
      --intent-success-lightest: var(--green-050);
      --intent-pending-lightest: var(--yellow-050);
      --intent-warning-lightest: var(--orange-050);
      --intent-danger-lightest: var(--red-050);
      --intent-default-lightest: var(--neutral-050);

      /** intent dark colors */
      --intent-primary-dark: var(--purple-700);
      --intent-neutral-dark: var(--blue-700);
      --intent-success-dark: var(--green-700);
      --intent-pending-dark: var(--yellow-700);
      --intent-warning-dark: var(--orange-700);
      --intent-danger-dark: var(--red-700);
      --intent-default-dark: var(--neutral-700);

      /** font variables */
      --font-sans-serif: 'Inter', Helvetica, Arial, sans-serif;
      --font-monospace: 'Source Code Pro', monospace;

      /** font size variables */
      --font-size-heading: 1.5rem;
      --font-size-subheading: 1.25rem;
      --font-size-small-subheading: 1.125rem;
      --font-size-default: 0.9375rem;
      --font-size-small: 0.875rem;
      --font-size-smallest: 0.8125rem;
      --font-weight-default: 400;
      --font-weight-medium: 500;
      --font-weight-bold: 600;

      /** layout size */
      --layout-size-base: 1rem;
      --layout-size-molecule: 1.25rem;
      --layout-size-atom: 0.75rem;

      /** other defaults */
      --default-border-radius: 0.25rem;

      /** component specific variables */
      --component-input-bg: var(--white);
      --component-input-focus-bg: var(--neutral-light);
      --component-input-shadow: inset 0 -1px 0 var(--white);
      --component-input-border: 1px solid var(--neutral-150);
      --component-input-border-focus: 1px solid var(--purple-500);
      --component-steps-gutter-width: 12px;
      --component-table-min-column-width: 3rem;

      /** Navigation specific variables */
      --nav-menu-background-dark: var(--white);
      --nav-menu-background-accent: var(--white);
      --nav-menu-text: var(--neutral-medium);
      --nav-menu-text-hover: var(--neutral-dark);
      --nav-menu-icon-primary-accent: var(--neutral-600);
      --nav-menu-icon-secondary-accent: var(--neutral-400);
      --nav-brand-height: 1.5rem;

      /* Component specific variables */
      --page-header-bg: var(--white);
      --page-header-border: 1px solid var(--neutral-100);
      --pagination-bg: var(--white);

      /* Utility Decorative variables */

      --util-border-grey: 1px solid var(--neutral-100, '#dbdbdb');
      --util-border-purple: 1px solid var(--purple-300, '#9faebc');
      --util-border-radius: 0.25rem;
      --util-box-shadow: 0 2px 9px rgb(0 0 0 / 0.08);

      /* Utility Responsive variables */
      --util-screen-width: 100vw;
      --util-screen-height: 100vh;

      --util-0: 0;
      --util-auto: auto;

      --util-percentage-1: 8.3333%;
      --util-percentage-2: 16.6667%;
      --util-percentage-3: 25%;
      --util-percentage-4: 33.3333%;
      --util-percentage-5: 41.6667%;
      --util-percentage-6: 50%;
      --util-percentage-7: 58.3333%;
      --util-percentage-8: 66.6667%;
      --util-percentage-9: 75%;
      --util-percentage-10: 83.3333%;
      --util-percentage-11: 91.6667%;
      --util-percentage-12: 100%;

      --util-rems-1: 0.25rem;
      --util-rems-2: 0.375rem;
      --util-rems-3: 0.5rem;
      --util-rems-4: 0.625rem;
      --util-rems-5: 0.75rem;
      --util-rems-6: 1rem;
      --util-rems-7: 1.25rem;
      --util-rems-8: 1.5rem;
      --util-rems-9: 2rem;
      --util-rems-10: 2.25rem;
      --util-rems-11: 2.5rem;
      --util-rems-12: 3rem;

      /** To deprecated, left in to avoid breaking changes, some duplication */
      --blue-light: var(--purple-300);
      --blue-light2: var(--purple-300);
      --blue-dark: var(--purple-700);
      --blue-dark2: var(--purple-700);
      --intent-low: var(--neutral-light);
      --intent-secondary: var(--purple-500);
      --intent-secondary-light: var(--purple-300);
      --intent-secondary-dark: var(--purple-700);
      --intent-critical: var(--purple-500);
      --intent-critical-text: var(--white);
      --intent-critical-light: var(--purple-300);
      --intent-critical-light-text: var(--black);
      --intent-critical-dark: var(--purple-700);
      --intent-critical-dark-text: var(--white);
      --layout-size-1_2: 0.5rem;
      --layout-size-1_4: 0.25rem;
      --layout-size-3_4: 0.75rem;
      --layout-size-1_3: calc(1rem / 3);
      --layout-size-2_3: calc(2rem / 3);
      --layout-size-2: 2rem;
      --layout-size-3: 3rem;
      --component-input-border-bottom: 1px solid var(--neutral-150);
      --component-input-border-bottom-focus: 1px solid #000000;
    }
  }
`
