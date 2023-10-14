// @ts-nocheck
import { Flex } from "@chakra-ui/react";
import {
  Node,
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  mergeAttributes,
} from "@tiptap/react";

const BannerElement = (props) => {
  return (
    <NodeViewWrapper>
      <Flex
        borderLeft="4px solid"
        borderLeftColor={props.node.attrs?.color}
        bgColor={`${props.node.attrs?.color}.50`}
        borderRadius="sm"
        align="center"
        py={3}
        px={2}
      >
        <NodeViewContent />
      </Flex>
    </NodeViewWrapper>
  );
};

const Banner = Node.create({
  name: "banner",

  group: "block",

  content: "inline*",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      color: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: "banner" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "banner",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BannerElement);
  },

  addCommands() {
    return {
      setBanner:
        attributes =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          });
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Shift-Enter": () => this.editor.chain().focus().enter().run(),
      "Mod-Enter": () => this.editor.chain().focus().setHardBreak().run(),
    };
  },
});

export default Banner;
