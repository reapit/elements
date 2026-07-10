import { Button } from '#src/core/button'
import { EmptyState } from './empty-state'
import preview from '#.storybook/preview'

const meta = preview.meta({
  title: 'Indicators and status/EmptyState',
  component: EmptyState,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Action only', 'Short description', 'Full description', 'Everything'],
      mapping: {
        'Action only': (
          <Button useLinkStyle variant="tertiary">
            Add item
          </Button>
        ),
        'Short description': <EmptyState.Description>No items found</EmptyState.Description>,
        'Full description': (
          <EmptyState.Description secondaryText="Secondary text">No items found</EmptyState.Description>
        ),
        Everything: (
          <>
            <ExampleIllustration />
            <EmptyState.Description secondaryText="We’re sorry, but this office no longer has access to Reapit PM. If you have any questions, we’re here to help.">
              Your access has changed
            </EmptyState.Description>
            <Button variant="primary">Chat with Support</Button>
          </>
        ),
      },
    },
    height: {
      control: 'text',
      table: {
        type: {
          summary: '--size-*',
        },
      },
    },
  },
})

export const Example = meta.story({
  args: {
    background: 'neutral-lightest',
    children: 'Everything',
    size: 'small',
  },
})

/**
 * The element's width will fill the space provided by its parent container up to a maximum
 * defined by the chosen size. Parents are responsible for positioning the empty state as they
 * desire, such as horizontally centred.
 */
export const Layout = Example.extend({
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          boxSizing: 'content-box',
          border: '1px solid #FA00FF',
          width: '600px',
        }}
      >
        <Story />
      </div>
    ),
  ],
})

/**
 * By default, the empty state will have a neutral-lightest background. For a card-style appearance
 * against a lighter page, a white background can be applied. A transparent background is also available.
 */
export const Background = Example.extend({
  args: {
    background: 'white',
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
})

/**
 * Two sizes are available. The internal spacing, radius and maximum width of the empty state change
 * based on the size.
 */
export const Size = Background.extend({
  args: {
    size: 'large',
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
})

function ExampleIllustration() {
  return (
    <svg
      width="160"
      height="138"
      viewBox="0 0 160 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M40.1772 48.7362C50.8973 41.0396 84.2419 21.8943 121.528 48.8094C123.78 50.4359 125.127 53.0303 125.127 55.8076V97.9465C125.127 103.009 122.818 107.795 118.86 110.948L91.6126 132.641C85.589 137.438 77.0574 137.468 71.0005 132.711L42.9412 110.686C38.9266 107.536 36.585 102.716 36.585 97.6138V55.7311C36.585 52.9571 37.9254 50.3561 40.1772 48.7396V48.7362Z"
        fill="white"
      />
      <path
        d="M80.8576 61.8551C69.0332 61.8551 59.4473 71.441 59.4473 83.2655C59.4473 95.0899 69.0332 104.676 80.8576 104.676C92.682 104.676 102.268 95.0899 102.268 83.2655C102.268 71.441 92.682 61.8551 80.8576 61.8551ZM84.6328 93.1208H77.0824C75.8518 93.1208 74.9704 91.93 75.3329 90.7526L76.8729 85.7301C77.2787 84.403 77.1091 82.9495 76.344 81.792C75.7187 80.844 75.3828 79.6899 75.4626 78.4525C75.6422 75.6952 77.9339 73.4899 80.698 73.4101C83.758 73.3203 86.2626 75.775 86.2626 78.8151C86.2626 79.8994 85.9433 80.9072 85.3945 81.7554C84.6295 82.9328 84.4299 84.3864 84.8423 85.7301L86.3823 90.7526C86.7449 91.93 85.8635 93.1208 84.6328 93.1208Z"
        fill="#7E9BFA"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M80.8577 0C97.4909 0.000251841 110.979 13.4855 110.979 30.1222V40.9354C114.682 42.7969 118.444 45.0696 122.246 47.8141C124.812 49.6676 126.354 52.63 126.355 55.8077V97.9466C126.354 103.383 123.875 108.522 119.626 111.908L119.624 111.909L92.377 133.601C91.7076 134.134 91.0074 134.609 90.2863 135.033H158.772C159.45 135.033 160 135.582 160 136.26C160 136.938 159.45 137.488 158.772 137.488H1.22757C0.549601 137.488 0 136.938 0 136.26C0 135.582 0.549601 135.033 1.22757 135.033H72.2348C71.7668 134.758 71.307 134.462 70.8598 134.141L70.2424 133.677L42.1833 111.651C37.8718 108.268 35.3574 103.092 35.3574 97.6133V55.7309C35.3574 52.5862 36.8651 49.6381 39.3985 47.7889C39.419 47.772 39.4391 47.7542 39.4608 47.7385C42.0173 45.9031 45.8594 43.4154 50.7355 41.0433V30.1222C50.7355 13.4888 64.2209 0 80.8577 0ZM120.809 49.8041C93.2777 29.9309 67.9592 35.6011 52.5865 42.8714C52.5233 42.9088 52.4573 42.9416 52.3875 42.9673C47.4278 45.3306 43.5179 47.85 40.9234 49.7106C40.9129 49.7186 40.9042 49.7292 40.8934 49.7369C38.9616 51.1237 37.8126 53.354 37.8125 55.7309V97.6133C37.8125 102.339 39.981 106.803 43.6986 109.72L71.7589 131.746C77.3681 136.15 85.2688 136.122 90.8473 131.681L118.095 109.987C121.761 107.067 123.899 102.635 123.899 97.9466V55.8077C123.899 53.4308 122.746 51.2034 120.809 49.8041ZM80.8577 2.45514C65.577 2.45514 53.1907 14.8446 53.1907 30.1222V39.902C66.5229 33.9742 86.3723 29.6228 108.524 39.7569V30.1222C108.524 14.8416 96.1351 2.45539 80.8577 2.45514Z"
        fill="#222B33"
      />
      <path
        d="M32.4647 114.052C32.8929 113.527 33.6665 113.448 34.1921 113.876C34.7174 114.305 34.7964 115.078 34.3683 115.604L26.3124 125.493C25.8842 126.018 25.1104 126.097 24.585 125.669C24.0595 125.241 23.9809 124.467 24.4087 123.941L32.4647 114.052Z"
        fill="#222B33"
      />
      <path
        d="M26.5702 103.028C27.2313 102.878 27.8888 103.294 28.0387 103.955C28.188 104.616 27.7741 105.274 27.1132 105.424L17.753 107.545C17.0924 107.695 16.4347 107.28 16.2845 106.62C16.1346 105.959 16.55 105.301 17.2111 105.151L26.5702 103.028Z"
        fill="#222B33"
      />
      <path
        d="M145.347 45.2642C145.957 44.9676 146.691 45.2218 146.988 45.8313C147.285 46.4407 147.031 47.1757 146.421 47.4724L137.793 51.673C137.184 51.9694 136.449 51.7162 136.152 51.1072C135.856 50.4977 136.11 49.7628 136.719 49.466L145.347 45.2642Z"
        fill="#222B33"
      />
      <path
        d="M132.918 29.747C133.215 29.1382 133.95 28.8844 134.559 29.1811C135.168 29.4781 135.422 30.2141 135.125 30.8235L129.537 42.2912C129.24 42.9007 128.504 43.154 127.895 42.857C127.286 42.5599 127.032 41.8251 127.329 41.2159L132.918 29.747Z"
        fill="#222B33"
      />
    </svg>
  )
}
