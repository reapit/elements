function isCSSContentFieldSizingSupported(): boolean {
  return CSS.supports('field-sizing', 'content')
}

export default isCSSContentFieldSizingSupported
