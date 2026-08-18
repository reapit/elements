import { useEffect, type ComponentProps } from "react";

import preview from "#.storybook/preview";
import { ExportIcon } from "#src/icons/export";
import { MoreIcon } from "#src/icons/more";
import { PropertyIcon } from "#src/icons/property";

import { DeprecatedMenu, useDeprecatedMenuContext } from ".";
import { Badge } from "../../core/badge";
import { Button } from "../../core/button";
import { elHScreen } from "../../styles/deprecated-sizing";
import { FlexContainer, DeprecatedMainContainer } from "../layout";

const meta = preview.meta({
  title: "Deprecated/DeprecatedMenu",
});

export default meta;

export const Default = meta.story({
  render: () => {
    return (
      <DeprecatedMenu>
        <DeprecatedMenu.Trigger>
          {({ getTriggerProps }) => (
            <Button {...getTriggerProps()} iconLeft={<MoreIcon size="sm" />} />
          )}
        </DeprecatedMenu.Trigger>
        <DeprecatedMenu.Popover>
          <DeprecatedMenu.List>
            <DeprecatedMenu.Group label="Group Title">
              <DeprecatedMenu.Item label="Menu Item" onClick={console.log} />
              <DeprecatedMenu.Item label="Menu Item as anchor" href="/#" />
              <DeprecatedMenu.Item label="Menu Item (keep open)" closeMenu={false} isActive />
              <DeprecatedMenu.Item label="Menu Item (disabled)" onClick={console.log} disabled />
            </DeprecatedMenu.Group>
          </DeprecatedMenu.List>
        </DeprecatedMenu.Popover>
      </DeprecatedMenu>
    );
  },
});

export const WithCompleteFeatures = meta.story({
  render: () => {
    return (
      <DeprecatedMenu>
        <DeprecatedMenu.Trigger>
          {({ getTriggerProps }) => (
            <Button {...getTriggerProps()} iconLeft={<MoreIcon size="sm" />} />
          )}
        </DeprecatedMenu.Trigger>
        <DeprecatedMenu.Popover>
          <DeprecatedMenu.List maxWidth="--size-80" maxHeight="--size-80">
            <DeprecatedMenu.Group label="Long Group Title that doesn't fit in one line">
              <DeprecatedMenu.Item
                label="Menu Item"
                supplementaryInfo="Short description about the item"
                badge={<Badge colour="neutral">Badge</Badge>}
                onClick={console.log}
                leftIcon={<PropertyIcon />}
                rightIcon={<ExportIcon />}
              />
              <DeprecatedMenu.Item
                label="Menu Item anchor with long example text"
                supplementaryInfo="Secondary info long description that won't fit in one line"
                badge={<Badge colour="neutral">Badge</Badge>}
                href="/#"
                leftIcon={<PropertyIcon />}
                rightIcon={<ExportIcon />}
              />
              <DeprecatedMenu.Item
                label="Menu Item active"
                supplementaryInfo="Short description about the item"
                badge={<Badge colour="neutral">Badge</Badge>}
                isActive
                onClick={console.log}
                leftIcon={<PropertyIcon />}
                rightIcon={<ExportIcon />}
              />
              <DeprecatedMenu.Item
                label="Menu Item (disabled)"
                supplementaryInfo="Short description about the item"
                badge={<Badge colour="neutral">Badge with long text</Badge>}
                onClick={console.log}
                disabled
                leftIcon={<PropertyIcon />}
                rightIcon={<ExportIcon />}
              />
            </DeprecatedMenu.Group>
            <DeprecatedMenu.Group maxHeight="--size-32" label="Group Title">
              <DeprecatedMenu.Item label="Menu Item 1" onClick={console.log} />
              <DeprecatedMenu.Item label="Menu Item 2" href="/#" />
              <DeprecatedMenu.Item label="Menu Item 3" href="/#" />
              <DeprecatedMenu.Item label="Menu Item 4" href="/#" />
              <DeprecatedMenu.Item label="Menu Item 5" href="/#" />
              <DeprecatedMenu.Item label="Menu Item 6" href="/#" />
              <DeprecatedMenu.Item label="Menu Item 7" href="/#" />
            </DeprecatedMenu.Group>
          </DeprecatedMenu.List>
        </DeprecatedMenu.Popover>
      </DeprecatedMenu>
    );
  },
});

export const WithCustomAlignment = meta.story({
  render: () => {
    return (
      <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
        <DeprecatedMenu data-alignment="right">
          <DeprecatedMenu.Trigger>
            {({ getTriggerProps }) => (
              <Button {...getTriggerProps()} iconLeft={<MoreIcon size="sm" />} />
            )}
          </DeprecatedMenu.Trigger>
          <DeprecatedMenu.Popover yOffset={10}>
            <DeprecatedMenu.List>
              <DeprecatedMenu.Group label="Group Title">
                <DeprecatedMenu.Item label="Menu Item" onClick={console.log} />
                <DeprecatedMenu.Item label="Menu Item as anchor" href="/#" />
                <DeprecatedMenu.Item label="Menu Item (keep open)" closeMenu={false} />
              </DeprecatedMenu.Group>
            </DeprecatedMenu.List>
          </DeprecatedMenu.Popover>
        </DeprecatedMenu>
      </FlexContainer>
    );
  },
});

export const MoreComplexUsageExample = meta.story({
  render: (props) => {
    const NavDropdownButtonUsageExample = ({
      title,
      yOffset,
      ...props
    }: ComponentProps<typeof DeprecatedMenu> & { title?: string; yOffset?: number }) => {
      return (
        <DeprecatedMenu {...props}>
          <DeprecatedMenu.Trigger>
            {({ getTriggerProps }) => (
              <Button {...getTriggerProps()} {...props} iconRight={<MoreIcon size="sm" />}>
                More
              </Button>
            )}
          </DeprecatedMenu.Trigger>
          <DeprecatedMenu.Popover yOffset={yOffset}>
            <DeprecatedMenu.List>
              <DeprecatedMenu.Group label={title ?? "Group Title"}>
                <DeprecatedMenu.Item label="Menu Item" onClick={console.log} />
                <DeprecatedMenu.Item label="Menu Item as anchor" href="/#" />
                <DeprecatedMenu.Item label="Menu Item (keep open)" closeMenu={false} />
              </DeprecatedMenu.Group>
            </DeprecatedMenu.List>
          </DeprecatedMenu.Popover>
        </DeprecatedMenu>
      );
    };
    return (
      <FlexContainer
        isFlexColumn
        isFlexJustifyBetween
        style={{
          height: "150vh",
          overflow: "hidden",
          padding: 5,
        }}
      >
        <FlexContainer isFlexJustifyBetween>
          <NavDropdownButtonUsageExample {...props} />
          <NavDropdownButtonUsageExample
            {...props}
            data-alignment="right"
            title="Custom y-offset"
            yOffset={50}
          />
        </FlexContainer>
        <FlexContainer isFlexJustifyBetween>
          <NavDropdownButtonUsageExample {...props} />
          <NavDropdownButtonUsageExample {...props} data-alignment="right" />
        </FlexContainer>
        <FlexContainer isFlexJustifyBetween>
          <NavDropdownButtonUsageExample {...props} />
          <NavDropdownButtonUsageExample {...props} data-alignment="right" />
        </FlexContainer>
      </FlexContainer>
    );
  },
});

export const WithIframe = meta.story({
  render: () => {
    const IFrameComponent = () => {
      return (
        <iframe
          src="https://www.example.com"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            marginTop: "1rem",
          }}
          title="Example IFrame"
        />
      );
    };

    // NOTE: make sure this component is rendered inside the Menu context
    const IframeHandler = () => {
      const { closeMenu } = useDeprecatedMenuContext();

      // close the menu when iframe is focused
      useEffect(() => {
        const controller = new AbortController();
        const handleWindowBlur = () => {
          if (document.activeElement?.tagName === "IFRAME") {
            closeMenu();
          }
        };

        window.addEventListener("blur", handleWindowBlur, {
          signal: controller.signal,
        });
        return () => {
          controller.abort();
        };
      }, [closeMenu]);
      return null;
    };

    return (
      <DeprecatedMainContainer className={elHScreen}>
        <DeprecatedMenu>
          <DeprecatedMenu.Trigger>
            {({ getTriggerProps }) => (
              <Button {...getTriggerProps()} iconLeft={<MoreIcon size="sm" />} />
            )}
          </DeprecatedMenu.Trigger>
          <DeprecatedMenu.Popover>
            <IframeHandler />
            <DeprecatedMenu.List>
              <DeprecatedMenu.Group label="Group Title">
                <DeprecatedMenu.Item label="Menu Item" onClick={console.log} />
              </DeprecatedMenu.Group>
            </DeprecatedMenu.List>
          </DeprecatedMenu.Popover>
        </DeprecatedMenu>
        <IFrameComponent />
      </DeprecatedMainContainer>
    );
  },
});
