interface PatternProps {
  height?: string
}

export function Pattern({ height = '100cqh' }: PatternProps) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        backgroundSize: '11px 11px',
        backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1.1px, #F2CCFF 0, #F2CCFF 50%)',
        border: '4px solid #F2CCFF',
        boxSizing: 'content-box',
        height,
      }}
    />
  )
}
