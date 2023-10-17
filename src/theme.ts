import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import {
  mode,
  SystemStyleFunction,
  StyleFunctionProps,
} from "@chakra-ui/theme-tools";
import { withProse } from "@nikolovlazar/chakra-ui-prose";
import {
  FaRegSurprise,
  FaRegSmile,
  FaInfo,
  FaExclamationTriangle,
} from "react-icons/fa";

// colors based on figma designs
// https://www.figma.com/file/Mcnk1Fg0aEuilAxdDMI1kl/Light-UI?node-id=133%3A775
// https://www.figma.com/file/QHkVxBT3AGKuEYQzrDnVIp/Dark-UI?node-id=133%3A775
// don't add new ones without consulting with designers! :)

const colors = {
  common: {
    candy: "#FF4A98",
    cocoa: "#524334",
    cream: "#FFFBBD",
    dust: "#D8D8D8",
    gray_100: "#D8D8D8",
    gray_200: "#ADADAD",
    gray_300: "#939393",
    gray_400: "#888888",
    gray_500: "#2b2b2b",
    gray_600: "#555555",
    gray_650: "#494949",
    gray_700: "#323232",
    gray_800: "#232323",
    gray_900: "#1E1E1E",
    green_lantern: "#1BCE78",
    indigo: "#7B50FF",
    negative: "#C84B4B",
    primary_400: "#FFAD00",
    primary_300: "#FFD350",
    primary_200: "#FFE086",
    red_berry: "#DB2D4C",
    pool: "#009BA9",
    positive_dark: "#6DD300",
    positive_light: "#85DE55",
    safe_dark: "#008CD3",
    safe_light: "#68D5FF",
    warning: "#DB7338",
    link_blue: "#190FA4",
    link_green: "#2A642A",
    orange: "#FE4F02",
    gray_slate_900: "#303840",
  },
  dark: {
    base_alpha_100: "rgba(0, 0, 0, 0.06)",
    base_alpha_200: "rgba(0, 0, 0, 0.08)",
    base_alpha_300: "rgba(0, 0, 0, 0.16)",
    base_alpha_400: "rgba(0, 0, 0, 0.24)",
    base_alpha_500: "rgba(0, 0, 0, 0.32)",
    base_alpha_600: "rgba(0, 0, 0, 0.40)",
    base_level_1: "#1E1E1E",
    base_level_2: "#232323",
    base_level_3: "#323232",
    content_active: "#FFF",
    content_alpha_100: "rgba(255, 255, 255, 0.06)",
    content_alpha_200: "rgba(255, 255, 255, 0.08)",
    content_alpha_300: "rgba(255, 255, 255, 0.16)",
    content_alpha_400: "rgba(255, 255, 255, 0.24)",
    content_details: "#ADADAD",
    content_disabled: "#888888",
    content_inactive: "#D8D8D8",
    content_note: "#939393",
    content_inverse: "#1E1E1E",
    content_onprimary: "#1E1E1E",
    background_image_overlay: "rgba(0, 0, 0, 0.7)",
  },
  light: {
    base_alpha_100: "rgba(48, 56, 64, 0.06)",
    base_alpha_200: "rgba(48, 56, 64, 0.08)",
    base_alpha_300: "rgba(48, 56, 64, 0.16)",
    base_alpha_400: "rgba(48, 56, 64, 0.24)",
    base_alpha_500: "rgba(48, 56, 64, 0.32)",
    base_alpha_600: "rgba(48, 56, 64, 0.40)",
    base_level_1: "#E5E8E8",
    base_level_2: "#F5F7F7",
    base_level_3: "#FFFFFF",
    content_active: "#000000",
    content_alpha_100: "rgba(48, 56, 64, 0.06)",
    content_alpha_200: "rgba(48, 56, 64, 0.08)",
    content_alpha_300: "rgba(48, 56, 64 0.16)",
    content_alpha_400: "rgba(48, 56, 64, 0.24)",
    content_details: "#555555",
    content_disabled: "#ADADAD",
    content_note: "#888888",
    content_inactive: "#303840",
    content_inverse: "#F7F8F8",
    content_onprimary: "#1E1E1E",
    gray_slate_50: "#F5F7F7",
    gray_slate_100: "#E5E8E8",
    gray_slate_900: "#303840",
    background_image_overlay: "rgba(255, 255, 255, 0.7)",
  },
};

const shadows = {
  light: {
    card: "0px 0px 30px rgba(0, 0, 0, 0.2)",
    menu: "0 5px 16px 0 rgba(0,0,0,0.1)",
    md: "0px 0px 16px rgba(0, 0, 0, 0.32)",
    highlight: "0px 0px 2px 1px #008CD3",
  },
  dark: {
    card: "0px 0px 40px rgba(0, 0, 0, 0.5)",
    menu: "0 8px 16px 0 rgba(0, 0, 0, 0.5)",
    md: "0px 0px 16px rgba(0, 0, 0, 0.32)",
    highlight: "0px 0px 2px 1px #008CD3",
  },
};

const semanticTokens = {
  // dark/light colors mapping to tokens so that in components colors can be used as strings (without need to pass colorMode):
  colors: {
    base_alpha_100: {
      _dark: colors.dark.base_alpha_100,
      _light: colors.light.base_alpha_100,
    },
    base_alpha_200: {
      _dark: colors.dark.base_alpha_200,
      _light: colors.light.base_alpha_200,
    },
    base_alpha_300: {
      _dark: colors.dark.base_alpha_300,
      _light: colors.light.base_alpha_300,
    },
    base_alpha_400: {
      _dark: colors.dark.base_alpha_400,
      _light: colors.light.base_alpha_400,
    },
    base_alpha_500: {
      _dark: colors.dark.base_alpha_500,
      _light: colors.light.base_alpha_500,
    },
    base_alpha_600: {
      _dark: colors.dark.base_alpha_600,
      _light: colors.light.base_alpha_600,
    },
    base_level_1: {
      _dark: colors.dark.base_level_1,
      _light: colors.light.base_level_1,
    },
    base_level_2: {
      _dark: colors.dark.base_level_2,
      _light: colors.light.base_level_2,
    },
    base_level_3: {
      _dark: colors.dark.base_level_3,
      _light: colors.light.base_level_3,
    },
    content_active: {
      _dark: colors.dark.content_active,
      _light: colors.light.content_active,
    },
    content_alpha_100: {
      _dark: colors.dark.content_alpha_100,
      _light: colors.light.content_alpha_100,
    },
    content_alpha_200: {
      _dark: colors.dark.content_alpha_200,
      _light: colors.light.content_alpha_200,
    },
    content_alpha_300: {
      _dark: colors.dark.content_alpha_300,
      _light: colors.light.content_alpha_300,
    },
    content_alpha_400: {
      _dark: colors.dark.content_alpha_400,
      _light: colors.light.content_alpha_400,
    },
    content_details: {
      _dark: colors.dark.content_details,
      _light: colors.light.content_details,
    },
    content_disabled: {
      _dark: colors.dark.content_disabled,
      _light: colors.light.content_disabled,
    },
    content_inactive: {
      _dark: colors.dark.content_inactive,
      _light: colors.light.content_inactive,
    },
    content_note: {
      _dark: colors.dark.content_note,
      _light: colors.light.content_note,
    },
    content_inverse: {
      _dark: colors.dark.content_inverse,
      _light: colors.light.content_inverse,
    },
    content_onprimary: {
      _dark: colors.dark.content_onprimary,
      _light: colors.light.content_onprimary,
    },
    link: {
      _dark: colors.common.primary_400,
      _light: colors.common.safe_dark,
    },
    link_active: {
      _dark: colors.common.primary_300,
      _light: colors.common.safe_light,
    },
    input_normal: {
      _light: "base_alpha_200",
      _dark: "base_alpha_300",
    },
    input_active: {
      _light: "base_alpha_200",
      _dark: "base_alpha_400",
    },
    input_hover: {
      _light: "base_alpha_200",
      _dark: "base_alpha_300",
    },
    input_disabled: {
      _light: "base_alpha_100",
      _dark: "transparent",
    },
    background_image_overlay: {
      _dark: colors.dark.background_image_overlay,
      _light: colors.light.background_image_overlay,
    },
  },
  shadows: {
    md: {
      _dark: shadows.dark.md,
      _light: shadows.light.md,
    },
    card: {
      _dark: shadows.dark.card,
      _light: shadows.light.card,
    },
    menu: {
      _dark: shadows.dark.menu,
      _light: shadows.light.menu,
    },
    highlight: {
      _dark: shadows.dark.highlight,
      _light: shadows.light.highlight,
    },
    outline: {
      _light: "0px 0px 0px 1px var(--chakra-colors-content_alpha_300)",
      _dark: "0px 0px 0px 1px var(--chakra-colors-content_alpha_300)",
    },
    outline_negative: {
      _light: "0px 0px 0px 1px var(--chakra-colors-common-negative)",
      _dark: "0px 0px 0px 1px var(--chakra-colors-common-negative)",
    },
  },
  borders: {
    basic: "1px solid var(--chakra-colors-content_alpha_200)",
  },
};

const breakpoints = {
  xs: "0px",
  sm: "576px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const buttonVariantPrimary = {
  background: "common.primary_400",
  color: "content_onprimary",
  _hover: {
    background: "common.primary_300",
    color: "content_onprimary",
    textDecoration: "none",
    _disabled: {
      background: "content_alpha_200",
      color: "content_disabled",
    },
  },
  _active: {
    background: "common.primary_300",
    color: "content_onprimary",
  },
  _focus: {
    background: "common.primary_200",
    color: "content_onprimary",
    boxShadow: "outline",
  },
  _disabled: {
    background: "content_alpha_200",
    color: "content_disabled",
  },
  _loading: {
    background: "content_alpha_200",
    color: "content_disabled",
  },
};

const buttonVariantSecondary = {
  position: "relative",
  background: "content_alpha_100",
  color: "content_inactive",
  _hover: {
    background: "content_alpha_200",
    textDecoration: "none",
    boxShadow: "outline",
    _after: {
      position: "absolute",
      inset: "0",
      content: '""',
      pointerEvents: "none",
      borderRadius: "inherit",
      border: "1px solid",
      borderColor: "content_disabled",
    },
    _disabled: {
      background: "content_alpha_200",
      color: "content_disabled",
      boxShadow: "none",
      _after: {
        border: "none",
      },
    },
  },
  _focus: {
    background: "content_alpha_200",
    color: "content_active",
    boxShadow: "outline",
  },
  _active: {
    background: "base_alpha_300",
    color: "content_active",
    _after: {
      position: "absolute",
      inset: "0",
      content: '""',
      pointerEvents: "none",
      borderRadius: "inherit",
      border: "1px solid",
      borderColor: "content_alpha_200",
    },
  },
  _disabled: {
    background: "content_alpha_200",
    color: "content_disabled",
  },
  _loading: {
    background: "content_alpha_200",
    color: "content_disabled",
  },
};

const buttonVariantGhost = {
  position: "relative",
  background: "transparent",
  color: "content_inactive",
  _hover: {
    background: "content_alpha_200",
    textDecoration: "none",
    boxShadow: "outline",
    _after: {
      position: "absolute",
      inset: "0",
      content: '""',
      pointerEvents: "none",
      borderRadius: "inherit",
      border: "1px solid",
      borderColor: "content_disabled",
    },
    _disabled: {
      background: "transparent",
      color: "content_disabled",
      boxShadow: "none",
      _after: {
        border: "none",
      },
    },
  },
  _focus: {
    background: "content_alpha_200",
    color: "content_active",
    boxShadow: "outline",
  },
  _active: {
    background: "base_alpha_300",
    color: "content_active",
    _after: {
      position: "absolute",
      inset: "0",
      content: '""',
      pointerEvents: "none",
      borderRadius: "inherit",
      border: "1px solid",
      borderColor: "content_alpha_200",
    },
  },
  _disabled: {
    background: "transparent",
    color: "content_disabled",
  },
  _loading: {
    background: "transparent",
    color: "content_disabled",
  },
};

const buttonVariantDashed = {
  ...buttonVariantGhost,
  _after: {
    position: "absolute",
    inset: "0",
    content: '""',
    pointerEvents: "none",
    borderRadius: "inherit",
    border: "2px dashed",
    borderColor: "content_disabled",
  },
};

const breadcrumbBaseStyle = {
  link: {
    color: "link",
    _hover: {
      color: "link_active",
    },
  },
  item: {
    color: "content_inactive",
  },
};

const menuBaseStyle = {
  list: {
    fontSize: "sm",
    lineHeight: "base",
    border: "0",
    paddingY: "1",
    background: "base_level_3",
    color: "content_inactive",
    boxShadow: "menu",
    _focus: {
      boxShadow: "var(--chakra-shadows-menu) !important", // !important needed to keep shadow on focused and unhovered element;
    },
  },
  item: {
    paddingX: "3",
    paddingY: "2.5",
    border: "0",
    fontSize: "inherit",
    lineHeight: "inherit",
    background: "transparent",
    color: "content_inactive",
    _hover: {
      color: "content_active",
      background: "content_alpha_100",
      _disabled: {
        background: "transparent",
        color: "content_disabled",
      },
    },
    _active: {
      color: "content_active",
      background: "content_alpha_100",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: "1",
      background: "transparent",
      color: "content_disabled",
    },
  },
  divider: {
    color: "content_alpha_200",
  },
};

const modalBaseStyle: SystemStyleFunction = (props: StyleFunctionProps) => ({
  dialogContainer: {
    overflow: props.scrollBehavior === "inside" ? "initial" : "auto", // fix inside scroll modal issue
  },
  dialog: {
    background: "base_level_3",
    color: "content_inactive",
  },
  body: {
    paddingX: 4,
  },
  footer: {
    paddingX: 4,
  },
  header: {
    fontSize: "md",
    fontWeight: "500",
    color: "content_inactive",
    paddingY: 3,
    paddingX: 4,
  },
});

const linkBaseStyle = {
  color: "link",
  _hover: {
    "&:not(.chakra-button):not(.chakra-menu__menuitem)": {
      color: "link_active",
    },
  },
};

const popoverBaseStyle = {
  arrow: {
    border: "0",
  },
  content: {
    "--popper-arrow-bg": "var(--chakra-colors-base_level_3)",
    "--popper-arrow-shadow-color": "var(--chakra-colors-base_level_3)",
    background: "base_level_3",
    color: "content_inactive",
    padding: "0",
    border: "0",
    boxShadow: "card",
    _focus: {
      boxShadow: "var(--chakra-shadows-card) !important",
    },
  },
  header: {
    padding: "4",
    borderBottomColor: "content_alpha_200",
    borderBottomStyle: "solid",
  },
  body: {
    padding: "4",
    borderRadius: "md",
  },
};

const tabsBaseStyle = {
  tab: {
    background: "transparent",
    border: "0",
    color: "content_inactive",
  },
  tabpanel: {
    paddingX: "0",
  },
};

const tabsVariantLine = {
  tab: {
    color: "content_inactive",
    borderBottom: "2px solid",
    borderColor: "transparent",
    fontWeight: 500,
    marginBottom: "0",
    _hover: {
      color: "content_active",
      borderColor: "content_alpha_300",
      _disabled: {
        color: "content_disabled",
        borderColor: "transparent",
      },
    },
    _active: {
      color: "content_active",
      borderColor: "common.primary_200",
      background: "content_alpha_100",
    },
    _focus: {
      boxShadow: "outline",
    },
    _selected: {
      color: "content_active",
      borderColor: "common.primary_400",
    },
    _disabled: {
      color: "content_disabled",
      borderColor: "transparent",
    },
  },
  tablist: {
    position: "relative",
    zIndex: 0,
    border: "none",
    _after: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      display: "block",
      height: "1px",
      background: "content_active",
      opacity: 0.08,
      content: '""',
    },
  },
};

const tabsVariantSecondary = {
  tab: {
    color: "content_inactive",
    border: "2px solid",
    borderColor: "transparent",
    paddingLeft: "0.6rem",
    paddingRight: "0.6rem",
    paddingTop: "0.2rem",
    paddingBottom: "0.2rem",
    borderRadius: "3rem",
    fontWeight: 500,
    marginBottom: "0",
    _hover: {
      color: "content_active",
      borderColor: "content_alpha_300",
      _disabled: {
        color: "content_disabled",
        borderColor: "transparent",
      },
    },
    _active: {
      color: "content_active",
      borderColor: "common.primary_200",
    },
    _focus: {
      boxShadow: "outline",
    },
    _selected: {
      color: "content_active",
      borderColor: "common.primary_400",
    },
    _disabled: {
      color: "content_disabled",
      borderColor: "transparent",
    },
  },
};

const baseInputVariantFilled = {
  color: "content_inactive",
  background: "input_normal",
  border: "1px solid",
  borderColor: "content_alpha_200",
  borderRadius: "lg",
  _focus: {
    background: "input_active",
    borderColor: "content_alpha_300",
    color: "content_active",
    boxShadow: "outline",
  },
  _hover: {
    background: "input_hover",
    borderColor: "content_alpha_300",
    color: "content_inactive",
  },
  _active: {
    background: "input_active",
    borderColor: "content_alpha_300",
    color: "content_inactive",
  },
  _disabled: {
    opacity: "1",
    background: "input_disabled",
    color: "content_disabled",
    borderColor: "content_alpha_200",
  },
  _invalid: {
    borderColor: "common.negative",
    _focus: {
      background: "input_active",
      borderColor: "common.negative",
      color: "content_active",
      boxShadow: "outline_negative",
    },
  },
  _autofill: {
    background: "input_normal",
    borderColor: "content_alpha_200",
    textFillColor: "var(--chakra-colors-content_inactive)",
    transition: "background-color 5000s ease-in-out 0s",
  },
};

const inputVariantFilled = {
  addon: {
    color: "content_inactive",
    _disabled: {
      color: "content_disabled",
    },
  },
  element: {
    color: "content_inactive",
    _disabled: {
      color: "content_disabled",
    },
  },
  field: baseInputVariantFilled,
};

const numberInputVariantFilled = {
  stepper: {
    color: "content_inactive",
    borderColor: "content_alpha_200",
    _disabled: {
      color: "content_disabled",
      borderColor: "content_alpha_200",
    },
  },
  field: baseInputVariantFilled,
};

const textareaVariantFilled = {
  ...baseInputVariantFilled,
  "::-webkit-resizer": {
    background: "none",
  },
};

const selectVariantFilled = {
  icon: {
    color: "content_inactive",
    _disabled: {
      color: "content_disabled",
    },
  },
  field: {
    ...baseInputVariantFilled,
    cursor: "pointer",
    "> option, > optgroup": {
      color: "content_inactive",
    },
  },
};

const checkboxVariantDefault = {
  control: {
    borderWidth: "1px",
    borderRadius: "4px",
    backgroundColor: "input_normal",
    borderColor: "content_alpha_200",
    _hover: {
      backgroundColor: "input_hover",
      borderColor: "content_alpha_300",
    },
    _active: {
      backgroundColor: "input_active",
      borderColor: "content_alpha_300",
    },
    _focus: {
      boxShadow: "outline",
    },
    _disabled: {
      backgroundColor: "transparent",
      color: "content_disabled",
      borderColor: "content_alpha_200",
      _hover: {
        backgroundColor: "transparent",
        borderColor: "content_alpha_200",
      },
    },
    _checked: {
      backgroundColor: "base_alpha_400",
      color: "content_active",
      borderColor: "content_alpha_200",
      _hover: {
        backgroundColor: "base_alpha_300",
        borderColor: "content_alpha_300",
      },
      _active: {
        backgroundColor: "base_alpha_300",
        borderColor: "content_alpha_300",
      },
      _focus: {
        backgroundColor: "base_alpha_300",
        borderColor: "content_alpha_300",
      },
      _disabled: {
        backgroundColor: "transparent",
        borderColor: "content_alpha_200",
        color: "content_disabled",
      },
    },
    _invalid: {
      borderColor: "common.negative",
      _focus: {
        borderColor: "common.negative",
        boxShadow: "outline_negative",
      },
    },
  },
};

const radioVariantDefault = {
  control: {
    borderWidth: "1px",
    backgroundColor: "input_normal",
    borderColor: "content_alpha_200",
    _hover: {
      backgroundColor: "input_hover",
      borderColor: "content_alpha_300",
    },
    _active: {
      backgroundColor: "input_active",
      borderColor: "content_alpha_300",
    },
    _focus: {
      boxShadow: "outline",
    },
    _disabled: {
      backgroundColor: "transparent",
      borderColor: "content_alpha_200",
      _before: {
        color: "content_disabled",
      },
      _hover: {
        backgroundColor: "transparent",
        borderColor: "content_alpha_200",
      },
    },
    _checked: {
      backgroundColor: "base_alpha_300",
      borderColor: "content_alpha_200",
      _before: {
        width: "calc(100% - 2px)",
        height: "calc(100% - 2px)",
        color: "content_active",
      },
      _hover: {
        backgroundColor: "base_alpha_300",
        borderColor: "content_alpha_300",
      },
      _active: {
        backgroundColor: "base_alpha_300",
        borderColor: "content_alpha_300",
      },
      _focus: {
        backgroundColor: "base_alpha_300",
        borderColor: "content_alpha_300",
      },
      _disabled: {
        backgroundColor: "transparent",
        borderColor: "content_alpha_200",
      },
    },
    _invalid: {
      borderColor: "common.negative",
      _focus: {
        borderColor: "common.negative",
        boxShadow: "outline_negative",
      },
    },
  },
};

const radioVariantSwitch = {
  container: {
    margin: "0",
  },
  control: {
    display: "none",
  },
  label: {
    position: "relative",
    borderRadius: "100vh",
    paddingX: "var(--radio-switch-space-x, var(--chakra-space-3-5))",
    paddingY: "var(--radio-switch-space-y, var(--chakra-space-2-5))",
    fontSize: "var(--radio-switch-text-size, var(--chakra-fontSizes-md))",
    margin: "0",
    lineHeight:
      "calc(var(--radio-switch-text-size, var(--chakra-fontSizes-md)) + var(--chakra-space-1))",
    color: "content_inactive",
    transition: "background-color 250ms ease-in-out, color 250ms ease-in-out",
    _hover: {
      background: "content_alpha_200",
      color: "content_active",
      _disabled: {
        background: "transparent",
        color: "content_disabled",
      },
    },
    _active: {
      background: "content_alpha_200",
      color: "content_active",
      _after: {
        position: "absolute",
        inset: "0",
        content: '""',
        pointerEvents: "none",
        borderRadius: "inherit",
        border: "1px solid",
        borderColor: "content_alpha_200",
      },
    },
    _focus: {
      boxShadow: "outline",
    },
    _disabled: {
      background: "transparent",
      color: "content_disabled",
    },
    _checked: {
      background: "content_alpha_200",
      color: "content_active",
    },
  },
};

const radioGroupVariantSwitch = {
  display: "inline-flex",
  background: "input_normal",
  border: "1px solid",
  borderColor: "content_alpha_100",
  borderRadius: "100vh",
  padding: "1",
  "& > *:not(:first-of-type)": {
    marginLeft: "1",
  },
};

const switchVariantDefault = {
  thumb: {
    position: "relative",
    background: "content_inactive",
    _after: {
      position: "absolute",
      inset: "-2px",
      content: '""',
      pointerEvents: "none",
      background: "inherit",
      borderRadius: "inherit",
    },
    _checked: {
      background: "content_active",
    },
  },
  track: {
    border: "1px solid",
    borderColor: "content_alpha_200",
    background: "base_alpha_300",
    padding: "1px",
    _hover: {
      borderColor: "content_alpha_300",
      background: "base_alpha_300",
    },
    _active: {
      borderColor: "content_alpha_300",
      background: "base_alpha_300",
    },
    _focus: {
      boxShadow: "outline",
    },
    _checked: {
      background: "common.primary_400",
      borderColor: "transparent",
      _hover: {
        background: "common.primary_300",
      },
      _active: {
        background: "common.primary_300",
      },
      _focus: {
        background: "common.primary_200",
      },
      _disabled: {
        background: "content_alpha_200",
        borderColor: "transparent",
      },
    },
    _disabled: {
      background: "transparent",
      borderColor: "content_alpha_200",
      _hover: {
        background: "transparent",
        borderColor: "content_alpha_200",
      },
    },
    _invalid: {
      borderColor: "common.negative",
      _focus: {
        borderColor: "common.negative",
        boxShadow: "outline_negative",
      },
    },
  },
};

const sliderVariantSolid = {
  track: {
    background: "content_alpha_200",
    height: "2",
    borderRadius: "full",
    _disabled: {
      background: "base_alpha_200",
    },
  },
  filledTrack: {
    background: "common.primary_400",
    _disabled: {
      background: "content_alpha_200",
    },
    "[data-disabled] > &": {
      // _disabled doesn't work
      background: "content_alpha_200",
    },
  },
  thumb: {
    background: "content_inactive",
    width: "4",
    height: "4",
    zIndex: 0,
    _disabled: {
      background: "content_disabled",
    },
  },
};

const progressVariantSolid = {
  track: {
    position: "relative",
    zIndex: 0,
    background: "base_alpha_300",
    height: "2",
    borderRadius: "full",
    color: "common.primary_400",
    _after: {
      position: "absolute",
      inset: 0,
      zIndex: -1,
      content: '""',
      borderRadius: "inherit",
      border: "1px solid",
      borderColor: "content_alpha_200",
    },
  },
  filledTrack: {
    backgroundColor: "currentColor",
    bgImage: null,
  },
};

const components = {
  Avatar: {
    variants: {
      socialAccount: {
        excessLabel: {
          background: "base_alpha_300",
          backgroundClip: "content-box",
          color: "content_inactive",
          fontSize: "0.6em",
        },
      },
    },
  },
  Accordion: {
    baseStyle: {
      container: {
        '&[data-collapsed-visible="true"] > .chakra-collapse': {
          overflow: "initial !important",
          display: "initial !important",
          opacity: "initial !important",
          height: "initial !important",
        },
      },
    },
    variants: {
      section: {
        root: {},
        container: {
          border: 0,
          borderRadius: "md",
          background: "base_level_3",
          "& + &": {
            marginTop: 3,
          },
        },
        button: {
          position: "relative",
          paddingX: 4,
          paddingY: 3,
          fontSize: "lg",
          fontWeight: "500",
          borderRadius: "inherit",
          color: "content_inactive",
          _hover: {
            background: "content_alpha_200",
            color: "content_active",
            textDecoration: "none",
            boxShadow: "outline",
            _after: {
              position: "absolute",
              inset: "0",
              content: '""',
              pointerEvents: "none",
              borderRadius: "inherit",
              border: "1px solid",
              borderColor: "content_alpha_300",
            },
            _disabled: {
              background: "content_alpha_200",
              color: "content_disabled",
              boxShadow: "none",
              _after: {
                border: "none",
              },
            },
          },
          _focus: {
            background: "content_alpha_200",
            color: "content_active",
            boxShadow: "outline",
          },
          _expanded: {
            background: "transparent",
            color: "content_active",
          },
          _disabled: {
            background: "content_alpha_200",
            color: "content_disabled",
          },
        },
        icon: {
          marginLeft: "auto",
        },
        panel: {
          paddingX: 4,
          paddingTop: 2,
          paddingBottom: 4,
          borderRadius: "inherit",
        },
      },
      outline: {
        root: {},
        container: {
          borderRadius: "md",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "content_alpha_200",
          background: "base_level_2",
          "& + &": {
            marginTop: 3,
          },
        },
        button: {
          position: "relative",
          paddingX: 4,
          paddingY: 3,
          fontSize: "lg",
          fontWeight: "500",
          borderRadius: "inherit",
          color: "content_inactive",
          _hover: {
            background: "content_alpha_200",
            color: "content_active",
            textDecoration: "none",
            boxShadow: "outline",
            _after: {
              position: "absolute",
              inset: 0,
              content: '""',
              pointerEvents: "none",
              borderRadius: "inherit",
              border: "1px solid",
              borderColor: "content_alpha_300",
            },
            _disabled: {
              background: "content_alpha_200",
              color: "content_disabled",
              boxShadow: "none",
              _after: {
                border: "none",
              },
            },
          },
          _focus: {
            background: "content_alpha_200",
            color: "content_active",
            boxShadow: "outline",
          },
          _expanded: {
            background: "transparent",
            color: "content_active",
          },
          _disabled: {
            background: "content_alpha_200",
            color: "content_disabled",
          },
          '&[aria-expanded="true"], [data-collapsed-visible="true"] > &': {
            _before: {
              position: "absolute",
              bottom: "-1px",
              left: 4,
              right: 4,
              content: '""',
              borderBottom: "1px solid",
              borderColor: "content_alpha_100",
              _hover: {
                display: "none",
              },
            },
          },
        },
        icon: {
          marginLeft: "auto",
        },
        panel: {
          padding: 4,
          borderRadius: "inherit",
        },
      },
    },
  },
  Alert: {
    baseStyle: {
      container: {
        paddingX: 2,
        paddingY: 2,
        fontSize: "sm",
      },
      description: {
        a: {
          color: "inherit",
          textDecoration: "underline",
          _hover: {
            textDecoration: "none",
          },
        },
      },
    },
  },
  Checkbox: {
    variants: {
      default: checkboxVariantDefault,
    },
    defaultProps: {
      variant: "default",
    },
    sizes: {
      sm: {
        control: {
          width: "var(--chakra-sizes-4)",
          height: "var(--chakra-sizes-4)",
        },
      },
      md: {
        control: {
          width: "var(--chakra-sizes-5)",
          height: "var(--chakra-sizes-5)",
        },
      },
      lg: {
        control: {
          width: "var(--chakra-sizes-6)",
          height: "var(--chakra-sizes-6)",
        },
      },
    },
  },
  Button: {
    defaultProps: {
      size: "md",
      variant: "secondary",
    },
    baseStyle: {
      fontWeight: "500",
      color: "content_inactive",
      borderRadius: "lg",
    },
    variants: {
      solid: buttonVariantPrimary,
      danger: {
        background: "common.negative",
        color: "white",
        _hover: {
          background: "common.negative",
          textDecoration: "none",
          _disabled: {
            background: "common.negative",
            color: "white",
          },
        },
        _active: {
          background: "red.400",
        },
        _focus: {
          background: "red.400",
        },
        _disabled: {
          background: "base_alpha_100",
          color: "content_disabled",
        },
        _loading: {
          background: "common.negative",
          color: "white",
        },
      },
      secondary: buttonVariantSecondary,
      ghost: buttonVariantGhost,
      dashed: buttonVariantDashed,
      unstyled: {
        background: "transparent",
        color: "content_inactive",
        _hover: {
          background: "transparent",
          color: "common.primary_400",
        },
        _focus: {
          background: "transparent",
          color: "content_inactive",
          boxShadow: "none",
        },
        _active: {
          background: "transparent",
          color: "common.primary_400",
        },
        _disabled: {
          background: "transparent",
          color: "content_disabled",
        },
        _loading: {
          background: "transparent",
          color: "content_inactive",
        },
      },
      outline: {
        borderColor: "common.primary_400",
        color: "common.primary_400",
        background: "transparent",
        _hover: {
          background: "common.primary_400",
          color: "gray.600",
        },
        _focus: {
          background: "common.primary_400",
          color: "gray.600",
        },
        _active: {
          background: "common.primary_400",
          color: "gray.600",
        },
        _loading: {
          borderColor: "common.primary_400",
          color: "common.primary_400",
          background: "transparent",
        },
      },
      heading: {
        bg: "transparent",
        px: "0",
        fontWeight: "400",
        textTransform: "uppercase",
        _active: {
          bg: "transparent",
        },
        _focus: {
          bg: "transparent",
        },
        _hover: {
          bg: "transparent",
          color: "common.primary_400",
        },
      },
      link: {
        color: "common.primary_400",
        _hover: {
          background: "transparent",
          color: "common.primary_400",
        },
      },
    },
  },
  CloseButton: {
    baseStyle: {
      border: "0",
      background: "transparent",
      color: "content_inactive",
    },
    defaultProps: {
      size: "sm",
    },
  },
  Divider: {
    baseStyle: {
      borderColor: "content_alpha_200",
      opacity: 1,
    },
  },
  IconButton: {
    defaultProps: {
      size: "md",
    },
  },
  Drawer: {
    parts: ["body", "header", "footer"],
    baseStyle: {
      content: {
        backgroundColor: "base_level_3",
        color: "content_inactive",
      },
      header: {
        paddingInlineEnd: 3,
        paddingInlineStart: 3,
      },
      body: {
        paddingInlineEnd: 3,
        paddingInlineStart: 3,
      },
      footer: {
        paddingInlineEnd: 3,
        paddingInlineStart: 3,
      },
    },
  },
  Heading: {
    baseStyle: {
      color: "content_inactive",
    },
  },
  Modal: {
    baseStyle: modalBaseStyle,
    variants: {
      line: {
        dialog: {
          paddingX: 5,
        },
        closeButton: {
          top: 5,
          right: 5,
          fontSize: "sm",
        },
        header: {
          paddingX: 0,
          paddingY: 4,
          borderBottom: "1px solid",
          borderColor: "content_alpha_200",
          fontSize: "xl",
        },
        footer: {
          paddingX: 0,
          paddingY: 4,
          borderTop: "1px solid",
          borderColor: "content_alpha_200",
        },
        body: {
          marginX: -5,
          paddingX: 5,
          paddingY: 4,
        },
      },
      "line-min": {
        closeButton: {
          top: 3,
          right: 4,
          fontSize: "xs",
        },
        header: {
          paddingX: 4,
          paddingY: 2.5,
          borderBottom: "1px solid",
          borderColor: "content_alpha_200",
        },
        footer: {
          paddingX: 4,
          paddingY: 3,
          borderTop: "1px solid",
          borderColor: "content_alpha_200",
        },
        body: {
          paddingX: 4,
          paddingY: 3,
        },
      },
    },
  },
  Popover: {
    baseStyle: popoverBaseStyle,
  },
  List: {
    baseStyle: {
      container: {
        margin: "0",
        padding: "0",
      },
      item: {
        margin: "0",
        padding: "0",
      },
    },
  },
  Menu: {
    baseStyle: menuBaseStyle,
    sizes: {
      xs: {
        list: {
          fontSize: "xs",
          lineHeight: "1rem",
        },
        item: {
          paddingX: "3",
          paddingY: "2",
        },
      },
      sm: {
        list: {
          fontSize: "sm",
          lineHeight: "1rem",
        },
        item: {
          paddingX: "3",
          paddingY: "3",
        },
      },
    },
    defaultProps: {
      size: "md",
    },
  },
  Tabs: {
    baseStyle: tabsBaseStyle,
    variants: {
      unstyled: {
        tabpanel: {
          padding: "0",
        },
      },
      secondary: tabsVariantSecondary,
      line: tabsVariantLine,
      sticky: {
        root: {
          position: "sticky",
          top: 0,
          zIndex: 2,
          background: "base_level_1",
        },
        tab: {
          ...tabsVariantLine.tab,
        },
        tablist: {
          ...tabsVariantLine.tablist,
          paddingX: 3,
          overflowX: "auto",
        },
        tabpanel: {
          paddingX: 3,
          paddingY: 3,
        },
      },
    },
    defaultProps: {
      variant: "line",
    },
  },
  Text: {
    baseStyle: {
      margin: "0",
    },
  },
  Radio: {
    variants: {
      default: radioVariantDefault,
      switch: radioVariantSwitch,
    },
    defaultProps: {
      variant: "default",
    },
    sizes: {
      sm: {
        container: {
          "--radio-switch-space-x": "var(--chakra-space-3)",
          "--radio-switch-space-y": "var(--chakra-space-1-5)",
          "--radio-switch-text-size": "var(--chakra-fontSizes-md)",
        },
        control: {
          width: "var(--chakra-sizes-4)",
          height: "var(--chakra-sizes-4)",
        },
      },
      md: {
        container: {
          "--radio-switch-space-x": "var(--chakra-space-3-5)",
          "--radio-switch-space-y": "var(--chakra-space-2-5)",
          "--radio-switch-text-size": "var(--chakra-fontSizes-md)",
        },
        control: {
          width: "var(--chakra-sizes-5)",
          height: "var(--chakra-sizes-5)",
        },
      },
      lg: {
        container: {
          "--radio-switch-space-x": "var(--chakra-space-4)",
          "--radio-switch-space-y": "var(--chakra-space-3)",
          "--radio-switch-text-size": "var(--chakra-fontSizes-xl)",
        },
        control: {
          width: "var(--chakra-sizes-6)",
          height: "var(--chakra-sizes-6)",
        },
      },
    },
  },
  RadioGroup: {
    variants: {
      switch: radioGroupVariantSwitch,
    },
  },
  Tooltip: {
    baseStyle: {
      "--popper-arrow-bg": "var(--chakra-colors-black)",
      background: "black",
      color: "white",
      fontWeight: "normal",
      fontSize: "xs",
      padding: "0.25rem 0.5rem",
    },
    variants: {
      error: {
        "--popper-arrow-bg": "var(--chakra-colors-common-negative)",
        background: "common.negative",
        color: "white",
      },
    },
  },
  Select: {
    variants: {
      filled: selectVariantFilled,
    },
    defaultProps: {
      variant: "filled",
    },
  },
  Input: {
    variants: {
      filled: inputVariantFilled,
    },
    defaultProps: {
      variant: "filled",
    },
  },
  NumberInput: {
    variants: {
      filled: numberInputVariantFilled,
    },
    defaultProps: {
      variant: "filled",
    },
  },
  Textarea: {
    variants: {
      filled: textareaVariantFilled,
    },
    defaultProps: {
      variant: "filled",
    },
  },
  Link: {
    baseStyle: linkBaseStyle,
  },
  Table: {
    variants: {
      simple: {
        th: {
          fontWeight: "normal",
          fontSize: "sm",
          textTransform: "none",
          letterSpacing: "0",
          borderColor: "content_alpha_200",
          color: "content_inactive",
        },
        td: {
          borderColor: "content_alpha_200",
        },
        tbody: {
          tr: {
            _last: {
              th: {
                borderBottom: "none",
              },
              td: {
                borderBottom: "none",
              },
            },
          },
        },
      },
      complex: {
        th: {
          px: "2",
          fontWeight: "400",
          fontSize: "sm",
          letterSpacing: "0",
          borderColor: "base_alpha_100",
          color: "content_inactive",
          _last: {
            pr: "4",
          },
          "&[data-is-numeric]": {
            textAlign: "end",
          },
        },
        td: {
          px: "2",
          py: "2",
          verticalAlign: "top",
          fontWeight: "400",
          fontSize: "sm",
          letterSpacing: "0",
          color: "content_details",
          _last: {
            pr: "4",
          },
          "&[data-is-numeric]": {
            textAlign: "end",
          },
        },
        tr: {
          _odd: {
            td: {
              background: "content_alpha_100",
            },
          },
        },
      },
    },
  },
  Badge: {
    baseStyle: {
      textTransform: "capitalize",
      borderRadius: "4px",
      "> svg": {
        verticalAlign: "middle",
        marginRight: 0.5,
      },
    },
    sizes: {
      sm: {
        fontSize: "sm",
      },
      md: {
        fontSize: "md",
      },
      lg: {
        fontSize: "lg",
      },
    },
    variants: {
      solid: {
        background: "common.primary_400",
        color: "content_onprimary",
        _hover: {
          textDecoration: "none",
        },
      },
      neutral: {
        fontWeight: 500,
        background: "content_active",
        color: "content_inverse",
        paddingY: "2px",
        paddingX: "6px",
      },
      primary: {
        fontWeight: 500,
        background: "common.primary_400",
        color: "content_onprimary",
        paddingY: "2px",
        paddingX: "6px",
      },
      secondary: {
        fontWeight: 500,
        background: "content_alpha_200",
        color: "content_inactive",
        paddingY: "2px",
        paddingX: "6px",
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
  Switch: {
    defaultProps: {
      variant: "default",
    },
    baseStyle: {
      container: {
        margin: 0, // reset global (from .scss file) style
      },
    },
    variants: {
      default: switchVariantDefault,
    },
  },
  FormError: {
    baseStyle: {
      text: {
        color: "common.negative",
      },
    },
  },
  FormLabel: {
    defaultProps: {
      size: "md",
    },
    baseStyle: {
      color: "content_inactive",
      textTransform: "capitalize",
      fontWeight: "normal",
      marginX: 0,
      marginTop: 0,
      marginBottom: 1.5,
      _disabled: {
        color: "content_disabled",
      },
    },
    sizes: {
      sm: {
        fontSize: "xs",
      },
      md: {
        fontSize: "sm",
      },
      lg: {
        fontSize: "md",
      },
    },
  },
  Breadcrumb: {
    baseStyle: breadcrumbBaseStyle,
  },
  Progress: {
    defaultProps: {
      variant: "solid",
    },
    variants: {
      solid: progressVariantSolid,
    },
  },
  Slider: {
    defaultProps: {
      variant: "solid",
    },
    variants: {
      solid: sliderVariantSolid,
    },
  },
  RangeSlider: {
    defaultProps: {
      variant: "solid",
    },
    variants: {
      solid: sliderVariantSolid,
    },
  },
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("#EAEAE8", "#1E1E1E")(props),
      overflowY: "auto", // needed for full screen mode;
    },
    ".chakra-ui-dark": {
      colorScheme: "dark", // sets scrollbars to os dark ui colors. For some reason chakra does not set it by default;
    },
    "*::placeholder": {
      color: "content_note",
    },
    "*, *::before, ::after": {
      borderColor: "content_alpha_200",
    },
    ".chakra-button__group > *:not(style) ~ *:not(style)": {
      marginStart: "1px",
    },
    "[data-js-focus-visible] :focus:not([data-focus-visible-added])": {
      outline: "none",
      boxShadow: "none",
    },
  }),
};

export const ALERT_STYLES = {
  info: {
    icon: FaInfo,
    background: "common.safe_dark",
    color: "white",
  },
  warning: {
    icon: FaExclamationTriangle,
    background: "common.warning",
    color: "white",
  },
  success: {
    icon: FaRegSmile,
    background: "common.positive_light",
    color: "common.gray_900",
  },
  error: {
    icon: FaRegSurprise,
    background: "common.negative",
    color: "white",
  },
};

export const TOAST_STYLES = {
  info: {
    icon: FaInfo,
    background: "base_level_3",
    color: "content_inactive",
    iconColor: "common.safe_dark",
  },
  warning: {
    icon: FaExclamationTriangle,
    background: "base_level_3",
    color: "content_inactive",
    iconColor: "common.warning",
  },
  success: {
    icon: FaRegSmile,
    background: "base_level_3",
    color: "content_inactive",
    iconColor: "common.positive_light",
  },
  error: {
    icon: FaRegSurprise,
    background: "base_level_3",
    color: "content_inactive",
    iconColor: "common.negative",
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const fonts = {
  body: "Rubik, sans-serif",
  heading: "Rubik, sans-serif",
};

export const theme = extendTheme(
  {
    fonts,
    colors,
    breakpoints,
    components,
    styles,
    config,
    semanticTokens,
  },
  withProse()
);
