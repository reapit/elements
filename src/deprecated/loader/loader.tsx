import React, { FC, HTMLAttributes } from "react";

import { elIsFullPage } from "../../styles/deprecated-states";
import { ElLoaderContainer, ElLoaderLabel, ElLoader, ElLoaderMovingBar } from "./__styles__";

/** @deprecated */
export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  fullPage?: boolean;
}

/** @deprecated */
export const Loader: FC<LoaderProps> = ({ label, fullPage, ...rest }) => {
  return (
    <ElLoaderContainer className={fullPage ? elIsFullPage : ""}>
      {label && <ElLoaderLabel>{label}</ElLoaderLabel>}
      <ElLoader {...rest}>
        <ElLoaderMovingBar />
      </ElLoader>
    </ElLoaderContainer>
  );
};
