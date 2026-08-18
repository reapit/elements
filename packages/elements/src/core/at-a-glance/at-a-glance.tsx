import type { HTMLAttributes } from "react";

import { AtAGlanceAnchorCard } from "./anchor-card";
import { AtAGlanceArticleCard } from "./article-card";
import { AtAGlanceButtonCard } from "./button-card";
import {
  AtAGlanceCard,
  AtAGlanceCardDescription,
  AtAGlanceCardIcon,
  AtAGlanceCardLabel,
  AtAGlanceCardValue,
} from "./card";
import { AtAGlanceCarousel } from "./carousel";
import { AtAGlanceGrid } from "./grid";
import { AtAGlanceGridItem } from "./grid/grid-item";
import { AtAGlanceHeader } from "./header";
import { AtAGlanceListbox } from "./listbox";
import { ElAtAGlance } from "./styles";

export namespace AtAGlance {
  export type CardProps = AtAGlanceCard.Props;
  export interface CardIconProps extends AtAGlanceCardIcon.Props {}
  export interface CardLabelProps extends AtAGlanceCardLabel.Props {}
  export interface CardDescriptionProps extends AtAGlanceCardDescription.Props {}
  export interface CardValueProps extends AtAGlanceCardValue.Props {}

  export interface ArticleCardProps extends AtAGlanceArticleCard.Props {}
  export interface AnchorCardProps extends AtAGlanceAnchorCard.Props {}
  export interface ButtonCardProps extends AtAGlanceButtonCard.Props {}

  export interface CarouselProps extends AtAGlanceCarousel.Props {}
  export interface GridProps extends AtAGlanceGrid.Props {}
  export interface GridItemProps extends AtAGlanceGridItem.Props {}
  export interface HeaderProps extends AtAGlanceHeader.Props {}
  export interface ListboxOptionProps extends AtAGlanceListbox.OptionProps {}
  export interface ListboxProps extends AtAGlanceListbox.BaseProps {}

  export interface Props extends HTMLAttributes<HTMLElement> {}
}

/**
 * At a glance is a set of cards used to summarise key information from a dataset.
 * Optionally, it can be used as a way to filter the dataset or link to another section
 * or page for additional information.
 */
export function AtAGlance(props: AtAGlance.Props) {
  return <ElAtAGlance {...props} />;
}

// Base polymorphic Card
AtAGlance.Card = AtAGlanceCard;

// Subcomponents for base Card
AtAGlance.CardIcon = AtAGlanceCardIcon;
AtAGlance.CardLabel = AtAGlanceCardLabel;
AtAGlance.CardDescription = AtAGlanceCardDescription;
AtAGlance.CardValue = AtAGlanceCardValue;

// Element-specific cards
AtAGlance.ArticleCard = AtAGlanceArticleCard;
AtAGlance.AnchorCard = AtAGlanceAnchorCard;
AtAGlance.ButtonCard = AtAGlanceButtonCard;

// Other components
AtAGlance.Carousel = AtAGlanceCarousel;
AtAGlance.Grid = AtAGlanceGrid;
AtAGlance.GridItem = AtAGlanceGrid.Item;
AtAGlance.Header = AtAGlanceHeader;
AtAGlance.Listbox = AtAGlanceListbox;
AtAGlance.ListboxOption = AtAGlanceListbox.Option;
