import { styled } from "@linaria/react";

const checked =
  "data:image/svg+xml,%3Csvg%20width%3D%2212px%22%20height%3D%2212px%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.3608%2013.8296L18.0208%2019.4896C18.2652%2019.775%2018.6489%2019.8993%2019.0142%2019.8114C19.3795%2019.7235%2019.6647%2019.4383%2019.7526%2019.073C19.8405%2018.7077%2019.7162%2018.324%2019.4308%2018.0796L13.7708%2012.4196L19.4308%206.75958C19.7162%206.51519%2019.8405%206.13146%2019.7526%205.76616C19.6647%205.40086%2019.3795%205.11564%2019.0142%205.02777C18.6489%204.93989%2018.2652%205.0642%2018.0208%205.34958L12.3608%2011.0096L6.70079%205.34958C6.31076%204.96185%205.68083%204.96185%205.29079%205.34958C4.90307%205.73961%204.90307%206.36954%205.29079%206.75958L10.9508%2012.4196L5.29079%2018.0796C4.90307%2018.4696%204.90307%2019.0995%205.29079%2019.4896C5.68083%2019.8773%206.31076%2019.8773%206.70079%2019.4896L12.3608%2013.8296Z%22%20fill%3D%22slategray%22%20%2F%3E%3C%2Fsvg%3E";

/** @deprecated */
export const ElDeprecatedChipCheckbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;

  &:checked + label,
  &:hover + label {
    background: var(--colour-fill-action-lightest);
    padding: 0.2rem 2rem 0.2rem 1rem;
    color: var(--colour-text-primary);

    &::before {
      content: "";
      position: absolute;
      background-image: url(${checked});
      background-position: center center;
      background-repeat: no-repeat;
      height: 1rem;
      width: 1rem;
      right: 0.5rem;
      top: 0.25rem;
    }
  }
`;

/** @deprecated */
export const ElDeprecatedChipLabel = styled.label`
  cursor: pointer;
  width: auto;
  height: 28px;
  background: var(--colour-fill-action-lightest);
  border: 1px solid var(--colour-fill-action-lightest);
  border-radius: 1rem;
  padding: 0.2rem 1.5rem;
  position: relative;
  font-size: 0.875rem /* was --font-size-small */;
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--colour-text-secondary);

  &:hover {
    color: var(--colour-text-tertiary);
  }
`;

/** @deprecated */
export const ElDeprecatedChipGroup = styled.div`
  display: grid;
`;

/** @deprecated */
export const ElDeprecatedChipGroupInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-auto-flow: column;
  gap: 0.25rem;
  width: fit-content;
  height: fit-content;
`;
