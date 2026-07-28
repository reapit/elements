import figma from "@figma/code-connect";

import { Table } from "../table";

figma.connect(Table.PrimaryData, "<TABLE_PRIMARY_DATA_URL>", {
  variant: { Data: "Alphanumeric" },
  props: {
    iconLeft: figma.nestedProps("Icon L", {
      icon: figma.instance("Icon"),
    }),
    iconRight: figma.nestedProps("Icon R", {
      icon: figma.instance("Icon"),
    }),
    data: figma.nestedProps("Alphanumeric value", {
      children: figma.textContent("Value"),
    }),
  },
  example: (props) => (
    <Table.PrimaryData iconLeft={props.iconLeft.icon} iconRight={props.iconRight.icon}>
      {props.data.children}
    </Table.PrimaryData>
  ),
});

figma.connect(Table.PrimaryData, "<TABLE_PRIMARY_DATA_URL>", {
  variant: { Data: "Date and Time" },
  props: {
    iconLeft: figma.nestedProps("Icon L", {
      icon: figma.instance("Icon"),
    }),
    iconRight: figma.nestedProps("Icon R", {
      icon: figma.instance("Icon"),
    }),
    date: figma.nestedProps("Date", {
      value: figma.textContent("Value"),
    }),
    comma: figma.nestedProps("Comma", {
      value: figma.textContent("Value"),
    }),
    time: figma.nestedProps("Time", {
      value: figma.textContent("Value"),
    }),
  },
  example: (props) => (
    <Table.PrimaryData iconLeft={props.iconLeft.icon} iconRight={props.iconRight.icon}>
      {props.date.value}
      {props.comma.value}
      {props.time.value}
    </Table.PrimaryData>
  ),
});
