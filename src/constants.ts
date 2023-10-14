import { IconType } from "react-icons";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa";

export const HEADING_OPTIONS: Array<{ label: string; value: number }> = [
  {
    value: 1,
    label: "Heading 1",
  },
  {
    value: 2,
    label: "Heading 2",
  },
  { value: 3, label: "Heading 3" },
  { value: 4, label: "Heading 4" },
  { value: 5, label: "Heading 5" },
  { value: 6, label: "Heading 6" },
];

export const TEXT_ALIGN_OPTIONS: Array<{
  icon: IconType;
  value: string;
  label: string;
}> = [
  {
    value: "left",
    icon: FaAlignLeft,
    label: "align-left",
  },
  {
    value: "center",
    icon: FaAlignCenter,
    label: "align-center",
  },
  { value: "right", icon: FaAlignRight, label: "align-right" },
  { value: "justify", icon: FaAlignJustify, label: "align-justify" },
];

export const DEFAULT_COLOR_PRESETS: Array<string> = [
  "transparent",
  "#FFFFFF",
  "#DDDDDD",
  "#AAAAAA",
  "#757575",
  "#424242",
  "#000000",
  "#FD3D3A",
  "#FD9526",
  "#FDCB2E",
  "#53D769",
  "#60C9F8",
  "#157EFB",
  "#5959D3",
  "#561DE2",
  "#8455F6",
  "#FB3159",
  "#ED70C0",
  "#F0965B",
  "#CEFD85",
  "#56BC6C",
  "#85144B",
  "#B10DC9",
  "#F012BE",
  "#7FDBFF",
  "#39CCCC",
  "#0074D9",
  "#001F3F",
];

export enum MentionChars {
  AT = "@",
  HASH = "#",
  SLASH = "/",
}

export const inputRegex = /(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;
