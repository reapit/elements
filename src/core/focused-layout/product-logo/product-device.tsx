import Autoresponder from "./devices/autoresponder.svg?react";
import KeyWhere from "./devices/keywhere.svg?react";
import ReapitForms from "./devices/reapit-forms.svg?react";
import ReapitLettingsBDM from "./devices/reapit-lettings-bdm.svg?react";
import ReapitLettings from "./devices/reapit-lettings.svg?react";
import ReapitPM from "./devices/reapit-pm.svg?react";
import ReapitProposals from "./devices/reapit-proposals.svg?react";
import ReapitSales from "./devices/reapit-sales.svg?react";
import ReapitVerify from "./devices/reapit-verify.svg?react";
import ReapitWebsites from "./devices/reapit-websites.svg?react";
import Reapit from "./devices/reapit.svg?react";

export const supportedProductLogos = [
  "Reapit",
  "Reapit Forms",
  "Reapit Lettings",
  "Reapit Lettings BDM",
  "Reapit PM",
  "Reapit Proposals",
  "Reapit Sales",
  "Reapit Verify",
  "Reapit Websites",
  "Autoresponder",
  "KeyWhere",
] as const;

export type SupportedProductLogo = (typeof supportedProductLogos)[number];

export namespace ProductDevice {
  export interface Props {
    /** The product to display the device icon for */
    product: SupportedProductLogo;
  }
}

/**
 * Renders the device icon SVG for a given product.
 */
export function ProductDevice({ product }: ProductDevice.Props) {
  switch (product) {
    case "Autoresponder":
      return <Autoresponder />;
    case "KeyWhere":
      return <KeyWhere />;
    case "Reapit":
      return <Reapit />;
    case "Reapit Forms":
      return <ReapitForms />;
    case "Reapit Lettings":
      return <ReapitLettings />;
    case "Reapit Lettings BDM":
      return <ReapitLettingsBDM />;
    case "Reapit PM":
      return <ReapitPM />;
    case "Reapit Proposals":
      return <ReapitProposals />;
    case "Reapit Sales":
      return <ReapitSales />;
    case "Reapit Verify":
      return <ReapitVerify />;
    case "Reapit Websites":
      return <ReapitWebsites />;
  }
}
