import { cx } from "@linaria/core";
import React, { FC, HTMLAttributes, ReactNode } from "react";

// imports all icons to support v4 string icon names (e.g. iconName="contact")
import * as allIcons from "#src/icons/docs/all-icons";
import type { IconProps } from "#src/icons/make-icon/make-icon";

import { Intent } from "../../helpers/intent";
import { elTextEllipsis } from "../../styles/deprecated-typography";
import { ColHalf, Col, Grid } from "../grid";
import { FlexContainer } from "../layout";
import { TextSM, TextXS } from "../typography";
import { ElKeyValueIconWrap, ElKeyValueListWrap } from "./__styles__";

const resolveDeprecatedIcon = (icon: ReactNode): ReactNode => {
  if (typeof icon !== "string") return icon;
  const componentName = icon.charAt(0).toUpperCase() + icon.slice(1) + "Icon";
  const IconComponent = (allIcons as unknown as Record<string, FC<IconProps>>)[componentName];
  return IconComponent ? <IconComponent size="md" color="primary" /> : null;
};

/** @deprecated */
export interface KeyValueItem {
  key: string;
  value: ReactNode;
  iconName?: ReactNode;
  icon?: ReactNode;
  intent?: Intent;
  colSize?: "half" | "full";
  textEllipsis?: boolean;
}

/** @deprecated */
export interface KeyValueContentProps {
  item: KeyValueItem;
}

/** @deprecated */
export interface KeyValueListProps extends HTMLAttributes<HTMLDivElement> {
  items: KeyValueItem[];
  hasGrid?: boolean;
}

/** @deprecated */
export const KeyValueIconWrap: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => (
  <ElKeyValueIconWrap className={cx(className)} {...rest}>
    {children}
  </ElKeyValueIconWrap>
);

/** @deprecated */
export const KeyValueListWrap: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => (
  <ElKeyValueListWrap className={cx(className)} {...rest}>
    {children}
  </ElKeyValueListWrap>
);

/** @deprecated */
export const KeyValueContent: FC<KeyValueContentProps> = ({
  item: { intent, iconName, icon, value, key, textEllipsis },
}) => (
  <>
    <KeyValueIconWrap>{resolveDeprecatedIcon(icon ?? iconName ?? "")}</KeyValueIconWrap>
    <FlexContainer isFlexColumn>
      <TextXS className={cx(textEllipsis && elTextEllipsis)} hasGreyText>
        {key}
      </TextXS>
      <TextSM className={cx(textEllipsis && elTextEllipsis)}>{value}</TextSM>
    </FlexContainer>
  </>
);

/** @deprecated */
export const KeyValueList: FC<KeyValueListProps> = ({ className, items, hasGrid, ...rest }) => {
  return hasGrid ? (
    <Grid className={cx(className)} {...rest}>
      {items.map((item) => {
        return item.colSize === "half" ? (
          <ColHalf key={item.key}>
            <FlexContainer>
              <KeyValueContent item={item} />
            </FlexContainer>
          </ColHalf>
        ) : (
          <Col key={item.key}>
            <FlexContainer>
              <KeyValueContent item={item} />
            </FlexContainer>
          </Col>
        );
      })}
    </Grid>
  ) : (
    <div role="list">
      {items.map((item) => (
        <KeyValueListWrap role="listitem" key={item.key}>
          <KeyValueContent item={item} />
        </KeyValueListWrap>
      ))}
    </div>
  );
};
