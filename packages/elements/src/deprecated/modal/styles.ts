import { styled } from "@linaria/react";

import { elIsActive } from "../../styles/deprecated-states";

/**
 * @deprecated
 */
export const ElModalBg = styled.div`
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

/**
 * @deprecated
 */
export const ElModal = styled.div`
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 16px 0 rgb(34 43 51 / 0.16);
  border-radius: 0.25rem /* was --default-border-radius */;
  background: white;
  z-index: 99;
  width: 65%;
  min-width: 300px;
  max-width: 800px;
  max-height: 80vh;
  overflow: auto;
  padding: 1.25rem 1.5rem;

  &.${elIsActive} {
    display: block;
    position: fixed;
  }
`;

/**
 * @deprecated
 */
export const ElModalHeader = styled.div`
  color: var(--colour-text-primary);
  font-family:
    "Inter",
    /* was --font-sans-serif */ Helvetica,
    Arial,
    sans-serif;
  font-weight: 400 /* was --font-weight-default */;
  font-size: 1.25rem /* was --font-size-subheading */;
  margin-bottom: 1rem;
  text-align: left;
`;

/**
 * @deprecated
 */
export const ElModalBody = styled.div`
  font-size: 0.9375rem /* was --font-size-default */;
`;
