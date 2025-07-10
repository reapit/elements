import { PropertyIcon } from '#src/icons/property'

/** A fake image for use in stories. Should be replaced with a proper "image" component when we have one. */
export function FakeImage() {
  return (
    <div
      style={{
        aspectRatio: '4/3',
        display: 'flex',
        placeItems: 'center',
        placeContent: 'center',
        width: '100%',
        backgroundColor: 'var(--colour-fill-neutral-light)',
        borderRadius: 'var(--border-radius-m)',
      }}
    >
      <PropertyIcon color="primary" size="lg" />
    </div>
  )
}
