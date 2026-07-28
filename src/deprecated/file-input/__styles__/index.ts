import { styled } from "@linaria/react";

import { elButton } from "../../../core/button/styles";

/** @deprecated */
export const ElFileInputLabel = styled.label`
  font-size: 0.875rem /* was --font-size-small */;
  color: var(--colour-text-secondary);
`;

/** @deprecated */
export const ElFileInput = styled.input`
  &[type="file"] {
    font-family:
      "Inter",
      /* was --font-sans-serif */ Helvetica,
      Arial,
      sans-serif;
    position: absolute;
    height: 34px;
    width: 5.5rem;
    opacity: 0;
    z-index: 10;
    cursor: pointer;

    &::file-selector-button {
      visibility: hidden;
      width: 0;
    }
  }
`;

/** @deprecated */
export const ElFileInputWrap = styled.div`
  display: inline-block;
  position: relative;

  .${elButton} {
    height: 34px;
    padding: 1rem;
  }

  ${ElFileInputLabel} {
    height: 1.25rem;
    display: block;
  }
`;

/** @deprecated */
export const ElFileInputIconContainer = styled.div`
  display: flex;
  height: 34px;
`;

/** @deprecated */
export const ElFileInputHidden = styled.input`
  position: absolute;
  margin: 0;
  height: 0;
  width: 0;
  visibility: hidden;
  padding: 0;
`;

/** @deprecated */
export const ElFilePreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
