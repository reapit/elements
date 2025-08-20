// NOTE: We omit...
// - size, because our empty data actions are always medium in size
// - variant, because our empty data actions are always tertiary buttons
// - useLinkStyle, because our empty data actions should always use the tertiary button's link styling
export type AttributesToOmit = 'size' | 'variant' | 'useLinkStyle'
