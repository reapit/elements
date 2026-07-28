import { styled } from "@linaria/react";

import { isTablet } from "../../../styles/deprecated-media";
import { elIsActive } from "../../../styles/deprecated-states";

/** @deprecated */
export const ElDeprecatedDrawerBg = styled.div`
  display: none;
  z-index: 98;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: var(--colour-fill-neutral-dark);
  opacity: 0.2;

  &.${elIsActive} {
    display: block;
    position: fixed;
  }
`;

/** @deprecated */
export const ElDeprecatedDrawer = styled.div`
  display: none;
  top: 0;
  box-shadow: 0 4px 16px 0 rgb(34 43 51 / 0.16);
  background: white;
  z-index: 99;
  width: 100%;
  height: 100%;

  &.${elIsActive} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
  }

  ${isTablet} {
    right: -480px;
    width: 480px;

    &.${elIsActive} {
      transform: translate(-480px, 0);
    }
  }
`;

/** @deprecated */
export const ElDeprecatedDrawerHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--colour-border-neutral-light_default);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

/** @deprecated */
export const ElDeprecatedDrawerSubtitle = styled.div`
  color: var(--colour-text-secondary);
  font-size: 0.9375rem /* was --font-size-default */;
`;

/** @deprecated */
export const ElDeprecatedDrawerTitle = styled.div`
  color: var(--colour-text-primary);
  font-weight: 600 /* was --font-weight-bold */;
  font-size: 1.125rem /* was --font-size-small-subheading */;

  &:has(~ ${ElDeprecatedDrawerSubtitle}) {
    margin-bottom: 0.25rem;
  }
`;

/** @deprecated */
export const ElDeprecatedDrawerBody = styled.div`
  padding: 1.5rem 2rem;
  height: 100%;
`;

/** @deprecated */
export const ElDeprecatedDrawerFooter = styled.div`
  border-top: 1px solid var(--colour-border-neutral-light_default);
  padding: 0.875rem 2rem;
`;
