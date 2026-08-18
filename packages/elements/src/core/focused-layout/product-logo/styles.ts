import { css } from "@linaria/core";

export const elProductDevice = css`
  @layer elements.main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;

    & > svg {
      width: 100%;
      height: 100%;
    }
  }
`;
