import { cx } from "@linaria/core";
import React, { FC, HTMLAttributes } from "react";

import { isWidthAtOrAbove, isWidthBelow } from "#src/utils/breakpoints";
import { useMatchMedia } from "#src/utils/match-media";

import { ElGrid, ElCol } from "./__styles__";
import * as units from "./__styles__/units";

interface BreakpointFlags {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWideScreen: boolean;
  isSuperWideScreen: boolean;
  is4KScreen: boolean;
}

const useBreakpointFlags = (): BreakpointFlags => ({
  isMobile: useMatchMedia(isWidthBelow("SM")),
  isTablet: useMatchMedia(`${isWidthAtOrAbove("SM")} and ${isWidthBelow("MD")}`),
  isDesktop: useMatchMedia(`${isWidthAtOrAbove("MD")} and ${isWidthBelow("LG")}`),
  isWideScreen: useMatchMedia(`${isWidthAtOrAbove("LG")} and ${isWidthBelow("XL")}`),
  isSuperWideScreen: useMatchMedia(`${isWidthAtOrAbove("XL")} and ${isWidthBelow("2XL")}`),
  is4KScreen: useMatchMedia(isWidthAtOrAbove("2XL")),
});

/** @deprecated */
export type GridUnitType = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12;
/** @deprecated */
export type ColUnitType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

/** @deprecated */
export interface GridResponsiveProps extends HTMLAttributes<HTMLElement> {
  colGapMobile?: GridUnitType;
  colGapTablet?: GridUnitType;
  colGapDesktop?: GridUnitType;
  colGapWideScreen?: GridUnitType;
  colGapSuperWideScreen?: GridUnitType;
  colGap4KScreen?: GridUnitType;
  rowGapMobile?: GridUnitType;
  rowGapTablet?: GridUnitType;
  rowGapDesktop?: GridUnitType;
  rowGapWideScreen?: GridUnitType;
  rowGapSuperWideScreen?: GridUnitType;
  rowGap4KScreen?: GridUnitType;
}

/** @deprecated */
export interface ColResponsiveProps extends HTMLAttributes<HTMLElement> {
  spanMobile?: ColUnitType;
  spanTablet?: ColUnitType;
  spanDesktop?: ColUnitType;
  spanWideScreen?: ColUnitType;
  spanSuperWideScreen?: ColUnitType;
  span4KScreen?: ColUnitType;
  offsetMobile?: ColUnitType;
  offsetTablet?: ColUnitType;
  offsetDesktop?: ColUnitType;
  offsetWideScreen?: ColUnitType;
  offsetSuperWideScreen?: ColUnitType;
  offset4KScreen?: ColUnitType;
}

/** @deprecated */
export const getGridClasses = (
  props: GridResponsiveProps,
  mediaType: BreakpointFlags,
): string | null => {
  const {
    colGapMobile,
    colGapTablet,
    colGapDesktop,
    colGapWideScreen,
    colGapSuperWideScreen,
    colGap4KScreen,
    rowGapMobile,
    rowGapTablet,
    rowGapDesktop,
    rowGapWideScreen,
    rowGapSuperWideScreen,
    rowGap4KScreen,
  } = props;

  const { isMobile, isTablet, isDesktop, isWideScreen, isSuperWideScreen, is4KScreen } = mediaType;

  if (isMobile) {
    return cx(
      colGapMobile && units[`elColGap${colGapMobile}`],
      rowGapMobile && units[`elRowGap${rowGapMobile}`],
    );
  }

  if (isTablet) {
    return cx(
      colGapTablet && units[`elColGap${colGapTablet}`],
      rowGapTablet && units[`elRowGap${rowGapTablet}`],
    );
  }

  if (isDesktop) {
    return cx(
      colGapDesktop && units[`elColGap${colGapDesktop}`],
      rowGapDesktop && units[`elRowGap${rowGapDesktop}`],
    );
  }

  if (isWideScreen) {
    return cx(
      colGapWideScreen && units[`elColGap${colGapWideScreen}`],
      rowGapWideScreen && units[`elRowGap${rowGapWideScreen}`],
    );
  }

  if (isSuperWideScreen) {
    return cx(
      colGapSuperWideScreen && units[`elColGap${colGapSuperWideScreen}`],
      rowGapSuperWideScreen && units[`elRowGap${rowGapSuperWideScreen}`],
    );
  }

  if (is4KScreen) {
    return cx(
      colGap4KScreen && units[`elColGap${colGap4KScreen}`],
      rowGap4KScreen && units[`elRowGap${rowGap4KScreen}`],
    );
  }

  return null;
};

/** @deprecated */
export const getColClasses = (
  props: ColResponsiveProps,
  mediaType: BreakpointFlags,
): string | null => {
  const {
    spanMobile,
    spanTablet,
    spanDesktop,
    spanWideScreen,
    spanSuperWideScreen,
    span4KScreen,
    offsetMobile,
    offsetTablet,
    offsetDesktop,
    offsetWideScreen,
    offsetSuperWideScreen,
    offset4KScreen,
  } = props;

  const { isMobile, isTablet, isDesktop, isWideScreen, isSuperWideScreen, is4KScreen } = mediaType;

  if (isMobile) {
    return cx(
      spanMobile && units[`elSpan${spanMobile}`],
      offsetMobile && units[`elOffset${offsetMobile}`],
    );
  }

  if (isTablet) {
    return cx(
      spanTablet && units[`elSpan${spanTablet}`],
      offsetTablet && units[`elOffset${offsetTablet}`],
    );
  }

  if (isDesktop) {
    return cx(
      spanDesktop && units[`elSpan${spanDesktop}`],
      offsetDesktop && units[`elOffset${offsetDesktop}`],
    );
  }

  if (isWideScreen) {
    return cx(
      spanWideScreen && units[`elSpan${spanWideScreen}`],
      offsetWideScreen && units[`elOffset${offsetWideScreen}`],
    );
  }

  if (isSuperWideScreen) {
    return cx(
      spanSuperWideScreen && units[`elSpan${spanSuperWideScreen}`],
      offsetSuperWideScreen && units[`elOffset${offsetSuperWideScreen}`],
    );
  }

  if (is4KScreen) {
    return cx(
      span4KScreen && units[`elSpan${span4KScreen}`],
      offset4KScreen && units[`elOffset${offset4KScreen}`],
    );
  }

  return null;
};

/** @deprecated */
export const GridResponsive: FC<GridResponsiveProps> = (props: GridResponsiveProps) => {
  const { className, children, ...rest } = props;
  const mediaType = useBreakpointFlags();
  const gridClasses = getGridClasses(props, mediaType);
  return (
    <ElGrid className={cx(gridClasses, className)} {...rest}>
      {children}
    </ElGrid>
  );
};

/** @deprecated */
export const ColResponsive: FC<ColResponsiveProps> = (props: ColResponsiveProps) => {
  const { className, children, ...rest } = props;
  const mediaType = useBreakpointFlags();
  const colClasses = getColClasses(props, mediaType);
  return (
    <ElCol className={cx(colClasses, className)} {...rest}>
      {children}
    </ElCol>
  );
};
