---
'@reapit/elements': major
---

Removed: direct named exports of sub-components that are accessible via their parent component namespace. Affected components: `Accordion`, `AppSwitcher`, `AtAGlance`, `Autocomplete`, `BottomBar`, `Breadcrumbs`, `ButtonGroup`, `CheckboxGroupControl`, `ChipSelect`, `CompactSelect`, `DescriptionList`, `Drawer`, `Features`, `FilterBar`, `FocusedLayout`, `FolderTabs`, `FormControl`, `Menu`, `OfficeSwitcher`, `PageHeader`, `PageLayout`, `Pagination`, `PrimaryTabs`, `RadioGroupControl`, `SecondaryTabs`, `Select`, `SideBar`, `SplitButton`, `SupplementaryInfo`, `Table`, `TagGroup`, and `TopBar`.

To migrate, import the parent component and access the sub-component via the namespace. For example:

```ts
// Before
import { AccordionSummary, DrawerBody, TableBody } from '@reapit/elements'

// After
import { Accordion, Drawer, Table } from '@reapit/elements'
// AccordionSummary → Accordion.Summary
// DrawerBody       → Drawer.Body
// TableBody        → Table.Body
```
