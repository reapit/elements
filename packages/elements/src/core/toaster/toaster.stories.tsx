import { useRef, useState } from "react";

import preview from "#.storybook/preview";
import { Dialog } from "#src/core/dialog/dialog";
import { Drawer } from "#src/core/drawer/drawer";

import { toast } from "./toast-fn";
import { Toaster } from "./toaster";

const meta = preview.meta({
  title: "Messaging/Toaster",
  component: Toaster,
  parameters: {
    docs: {
      story: {
        inline: false,
        height: "300px",
      },
    },
  },
});

interface CyclingToast {
  variant: "success" | "error" | "warning" | "info" | "neutral";
  message: string;
}

const cyclingToasts: CyclingToast[] = [
  { variant: "success", message: "I'm sorry, Dave. The deploy was successful." },
  { variant: "info", message: "Stay on target… stay on target…" },
  { variant: "warning", message: "The odds of this succeeding are 3,720 to 1" },
  { variant: "error", message: "It's a trap! Rollback initiated" },
  {
    variant: "neutral",
    message: "I've seen things you people wouldn't believe. Like passing tests.",
  },
  { variant: "success", message: "To infinity and beyond: deploy complete" },
];

const cyclingToastAchievements = [
  "🏆 Achievement unlocked: Toast Connoisseur",
  "🎖️ Achievement unlocked: Repeat Offender",
  "🥇 Achievement unlocked: You should probably get back to work",
];

/**
 * Mount one `Toaster` near the root of your application. Trigger toasts imperatively
 * via the `toast()` helper from anywhere in your code: event handlers, async functions,
 * or outside the React tree.
 *
 * Click "Show toast" repeatedly to cycle through a sequence of messages. Persistent
 * clickers may be rewarded.
 */
export const Example = meta.story({
  args: {
    position: "bottom-center",
    maxItems: 3,
  },
  render: function Example(args) {
    const indexRef = useRef(0);

    function showNextToast() {
      const { variant, message } = cyclingToasts[indexRef.current % cyclingToasts.length];
      toast[variant](message);
      indexRef.current++;

      if (indexRef.current % cyclingToasts.length === 0) {
        const loop = Math.floor(indexRef.current / cyclingToasts.length) - 1;
        const achievement =
          cyclingToastAchievements[Math.min(loop, cyclingToastAchievements.length - 1)];
        toast.success(achievement);
      }
    }

    return (
      <>
        <button onClick={showNextToast}>Show toast</button>
        <Toaster {...args} />
      </>
    );
  },
});

/**
 * Five variants are available: `success`, `error`, `warning`, `info`, and `neutral`.
 * Use the typed helpers: `toast.success()`, `toast.error()`, etc., not
 * passing a `variant` option directly.
 */
export const Variants = Example.extend({
  render: function Variants(args) {
    return (
      <>
        <div style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap" }}>
          <button onClick={() => toast.success("Changes saved successfully")}>Success</button>
          <button onClick={() => toast.error("Something went wrong")}>Error</button>
          <button onClick={() => toast.warning("This action cannot be undone")}>Warning</button>
          <button onClick={() => toast.info("Your session will expire soon")}>Info</button>
          <button onClick={() => toast.neutral("Notification")}>Neutral</button>
        </div>
        <Toaster {...args} />
      </>
    );
  },
});

/**
 * The toaster supports six positions: `bottom-center` (default), `bottom-left`,
 * `bottom-right`, `top-center`, `top-left`, and `top-right`. Position is set on
 * the `Toaster` component itself and affects all toasts. Use the controls below
 * to change the position.
 */
export const Positions = Example.extend({
  args: {
    position: "top-center",
  },
  render: function Positions(args) {
    return (
      <>
        <button onClick={() => toast.info(`Position: ${args.position}`)}>Show toast</button>
        <Toaster {...args} />
      </>
    );
  },
});

/**
 * Call `toast.dismiss(id)` to remove a specific toast programmatically. The `toast()`
 * helper returns the toast ID. In this example, each toast ID is tracked so the
 * dismiss button always removes the oldest active toast.
 */
export const ManualDismiss = Example.extend({
  render: function ManualDismiss(args) {
    const [ids, setIds] = useState<string[]>([]);

    return (
      <>
        <div style={{ display: "flex", gap: "var(--spacing-3)" }}>
          <button
            onClick={() => {
              const id = toast.info("This toast can be dismissed programmatically", {
                duration: Infinity,
              });
              setIds((prev) => [...prev, id]);
            }}
          >
            Show toast
          </button>
          <button
            disabled={ids.length === 0}
            onClick={() => {
              const [oldest, ...rest] = ids;
              toast.dismiss(oldest);
              setIds(rest);
            }}
          >
            Dismiss oldest
          </button>
        </div>
        <Toaster {...args} />
      </>
    );
  },
});

/**
 * Toasts render in the browser's top layer via `popover="manual"`, so they appear
 * above native `<dialog>` elements used by `Drawer` and `Dialog`. Open either
 * overlay below and trigger a toast from inside it to verify correct stacking.
 *
 * Further, toasts ensure they remain above any dialogs or drawers that are opened
 * after a toast is shown.
 */
export const Layering = Example.extend({
  render: function AboveOverlays(args) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
      <>
        <div style={{ display: "flex", gap: "var(--spacing-3)" }}>
          <button onClick={() => setDrawerOpen(true)}>Open drawer</button>
          <button onClick={() => setDialogOpen(true)}>Open dialog</button>
        </div>

        <Drawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          aria-label="Toast demo drawer"
        >
          <Drawer.Header action={<Drawer.HeaderCloseButton />}>Toast from a drawer</Drawer.Header>
          <Drawer.Body>
            <button onClick={() => toast.success("Triggered from inside a drawer")}>
              Show toast
            </button>
          </Drawer.Body>
        </Drawer>

        <Dialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          size="small"
          aria-label="Toast demo dialog"
        >
          <Dialog.Header action={<Dialog.HeaderCloseButton />}>Toast from a dialog</Dialog.Header>
          <Dialog.Body>
            <button onClick={() => toast.success("Triggered from inside a dialog")}>
              Show toast
            </button>
          </Dialog.Body>
        </Dialog>

        <Toaster {...args} />
      </>
    );
  },
});

/**
 * The `maxItems` prop controls how many toasts are visible at once. Older toasts
 * beyond the limit fade out but remain in the DOM until dismissed. Click "Show
 * toast" to queue up more than six toasts and observe the oldest ones fade as
 * the limit is exceeded.
 */
export const MaxItems = ManualDismiss.extend({
  args: {
    maxItems: 6,
  },
});
