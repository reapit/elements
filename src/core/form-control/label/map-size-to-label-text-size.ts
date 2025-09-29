/**
 * Maps the size of the form control to the associated size of the label text.
 *
 * @param size the size of the form control being labelled
 * @returns the size of the label text. Will be undefined if no size is provided.
 */
export function mapSizeToLabelTextSize(size: 'small' | 'medium' | 'large' | undefined): 'xs' | 'sm' | undefined {
  switch (size) {
    case 'small':
    case 'medium':
      return 'xs'
    case 'large':
      return 'sm'
    default:
      return
  }
}
