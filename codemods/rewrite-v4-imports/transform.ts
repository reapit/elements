import { SourceFile } from 'ts-morph'
import { matchesPackage, createProjectFromSource } from '../shared/index.js'

/**
 * Codemod to rewrite @reapit/elements imports to use deprecated component aliases.
 *
 * This codemod helps v4 consumers migrate to v5 by rewriting imports to use the
 * Deprecated* versions while aliasing them back to their original names. This allows
 * existing code to continue working without modification.
 *
 * Transformations:
 * - Button -> DeprecatedButton as Button
 * - ButtonProps -> DeprecatedButtonProps as ButtonProps
 * - type ButtonProps -> type DeprecatedButtonProps as ButtonProps
 * - TextArea -> Textarea as TextArea
 * - Handles facade packages via --facade-package flag
 *
 * Preserves:
 * - Custom aliases: Button as MyBtn -> DeprecatedButton as MyBtn
 * - Already deprecated imports: DeprecatedButton -> DeprecatedButton (no change)
 * - Non-elements imports: Unchanged
 */

// Comprehensive mapping of all deprecated components available in @reapit/elements v5
const moduleTransformations: Record<string, string> = {
  // Main Components
  Accordion: 'DeprecatedAccordion',
  Badge: 'DeprecatedBadge',
  BreadCrumb: 'DeprecatedBreadCrumb',
  Button: 'DeprecatedButton',
  Chip: 'DeprecatedChip',
  Drawer: 'DeprecatedDrawer',
  Icon: 'DeprecatedIcon',
  Label: 'DeprecatedLabel',
  MainContainer: 'DeprecatedMainContainer',
  Menu: 'DeprecatedMenu',
  Nav: 'DeprecatedNav',
  PageHeader: 'DeprecatedPageHeader',
  Pagination: 'DeprecatedPagination',
  Select: 'DeprecatedSelect',
  SplitButton: 'DeprecatedSplitButton',
  StatusIndicator: 'DeprecatedStatusIndicator',
  Table: 'DeprecatedTable',
  Tag: 'DeprecatedTag',
  ToolTip: 'DeprecatedToolTip',

  // Textarea (renamed in v5, no deprecated alias available)
  TextArea: 'Textarea',

  // Sub-components - Accordion
  AccordionContainer: 'DeprecatedAccordionContainer',
  AccordionContent: 'DeprecatedAccordionContent',
  AccordionItem: 'DeprecatedAccordionItem',
  AccordionTitle: 'DeprecatedAccordionTitle',
  AccordionTitleContent: 'DeprecatedAccordionTitleContent',
  AccordionTitleContentWrapper: 'DeprecatedAccordionTitleContentWrapper',

  // Sub-components - Button
  ButtonGroup: 'DeprecatedButtonGroup',
  FloatingButton: 'DeprecatedFloatingButton',

  // Sub-components - Drawer
  DrawerBg: 'DeprecatedDrawerBg',
  DrawerBody: 'DeprecatedDrawerBody',
  DrawerContainer: 'DeprecatedDrawerContainer',
  DrawerFooter: 'DeprecatedDrawerFooter',
  DrawerHeader: 'DeprecatedDrawerHeader',
  DrawerSubtitle: 'DeprecatedDrawerSubtitle',
  DrawerTitle: 'DeprecatedDrawerTitle',

  // Sub-components - Menu
  MenuItem: 'DeprecatedMenuItem',
  MenuItemContainer: 'DeprecatedMenuItemContainer',
  MenuItemGroup: 'DeprecatedMenuItemGroup',
  MenuList: 'DeprecatedMenuList',
  MenuPopover: 'DeprecatedMenuPopover',
  MenuProvider: 'DeprecatedMenuProvider',
  MenuTrigger: 'DeprecatedMenuTrigger',

  // Sub-components - Nav
  NavItem: 'DeprecatedNavItem',
  NavResponsive: 'DeprecatedNavResponsive',
  NavResponsiveAvatar: 'DeprecatedNavResponsiveAvatar',
  NavResponsiveOption: 'DeprecatedNavResponsiveOption',
  NavSubNav: 'DeprecatedNavSubNav',
  NavSubNavItem: 'DeprecatedNavSubNavItem',

  // Sub-components - PageHeader
  PageHeaderContainer: 'DeprecatedPageHeaderContainer',
  PageHeaderTitleContainer: 'DeprecatedPageHeaderTitleContainer',
  PageHeaderWrap: 'DeprecatedPageHeaderWrap',
  PageHeaderWrapInner: 'DeprecatedPageHeaderWrapInner',

  // Sub-components - Pagination
  PaginationButton: 'DeprecatedPaginationButton',
  PaginationInput: 'DeprecatedPaginationInput',
  PaginationText: 'DeprecatedPaginationText',
  PaginationWrap: 'DeprecatedPaginationWrap',

  // Sub-components - SplitButton
  // Note: ActionButton/MenuButton are not standalone exports - only accessible as
  // DeprecatedSplitButton.Action and DeprecatedSplitButton.Menu

  // Sub-components - Table
  TableCell: 'DeprecatedTableCell',
  TableHeader: 'DeprecatedTableHeader',
  TableHeadersRow: 'DeprecatedTableHeadersRow',
  TableRow: 'DeprecatedTableRow',
  TableRowContainer: 'DeprecatedTableRowContainer',
  TableSortHeader: 'DeprecatedTableSortHeader',

  // Sub-components - Groups
  BadgeGroup: 'DeprecatedBadgeGroup',
  ChipGroup: 'DeprecatedChipGroup',
  TagGroup: 'DeprecatedTagGroup',

  // Sub-components - Other
  Avatar: 'DeprecatedAvatar',
  ToolTipChild: 'DeprecatedToolTipChild',

  // Styled Components - Accordion
  ElAccordionContainer: 'ElDeprecatedAccordionContainer',
  ElAccordionContent: 'ElDeprecatedAccordionContent',
  ElAccordionItem: 'ElDeprecatedAccordionItem',
  ElAccordionTitle: 'ElDeprecatedAccordionTitle',
  ElAccordionTitleContent: 'ElDeprecatedAccordionTitleContent',
  ElAccordionTitleContentWrapper: 'ElDeprecatedAccordionTitleContentWrapper',

  // Styled Components - Button
  ElButton: 'ElDeprecatedButton',
  ElAnchorButton: 'ElDeprecatedAnchorButton',
  ElButtonLabel: 'ElDeprecatedButtonLabel',
  ElButtonSpinner: 'ElDeprecatedButtonSpinner',
  ElButtonGroupInner: 'ElDeprecatedButtonGroupInner',

  // Styled Components - Menu
  ElMenu: 'ElDeprecatedMenu',
  ElMenuList: 'ElDeprecatedMenuList',
  ElMenuPopover: 'ElDeprecatedMenuPopover',
  ElMenuItemGroup: 'ElDeprecatedMenuItemGroup',
  ElMenuItemGroupList: 'ElDeprecatedMenuItemGroupList',
  ElMenuItemGroupTitle: 'ElDeprecatedMenuItemGroupTitle',
  ElMenuItemButton: 'ElDeprecatedMenuItemButton',
  ElMenuItemAnchor: 'ElDeprecatedMenuItemAnchor',
  ElMenuItemContent: 'ElDeprecatedMenuItemContent',
  ElMenuItemIcon: 'ElDeprecatedMenuItemIcon',
  ElMenuItemLabel: 'ElDeprecatedMenuItemLabel',
  ElMenuItemLabelContainer: 'ElDeprecatedMenuItemLabelContainer',
  ElMenuItemSupplementaryInfo: 'ElDeprecatedMenuItemSupplementaryInfo',

  // Styled Components - Split Button
  ElSplitButton: 'ElDeprecatedSplitButton',
  ElSplitButtonActionButton: 'ElDeprecatedSplitButtonActionButton',
  ElSplitButtonMenuButton: 'ElDeprecatedSplitButtonMenuButton',

  // CSS Classes - Button
  elButtonSizeSmall: 'elDeprecatedButtonSizeSmall',
  elButtonSizeMedium: 'elDeprecatedButtonSizeMedium',
  elButtonSizeLarge: 'elDeprecatedButtonSizeLarge',
  elButtonLabel: 'elDeprecatedButtonLabel',
  elIcon: 'elDeprecatedIcon',
  elButtonIconOnly: 'elDeprecatedButtonIconOnly',
  elButtonSpinner: 'elDeprecatedButtonSpinner',
  elFloatingButton: 'elDeprecatedFloatingButton',
  elButtonGroupAlignLeft: 'elDeprecatedButtonGroupAlignLeft',
  elButtonGroupAlignRight: 'elDeprecatedButtonGroupAlignRight',
  elButtonGroupAlignCenter: 'elDeprecatedButtonGroupAlignCenter',

  // CSS Classes - Layout
  elMainContainer: 'elDeprecatedMainContainer',

  // CSS Classes - Menu
  elMenuItemLeftIcon: 'elDeprecatedMenuItemLeftIcon',

  // CSS Classes - Nav
  elNavItemSecondary: 'elDeprecatedNavItemSecondary',
  elNavItemActive: 'elDeprecatedNavItemActive',
  elNavItemExpanded: 'elDeprecatedNavItemExpanded',
  elNavItemIcon: 'elDeprecatedNavItemIcon',
  elNavSubItemExpanded: 'elDeprecatedNavSubItemExpanded',
  elNavSubItemActive: 'elDeprecatedNavSubItemActive',
  elNavItemHideDesktop: 'elDeprecatedNavItemHideDesktop',
  elNavIsHidden: 'elDeprecatedNavIsHidden',

  // CSS Classes - PageHeader
  elPageHeaderMaxWidth: 'elDeprecatedPageHeaderMaxWidth',

  // CSS Classes - Pagination
  elPaginationPrimary: 'elDeprecatedPaginationPrimary',

  // CSS Classes - StatusIndicator
  elShapeTag: 'elDeprecatedShapeTag',
}

/**
 * Checks if a module specifier is a v4-style import from @reapit/elements or a facade package.
 * v4 imports are bare package imports without subpaths (e.g., '@reapit/elements')
 * v5 imports use subpaths (e.g., '@reapit/elements/core/button') and should NOT be transformed.
 *
 * INTENTIONAL DIVERGENCE from codemods/shared/elements-import.ts:
 * The shared isElementsImport helper matches BOTH the bare package name and any subpath
 * (e.g. '@reapit/elements/core/button'). This codemod deliberately does NOT use the shared
 * version because its job is to rewrite v4-style barrel imports. If we matched subpath
 * imports here we would incorrectly transform v5 import statements, breaking already-migrated
 * code. This local version restricts @reapit/elements matching to the exact bare package name
 * only; facade packages still use prefix matching (they may legitimately use subpaths in v4).
 */
function isElementsImport(moduleSpecifier: string, facadePackage?: string): boolean {
  // For @reapit/elements, only match the exact package name (v4 style)
  // Do NOT match subpath imports like '@reapit/elements/core/button' (v5 style)
  const isV4ElementsImport = moduleSpecifier === '@reapit/elements'

  // For facade packages, match both exact and subpath imports
  const isFacadeImport = facadePackage !== undefined && matchesPackage(moduleSpecifier, facadePackage)

  return isV4ElementsImport || isFacadeImport
}

/**
 * Determines if a name should be transformed to its deprecated version.
 * Returns the deprecated name if transformation is needed, null otherwise.
 */
function getDeprecatedName(name: string): string | null {
  // Already using deprecated version - no change
  if (name.startsWith('Deprecated')) {
    return null
  }

  // Direct component match
  if (moduleTransformations[name]) {
    return moduleTransformations[name]
  }

  // Auto-detect Props types (e.g., ButtonProps -> DeprecatedButtonProps)
  if (name.endsWith('Props')) {
    const componentName = name.slice(0, -5) // Remove 'Props' suffix
    if (moduleTransformations[componentName]) {
      return moduleTransformations[componentName] + 'Props'
    }
  }

  return null
}

/**
 * Transforms imports in a source file to use deprecated component aliases.
 */
function transformImports(sourceFile: SourceFile, facadePackage?: string): void {
  const importDeclarations = sourceFile.getImportDeclarations()

  for (const importDecl of importDeclarations) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    // Only process @reapit/elements or facade package imports
    if (!isElementsImport(moduleSpecifier, facadePackage)) {
      continue
    }

    const namedImports = importDecl.getNamedImports()

    for (const namedImport of namedImports) {
      const originalName = namedImport.getName()
      const deprecatedName = getDeprecatedName(originalName)

      if (!deprecatedName) {
        // No transformation needed (already deprecated or not in mapping)
        continue
      }

      // Get the alias if one exists, otherwise use the original name
      const existingAlias = namedImport.getAliasNode()?.getText()
      const aliasToUse = existingAlias ?? originalName

      // Check if this is an inline type import (e.g., `import { type ButtonProps }`)
      const isTypeOnly = namedImport.isTypeOnly()
      const typePrefix = isTypeOnly ? 'type ' : ''

      // Replace the import with deprecated version aliased back to original usage
      namedImport.replaceWithText(`${typePrefix}${deprecatedName} as ${aliasToUse}`)
    }
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  const sourceFile = createProjectFromSource(source, filePath)

  transformImports(sourceFile, options?.facadePackage)

  return sourceFile.getFullText()
}
