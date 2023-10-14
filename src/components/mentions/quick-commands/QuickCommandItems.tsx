import { BiSolidTagAlt } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { FaDraftingCompass, FaImages, FaQuoteRight, FaRobot, FaUser } from "react-icons/fa";
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6 } from "react-icons/lu";
import { RxDividerHorizontal } from "react-icons/rx";

const items = [
  {
    team_id: "ai-assist",
    team_title: "ai assist",
    children: [
      {
        id: "write-for-me",
        title: "Help Me Write",
        description: "",
        leftIcon: FaRobot,
        extra: {
          color: "common.green_lantern",
        },
        parent_team: "ai-assist",
      },
    ]
  },
  {
    team_id: "popular",
    team_title: "popular",
    children: [
      {
        id: "ai-assistant",
        title: "Open AI Toolkit",
        description: "Use 70+ AI writing templates",
        leftIcon: FaRobot,
        extra: {
          color: "common.green_lantern",
        },
        parent_team: "popular",
      },
      {
        id: "designs",
        title: "Simplified Design",
        description: "Add a Simplified design",
        leftIcon: FaDraftingCompass,
        extra: {
          color: "common.red_berry",
        },
        parent_team: "popular",
      },
    ],
  },
  {
    team_id: "text",
    team_title: "text",
    children: [
      {
        id: "heading-1",
        title: "Heading 1",
        leftIcon: LuHeading1,
        extra: {
          level: 1,
        },
        parent_team: "text",
      },
      {
        id: "heading-2",
        title: "Heading 2",
        leftIcon: LuHeading2,
        extra: {
          level: 2,
        },
        parent_team: "text",
      },
      {
        id: "heading-3",
        title: "Heading 3",
        leftIcon: LuHeading3,
        extra: {
          level: 3,
        },
        parent_team: "text",
      },
      {
        id: "heading-4",
        title: "Heading 4",
        leftIcon: LuHeading4,
        extra: {
          level: 4,
        },
        parent_team: "text",
      },
      {
        id: "heading-5",
        title: "Heading 5",
        leftIcon: LuHeading5,
        extra: {
          level: 5,
        },
        parent_team: "text",
      },
      {
        id: "heading-6",
        title: "Heading 6",
        leftIcon: LuHeading6,
        extra: {
          level: 6,
        },
        parent_team: "text",
      },
      {
        id: "blockquote",
        title: "Add Quotation",
        description: "Add a quote",
        leftIcon: FaQuoteRight,
        parent_team: "text",
      },
    ],
  },
  {
    team_id: "banners",
    team_title: "banners",
    children: [
      {
        id: "banner-green",
        title: "Green Banner",
        description: "Add a green banner",
        leftIcon: BiSolidTagAlt,
        extra: {
          color: "green",
        },
        parent_team: "banners",
      },
      {
        id: "banner-red",
        title: "Red Banner",
        description: "Add a Red banner",
        leftIcon: BiSolidTagAlt,
        extra: {
          color: "red",
        },
        parent_team: "banners",
      },
      {
        id: "banner-blue",
        title: "Blue Banner",
        description: "Add a blue banner",
        leftIcon: BiSolidTagAlt,
        extra: {
          color: "blue",
        },
        parent_team: "banners",
      },
      {
        id: "banner-yellow",
        title: "Yellow Banner",
        description: "Add a yellow banner",
        leftIcon: BiSolidTagAlt,
        extra: {
          color: "yellow",
        },
        parent_team: "banners",
      },
    ],
  },
  {
    team_id: "add",
    team_title: "add",
    children: [
      {
        id: "image",
        title: "Add Image",
        description: "Insert an image",
        leftIcon: FaImages,
        parent_team: "add",
      },
    ],
  },
  {
    team_id: "inline",
    team_title: "inline",
    children: [
      {
        id: "member-mention",
        title: "Mention a member",
        description: "",
        leftIcon: FaUser,
        parent_team: "inline",
      },
      {
        id: "doc-mention",
        title: "Mention a document",
        description: "",
        leftIcon: CgFileDocument,
        parent_team: "inline",
      },
    ],
  },
  {
    team_id: "advanced-blocks",
    team_title: "advanced blocks",
    children: [
      {
        id: "divider",
        title: "Divider",
        description: "Add a Divider",
        leftIcon: RxDividerHorizontal,
        parent_team: "advanced-blocks",
      },
    ],
  },
];

export default items;