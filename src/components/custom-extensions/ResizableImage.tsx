// @ts-nocheck
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  mergeAttributes,
  nodeInputRule,
} from "@tiptap/react";
import Image from "@tiptap/extension-image";
import {
  Box,
  ButtonGroup,
  IconButton,
  Image as ChakraImage,
} from "@chakra-ui/react";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaExternalLinkAlt,
  FaTrash,
} from "react-icons/fa";
import { inputRegex } from "../../constants";
import { useCallback } from "react";

const ImageResizeComponent = (props) => {
  const handleResize = useCallback(
    (mouseDownEvent: React.MouseEvent<HTMLImageElement>) => {
      const parent = (mouseDownEvent.target as HTMLElement).closest(
        ".image-resizer"
      );
      const image = parent?.querySelector("img.postimage") ?? null;

      if (!image) return;

      const startSize = { x: image.clientWidth, y: image.clientHeight };
      const startPosition = {
        x: mouseDownEvent.pageX,
        y: mouseDownEvent.pageY,
      };

      function onMouseMove(mouseMoveEvent: MouseEvent) {
        props.updateAttributes({
          width: startSize.x - startPosition.x + mouseMoveEvent.pageX,
          height: startSize.y - startPosition.y + mouseMoveEvent.pageY,
        });
      }
      function onMouseUp() {
        document.body.removeEventListener("mousemove", onMouseMove);
      }

      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp, { once: true });
    },
    []
  );

  const handleAlign = useCallback((placement: string) => {
    props.updateAttributes({
      align: placement,
    });
  }, []);

  return (
    <NodeViewWrapper>
      <Box w="full" textAlign={props.node.attrs.align}>
        <Box className="image-resizer">
          <ChakraImage
            h={props.node.attrs.height}
            w={props.node.attrs.width}
            src={props.node.attrs.src}
            className="postimage"
          />

          <Box
            className="resize-trigger"
            position="absolute"
            top="-15px"
            right={0}
            left={0}
            mx="auto"
            bgColor="base_level_3"
            borderRadius="lg"
            w="fit-content"
          >
            <ButtonGroup size="sm" isAttached>
              <IconButton
                icon={<FaAlignLeft />}
                onClick={() => handleAlign("left")}
              />
              <IconButton
                icon={<FaAlignCenter />}
                onClick={() => handleAlign("center")}
              />
              <IconButton
                icon={<FaAlignRight />}
                onClick={() => handleAlign("right")}
              />
            </ButtonGroup>
          </Box>

          <ButtonGroup
            position="absolute"
            top="10px"
            right="10px"
            size="sm"
            className="resize-trigger"
          >
            <IconButton
              icon={<FaExternalLinkAlt />}
              onClick={() => window.open(props.node.attrs.src, "_blank")}
            />
            <IconButton icon={<FaTrash />} color="common.negative" />
          </ButtonGroup>

          {/* bottom right */}
          <Box
            position="absolute"
            right="-6px"
            bottom="-6px"
            onMouseDown={handleResize}
            className="resize-trigger"
            h="12px"
            w="12px"
            bgColor="common.primary_400"
            borderRadius="full"
            border="1px solid"
            borderColor="#777"
            _hover={{
              cursor: "nwse-resize",
            }}
          />
        </Box>
      </Box>
    </NodeViewWrapper>
  );
};

export interface ImageOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>;
}
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageResize: {
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: string | number;
        height?: string | number;
        align?: string;
        isDraggable?: boolean;
      }) => ReturnType;
    };
  }
}

const ResizableImage = Image.extend<ImageOptions>({
  name: "imageResize",

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      width: {
        default: "100%",
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: "auto",
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
          };
        },
      },
      align: {
        default: "center",
        renderHTML: (attributes) => {
          return {
            align: attributes.align,
          };
        },
      },
      isDraggable: {
        default: true,
        renderHTML: (attributes) => {
          return {};
        },
      },
      src: {
        default: null,
        renderHTML: (attributes) => {
          return {
            src: attributes.src,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "image-resizer",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "image-resizer",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageResizeComponent);
  },

  addCommands() {
    return {
      setResizableImage:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          });
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title, height, width, align, isDraggable] =
            match;
          return { src, alt, title, height, width, align, isDraggable };
        },
      }),
    ];
  },
});

export default ResizableImage;
