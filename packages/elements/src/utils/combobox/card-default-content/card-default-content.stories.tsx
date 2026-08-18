import preview from "#.storybook/preview";
import { SupplementaryInfo } from "#src/core/supplementary-info";

import { ComboboxCardDefaultContent } from "./card-default-content";

const meta = preview.meta({
  title: "Utils/Combobox/CardDefaultContent",
  component: ComboboxCardDefaultContent,
  argTypes: {
    children: {
      control: "text",
    },
    additionalInfo: {
      control: "radio",
      options: ["None", "One line", "Two lines"],
      mapping: {
        None: undefined,
        "One line": (
          <SupplementaryInfo>
            <SupplementaryInfo.Item>Supplementary info</SupplementaryInfo.Item>
          </SupplementaryInfo>
        ),
        "Two lines": [
          <SupplementaryInfo key="line-1">
            <SupplementaryInfo.Item>Supplementary info</SupplementaryInfo.Item>
          </SupplementaryInfo>,
          <SupplementaryInfo key="line-2">
            <SupplementaryInfo.Item>Supplementary info</SupplementaryInfo.Item>
          </SupplementaryInfo>,
        ],
      },
    },
  },
});

export const Example = meta.story({
  args: {
    children: "Selected item label",
    additionalInfo: "None",
  },
});
