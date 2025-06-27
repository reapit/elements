import { styled } from '@linaria/react'

const checked = `data:image/svg+xml;utf8,<svg width="12px" height="12px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3608 13.8296L18.0208 19.4896C18.2652 19.775 18.6489 19.8993 19.0142 19.8114C19.3795 19.7235 19.6647 19.4383 19.7526 19.073C19.8405 18.7077 19.7162 18.324 19.4308 18.0796L13.7708 12.4196L19.4308 6.75958C19.7162 6.51519 19.8405 6.13146 19.7526 5.76616C19.6647 5.40086 19.3795 5.11564 19.0142 5.02777C18.6489 4.93989 18.2652 5.0642 18.0208 5.34958L12.3608 11.0096L6.70079 5.34958C6.31076 4.96185 5.68083 4.96185 5.29079 5.34958C4.90307 5.73961 4.90307 6.36954 5.29079 6.75958L10.9508 12.4196L5.29079 18.0796C4.90307 18.4696 4.90307 19.0995 5.29079 19.4896C5.68083 19.8773 6.31076 19.8773 6.70079 19.4896L12.3608 13.8296Z" fill="slategray"/>
</svg>
`

/** @deprecated */
export const ElDeprecatedChipCheckbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;

  &:checked + label,
  &:hover + label {
    background: var(--purple-050);
    padding: 0.2rem 2rem 0.2rem 1rem;
    color: var(--black);

    &::before {
      content: '';
      position: absolute;
      background-image: url('${checked}');
      background-position: center center;
      background-repeat: no-repeat;
      height: 1rem;
      width: 1rem;
      right: 0.5rem;
      top: 0.25rem;
    }
  }
`

/** @deprecated */
export const ElDeprecatedChipLabel = styled.label`
  cursor: pointer;
  width: auto;
  height: 28px;
  background: var(--purple-050);
  border: 1px solid var(--purple-050);
  border-radius: 1rem;
  padding: 0.2rem 1.5rem;
  position: relative;
  font-size: var(--font-size-small);
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neutral-500);

  &:hover {
    color: var(--neutral-700);
  }
`

/** @deprecated */
export const ElDeprecatedChipGroup = styled.div`
  display: grid;
`

/** @deprecated */
export const ElDeprecatedChipGroupInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-auto-flow: column;
  gap: 0.25rem;
  width: fit-content;
  height: fit-content;
`
