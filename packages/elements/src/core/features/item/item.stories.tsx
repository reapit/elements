import preview from "#.storybook/preview";
import { BathIcon } from "#src/icons/bath";
import { BedIcon } from "#src/icons/bed";
import { CarIcon } from "#src/icons/car";

import { Features } from "../features";

const meta = preview.meta({
  title: "Content display/Features/Item",
  component: Features.Item,
  argTypes: {
    icon: {
      control: "radio",
      options: ["Bed", "Bath", "Car"],
      mapping: {
        Bed: <BedIcon />,
        Bath: <BathIcon />,
        Car: <CarIcon />,
      },
    },
  },
});

export const Example = meta.story({
  args: {
    icon: <BedIcon />,
    label: "Bedrooms",
    value: 2,
  },
});
