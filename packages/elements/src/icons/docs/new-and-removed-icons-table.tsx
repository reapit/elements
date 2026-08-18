import type { ReactNode } from "react";

import { Badge } from "#src/core/badge";
import { Table } from "#src/core/table";
import { Text } from "#src/utils/text";

import * as v5Icons from "./all-icons";

/**
 * The complete set of icon names supported by the v4 `Icon` (later `DeprecatedIcon`) component.
 * This is a fixed historical reference and will not change.
 */
const V4_ICON_NAMES = new Set([
  "add",
  "announcement",
  "appSwitcher",
  "archive",
  "arrowDown",
  "arrowLeft",
  "arrowRight",
  "arrowUp",
  "asterisk",
  "attachment",
  "automation",
  "bath",
  "bed",
  "bill",
  "billBulk",
  "bookmark",
  "bookmarkBulk",
  "buy",
  "calculator",
  "calendar",
  "camera",
  "car",
  "check",
  "checkbox",
  "checkboxDisabled",
  "checkboxIndeterminate",
  "checkboxSelected",
  "checkOutline",
  "chevronDown",
  "chevronLeft",
  "chevronRight",
  "chevronUp",
  "circularAdd",
  "circularAddSolid",
  "circularRemove",
  "circularRemoveSolid",
  "close",
  "cloud",
  "compliance",
  "consolidate",
  "contact",
  "contacts",
  "copy",
  "dashboard",
  "dragIndicator",
  "dragIndicatorAlt",
  "drawClose",
  "edit",
  "elipsis",
  "email",
  "emailDisabled",
  "emailFill",
  "euro",
  "exit",
  "expand",
  "exportIcon",
  "favourite",
  "feather",
  "feed",
  "file",
  "fileAttached",
  "fileAudio",
  "fileDocument",
  "fileDownload",
  "fileExcel",
  "fileImage",
  "filePdf",
  "filePowerpoint",
  "fileSpreadsheet",
  "fileUpload",
  "fileVideo",
  "fileWord",
  "fileZip",
  "filter",
  "folder",
  "forward",
  "fullscreen",
  "fullscreenExit",
  "help",
  "info",
  "infoOutline",
  "insights",
  "inspection",
  "insurance",
  "key",
  "keyboard",
  "landSize",
  "laptop",
  "link",
  "location",
  "locationAlt",
  "locationDisabled",
  "lock",
  "lockOutline",
  "maintenance",
  "maintenanceAlt",
  "marketplace",
  "menu",
  "menuAlt",
  "message",
  "messageDisabled",
  "messageTyping",
  "micOff",
  "micOn",
  "minus",
  "mobile",
  "money",
  "moodHappy",
  "moodNeutral",
  "moodUnhappy",
  "more",
  "note",
  "notification",
  "payment",
  "phone",
  "phoneDisabled",
  "photo",
  "pin",
  "placeholderLarge",
  "placeholderSmall",
  "pound",
  "powerOn",
  "priorityHigh",
  "priorityLow",
  "priorityMedium",
  "property",
  "propertyChecked",
  "radio",
  "radioDisabled",
  "radioSelected",
  "reapitLogo",
  "reapitLogoSmall",
  "refresh",
  "rent",
  "repeat",
  "reply",
  "replyAll",
  "report",
  "sale",
  "search",
  "separatorDot",
  "separatorLine",
  "settings",
  "share",
  "sort",
  "sortAscend",
  "sortDescend",
  "sprout",
  "star",
  "status",
  "statusBad",
  "statusGood",
  "statusPaused",
  "statusUnknown",
  "tag",
  "task",
  "time",
  "trash",
  "unarchive",
  "user",
  "video",
  "view",
  "viewDisabled",
  "walking",
  "wand",
  "warning",
  "warningOutline",
  "workflow",
]);

/**
 * Icons whose v4 name differs from the v5 name (beyond the standard camelCase-to-PascalCase+Icon convention).
 */
const RENAMED_ICONS: Record<string, string> = {
  elipsis: "MoreIcon",
  exportIcon: "ExportIcon",
};

function toV5ComponentName(v4Name: string): string {
  if (v4Name in RENAMED_ICONS) {
    return RENAMED_ICONS[v4Name];
  }
  return `${v4Name.charAt(0).toUpperCase()}${v4Name.slice(1)}Icon`;
}

function toV4Name(v5ComponentName: string): string {
  const renamed = Object.entries(RENAMED_ICONS).find(([, v5]) => v5 === v5ComponentName);
  if (renamed) {
    return renamed[0];
  }
  return `${v5ComponentName.charAt(0).toLowerCase()}${v5ComponentName.slice(1).replace(/Icon$/, "")}`;
}

interface ChangeEntry {
  displayName: string;
  v5Icon: ReactNode;
  status: "new" | "removed" | "renamed";
  note?: string;
}

function buildChangeList(): ChangeEntry[] {
  const { ICON_KEBAB_NAMES, ...icons } = v5Icons;
  const v5ComponentNames = new Set(Object.keys(icons));

  const entries: ChangeEntry[] = [];

  // Removed icons: in v4 but no v5 equivalent
  for (const v4Name of V4_ICON_NAMES) {
    const v5Name = toV5ComponentName(v4Name);
    if (!v5ComponentNames.has(v5Name)) {
      entries.push({ displayName: v4Name, v5Icon: null, status: "removed" });
    }
  }

  // Renamed icons: in v4 with a non-standard v5 mapping
  for (const [v4Name, v5Name] of Object.entries(RENAMED_ICONS)) {
    const Icon = icons[v5Name as keyof typeof icons];
    if (Icon) {
      entries.push({
        displayName: v4Name,
        v5Icon: <Icon color="primary" size="lg" />,
        status: "renamed",
        note: v5Name,
      });
    }
  }

  // New icons: in v5 but not in v4
  for (const v5Name of v5ComponentNames) {
    const v4Name = toV4Name(v5Name);
    if (!V4_ICON_NAMES.has(v4Name)) {
      const Icon = icons[v5Name as keyof typeof icons];
      if (Icon) {
        entries.push({
          displayName: v5Name,
          v5Icon: <Icon color="primary" size="lg" />,
          status: "new",
        });
      }
    }
  }

  return entries;
}

const BADGE_COLOUR: Record<ChangeEntry["status"], "danger" | "success" | "neutral"> = {
  removed: "danger",
  new: "success",
  renamed: "neutral",
};

const BADGE_LABEL: Record<ChangeEntry["status"], string> = {
  removed: "Removed",
  new: "New",
  renamed: "Renamed",
};

export function NewAndRemovedIconsTable() {
  const changeList = buildChangeList();

  const fallback = (
    <Text colour="secondary" size="sm">
      n/a
    </Text>
  );

  return (
    <Table columns="1fr min-content min-content 1fr" className="sb-unstyled">
      <Table.Head as="thead">
        <Table.HeaderRow as="tr">
          <Table.HeaderCell as="th">Name</Table.HeaderCell>
          <Table.HeaderCell as="th">Icon</Table.HeaderCell>
          <Table.HeaderCell as="th">Status</Table.HeaderCell>
          <Table.HeaderCell as="th">Notes</Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Head>
      <Table.Body as="tbody">
        {changeList.map((entry) => (
          <Table.BodyRow as="tr" key={entry.displayName}>
            <Table.BodyCell as="td">
              <Table.PrimaryData>
                <code>{entry.displayName}</code>
              </Table.PrimaryData>
            </Table.BodyCell>
            <Table.BodyCell as="td">{entry.v5Icon ?? fallback}</Table.BodyCell>
            <Table.BodyCell as="td">
              <Badge colour={BADGE_COLOUR[entry.status]}>{BADGE_LABEL[entry.status]}</Badge>
            </Table.BodyCell>
            <Table.BodyCell as="td">
              {entry.note ? (
                <Table.PrimaryData>
                  Use <code>{entry.note}</code> instead
                </Table.PrimaryData>
              ) : null}
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
}
