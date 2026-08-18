import { useState } from "react";

import preview from "#.storybook/preview";
import { Switch } from "#src/core/switch";
import { ErrorIcon } from "#src/icons/error";
import { InfoIcon } from "#src/icons/info";
import { WarningIcon } from "#src/icons/warning";

import { AlertBanner } from "../alert-banner";
import { AlertBannerOutlet } from "./outlet";
import { prioritiseByVariantAndDOMOrder } from "./prioritiseByVariantAndDOMOrder";

const meta = preview.meta({
  title: "Messaging/AlertBanner/Outlet",
  component: AlertBannerOutlet,
  argTypes: {
    children: {
      control: "radio",
      options: ["One", "Some", "Many"],
      mapping: {
        One: <AlertBanner variant="info">Did you know about this?</AlertBanner>,
        Some: (
          <>
            <AlertBanner variant="error">Something terrible has happened!</AlertBanner>
            <AlertBanner variant="warning">Hmm, you should be a little concerned.</AlertBanner>
          </>
        ),
        Many: (
          <>
            <AlertBanner variant="error">Something terrible has happened!</AlertBanner>
            <AlertBanner variant="info">You might like to know about this.</AlertBanner>
            <AlertBanner variant="warning">Hmm, you should be a little concerned.</AlertBanner>
            <AlertBanner variant="warning">One more slightly concerning thing.</AlertBanner>
            <AlertBanner variant="error">
              This is the second terrible thing that has happened!
            </AlertBanner>
          </>
        ),
      },
    },
    id: {
      control: "text",
    },
    prioritise: {
      table: {
        defaultValue: { summary: "prioritiseByVariantAndDOMOrder" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ containerType: "inline-size" }}>
        <Story />
      </div>
    ),
  ],
});

/**
 * Basic example showing a single alert banner within an outlet.
 * When only one banner is present, it will always be displayed.
 */
export const Example = meta.story({
  args: {
    children: "One",
  },
});

/**
 * Demonstrates priority-based visibility when multiple banners are present.
 * The outlet automatically shows only the highest priority banner (error > warning > info).
 * In this example, the error banner is displayed while others remain hidden.
 */
export const Many = meta.story({
  args: {
    children: "Many",
  },
});

/**
 * Shows how the outlet responds to dynamic changes in banner visibility.
 * Toggle the switches to add or remove banners - the outlet will automatically
 * re-evaluate which banner to display based on priority.
 */
export const DynamicDisplay = meta.story({
  render: () => {
    const [showInfo, setShowInfo] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showError, setShowError] = useState(false);

    return (
      <div>
        <div style={{ marginBottom: "var(--spacing-6)", display: "flex", gap: "var(--spacing-6)" }}>
          <Switch label="Info" onClick={() => setShowInfo(!showInfo)} />
          <Switch label="Warning" onClick={() => setShowWarning(!showWarning)} />
          <Switch label="Error" onClick={() => setShowError(!showError)} />
        </div>

        <AlertBannerOutlet id="dynamic-outlet">
          {showInfo && (
            <AlertBanner variant="info" icon={<InfoIcon />}>
              This is an info banner
            </AlertBanner>
          )}
          {showWarning && (
            <AlertBanner variant="warning" icon={<WarningIcon />}>
              This is a warning banner
            </AlertBanner>
          )}
          {showError && (
            <AlertBanner variant="error" icon={<ErrorIcon />}>
              This is an error banner
            </AlertBanner>
          )}
        </AlertBannerOutlet>
      </div>
    );
  },
});

/**
 * Demonstrates how to implement a custom priority function.
 * This example uses a `data-priority` attribute to determine which banner to show,
 * completely overriding the default variant-based priority. The info banner is shown
 * despite an error banner being present, because it has a higher `data-priority` value.
 */
export const Priority = meta.story({
  args: {
    children: (
      <>
        <AlertBanner data-priority="HIGH" variant="info" icon={<InfoIcon />}>
          This info banner has data-priority=&quot;HIGH&quot;
        </AlertBanner>
        <AlertBanner data-priority="MEDIUM" variant="error" icon={<ErrorIcon />}>
          This error banner has data-priority=&quot;MEDIUM&quot;
        </AlertBanner>
      </>
    ),
    id: "custom-priority-outlet",
  },

  render: (args) => {
    const PRIORITY_VALUES: Record<string, number> = {
      HIGH: 3,
      MEDIUM: 2,
      LOW: 1,
    };

    // Custom priority function that uses data-priority attribute
    const customPriority = (banners: HTMLElement[]): HTMLElement | null => {
      if (banners.length === 0) return null;

      let bestBanner: HTMLElement | null = null;
      let bestPriority = 0;

      for (const banner of banners) {
        const priority = PRIORITY_VALUES[banner.dataset.priority ?? ""] ?? 0;

        if (priority > bestPriority) {
          bestBanner = banner;
          bestPriority = priority;
        }
      }

      // Fall back to default priority if no data-priority attributes found
      return bestBanner ?? prioritiseByVariantAndDOMOrder(banners);
    };

    return <AlertBannerOutlet {...args} prioritise={customPriority} />;
  },
});
