import { Button } from "../button";
import { useButtonGroupContext } from "./context";

// We omit `size` because we make it optional
type AttributesToOmit = "size";

export namespace ButtonGroupItem {
  export interface Props extends Omit<Button.Props, AttributesToOmit> {
    size?: Button.Props["size"];
  }
}

/**
 * A thin wrapper around a button to ensure it uses the button group's size.
 */
export function ButtonGroupItem({ size, ...rest }: ButtonGroupItem.Props) {
  const context = useButtonGroupContext();
  return <Button {...rest} size={size ?? context.size} />;
}

ButtonGroupItem.displayName = "ButtonGroup.Item";
