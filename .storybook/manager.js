import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'
import { version } from '../package.json'
import logo from './public/reapitLogo.svg'

addons.setConfig({
  theme: create({
    base: 'light',

    colorPrimary: '#4e56ea',
    colorSecondary: '#4e56ea',

    // UI
    appBg: '#fff',
    appContentBg: '#fff',
    appBorderColor: '#4e56ea',
    appBorderRadius: 0,

    // Typography
    fontBase: "'Inter', sans-serif",
    fontCode: "'Source Code Pro', monospace",

    // Text colors
    textColor: '#222b33',
    textInverseColor: '#fff',

    // Toolbar default and active colors
    barTextColor: '#222b33',
    barSelectedColor: '#4e56ea',
    barBg: '#fff',

    // Form colors
    inputBg: '#fff',
    inputBorder: '#4e56ea',
    inputTextColor: '#222b33',
    inputBorderRadius: 0,

    brandTitle: `Elements ${version}`,
    brandImage: logo,
  }),
})
