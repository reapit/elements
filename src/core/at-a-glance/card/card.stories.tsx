import preview from "#.storybook/preview";
import { Badge } from "#src/core/badge";
import { SproutIcon } from "#src/icons/sprout";

import { AtAGlance } from "../at-a-glance";
import { AtAGlanceCard } from "./card";

const meta = preview.meta({
  title: "Content display/AtAGlance/Card",
  component: AtAGlance.Card,
});

/**
 * Card provides a composition API for building custom AtAGlance cards. The AtAGlance.CardIcon,
 * AtAGlance.CardLabel, AtAGlance.CardDescription, and AtAGlance.CardValue subcomponents can be
 * used as children, as well as other custom components.
 *
 * Direct use of Card should be reserved for custom layouts with the `grid` prop, though the canned
 * vertical, compact and horizontal layouts are still available via the `layout` prop. Whether grid
 * layout is used, consumers must handle any accessibility requirements. The `AtAGlance.ArticleCard`,
 * `AtAGlance.AnchorCard`, or `AtAGlance.ButtonCard` all provide built-in accessibility for the canned
 * layouts.
 */
export const Example = meta.story({
  args: {} as AtAGlanceCard.AsArticleProps,
  render: () => (
    <AtAGlance.Card layout="vertical">
      <AtAGlance.CardIcon>
        <SproutIcon />
      </AtAGlance.CardIcon>
      <AtAGlance.CardLabel>Apple</AtAGlance.CardLabel>
      <AtAGlance.CardDescription>Crunchy and Juicy</AtAGlance.CardDescription>
      <AtAGlance.CardValue>32</AtAGlance.CardValue>
    </AtAGlance.Card>
  ),
});

/**
 * The Card is polymorphic, supporting `a`, `article` and `button` elements via the `as` prop.
 *
 * The elements used by the built-in subcomponents will automatically change based on `as`.
 * Specifically, for `a` and `button`, descendants will be `<span>` elements.
 *
 * Accessibility props, like `aria-labelledby` and `aria-describedby`, must be manually handled.
 * `AtAGlance.AnchorCard` and `AtAGlance.ButtonCard` take care of this internally, though they
 * only support the built-in subcomponents (description, icon, label and value).
 */
export const Polymorphism = meta.story({
  args: {} as AtAGlanceCard.AsAnchorProps,
  render: () => (
    <AtAGlance.Card aria-label="Apple: 32" as="a" href="#" layout="compact">
      <AtAGlance.CardIcon>
        <SproutIcon />
      </AtAGlance.CardIcon>
      <AtAGlance.CardLabel>Apple</AtAGlance.CardLabel>
      <AtAGlance.CardDescription>Click to view details</AtAGlance.CardDescription>
      <AtAGlance.CardValue>32</AtAGlance.CardValue>
    </AtAGlance.Card>
  ),
});

/**
 * When using a custom grid layout with custom components, each component should be assigned a specific
 * `grid-area` that is referenced in the `grid`. The `useAtAGlanceCardContext` hook can be used to
 * facilitate dynamic HTML element choice within the custom components based on the Card's `as` prop.
 *
 * Note the need to apply inline styles (or custom classes) to descendants in order to space them out.
 */
export const CustomLayout = meta.story({
  args: {} as AtAGlanceCard.AsButtonProps,
  render: () => (
    <AtAGlance.Card
      as="button"
      aria-label="Apples: 32, up 5%"
      onClick={() => alert("Clicked!")}
      grid="'icon label value trend' auto / min-content 1fr auto auto"
      maxWidth="300px"
      style={{ alignItems: "center" }}
    >
      <AtAGlance.CardIcon style={{ marginInlineEnd: "var(--spacing-2)" }}>
        <SproutIcon />
      </AtAGlance.CardIcon>
      <AtAGlance.CardLabel>Apple</AtAGlance.CardLabel>
      <AtAGlance.CardValue>32</AtAGlance.CardValue>
      <Badge
        colour="success"
        style={{ gridArea: "trend", alignSelf: "center", marginInlineStart: "var(--spacing-2)" }}
        variant="reversed"
      >
        +5%
      </Badge>
    </AtAGlance.Card>
  ),
});
