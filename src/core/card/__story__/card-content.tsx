import type { ReactNode } from 'react'

interface CardContentProps {
  /**
   * Overrides the default "Content area" and "Replace with your content" text.
   * Useful when a story needs to label the content with something specific,
   * e.g. the element name being demonstrated.
   */
  children?: ReactNode
}

/**
 * A visual placeholder that mimics the "Temporary content" annotation used in
 * Figma designs. Renders a dashed-border box with a label and sub-label so stories
 * show realistic card proportions without requiring real content.
 *
 * Pass `children` to replace the default text with custom content.
 */
export function CardContent({ children }: CardContentProps) {
  return (
    <div
      style={{
        border: '1px dashed #FA00FF80',
        borderRadius: 'var(--border-radius-m)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-10) var(--spacing-3)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {children !== undefined ? (
          <p
            style={{
              fontSize: 'var(--font-sm-medium-size)',
              fontWeight: 'var(--font-sm-medium-weight)',
              lineHeight: 'var(--font-sm-medium-line_height)',
              letterSpacing: 'var(--font-sm-medium-letter_spacing)',
              color: '#FA00FF',
              margin: 0,
            }}
          >
            {children}
          </p>
        ) : (
          <>
            <p
              style={{
                fontSize: 'var(--font-sm-medium-size)',
                fontWeight: 'var(--font-sm-medium-weight)',
                lineHeight: 'var(--font-sm-medium-line_height)',
                letterSpacing: 'var(--font-sm-medium-letter_spacing)',
                color: '#FA00FF',
                margin: 0,
              }}
            >
              Content area
            </p>
            <p
              style={{
                fontSize: 'var(--font-2xs-regular-size)',
                fontWeight: 'var(--font-2xs-regular-weight)',
                lineHeight: 'var(--font-2xs-regular-line_height)',
                letterSpacing: 'var(--font-2xs-regular-letter_spacing)',
                color: '#FA00FF',
                margin: 0,
              }}
            >
              Replace with your content
            </p>
          </>
        )}
      </div>
    </div>
  )
}
