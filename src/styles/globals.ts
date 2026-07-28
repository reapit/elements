/**
 * Global styles entry point. Side-effect imports every stylesheet that
 * must appear in the combined library CSS bundle but does not belong to
 * a specific component.
 *
 * Registered as an explicit build entry point in `vite.config.ts`.
 * Import order matters: `layer-order.css` must come first.
 *
 * See `src/styles/ARCHITECTURE.md` for the full rationale.
 */
import "./layer-order.css";
import "#src/tokens/dist/reapit.css";
import "#src/tokens/dist/payprop.css";
import "./globals.css";
