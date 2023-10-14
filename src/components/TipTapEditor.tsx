import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useRef, useState } from "react";
import TipTapMenuBar from "./TipTapMenuBar";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";
import LinkBubbleMenu from "./bubble-menus/LinkBubbleMenu";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import MemberMention from "./mentions/MemberMention";
import DocumentMention from "./mentions/AiDocumentMention";
import QuickCommandMention from "./mentions/quick-commands/QuickCommandMention";
import Banner from "./custom-extensions/Banner";
import ResizableImage from "./custom-extensions/ResizableImage";
import AIBubbleMenu from "./bubble-menus/AiBubbleMenu";

interface TipTapEditorProps {}

const TipTapEditor = ({}: TipTapEditorProps) => {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  const editor = useEditor({
    autofocus: true,
    editable: true,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Underline,
      TaskList,
      Superscript,
      Subscript,
      TextStyle,
      Color,
      CharacterCount,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      MemberMention,
      DocumentMention,
      QuickCommandMention,
      Banner,
      ResizableImage,
      Link.configure({
        openOnClick: false,
        validate: (href) => /^https?:\/\//.test(href),
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: "Hello World!!!",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image-resizer"],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const saveLink = useCallback(() => {
    if (!editor) return;

    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    onClose();
  }, [editor, url]);

  const openModal = useCallback(() => {
    if (!editor) return;

    setUrl(editor.getAttributes("link").href);
    onOpen();
  }, [editor, setUrl, onOpen]);

  const removeLink = useCallback(() => {
    if (!editor) return;

    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onClose();
  }, [editor, onClose]);

  return (
    <>
      <Flex direction="column" flexGrow={1} w="full" maxW="full">
        {editor && <TipTapMenuBar editor={editor} onEditLink={openModal} />}
        {editor && <LinkBubbleMenu editor={editor} onEditLink={openModal} />}
        {editor && <AIBubbleMenu editor={editor} />}

        <Flex
          direction="row"
          justifyContent="center"
          id="scrolling-container"
          overflowY="auto"
          py={8}
          w="full"
        >
          <Box
            maxW={isSmallScreen ? "90vw" : "864px"}
            height="max-content"
            bg="white"
            w="full"
            minH="1056px"
            position="relative"
            id="scrolling-bounds"
            p={["4", "4", "4", "16"]}
            borderRadius="md"
            mb={4}
            mt={isSmallScreen ? 4 : 8}
            mx={isSmallScreen ? 4 : 0}
            boxShadow="xl"
          >
            <Box pos="relative">
              <Prose>
                <EditorContent editor={editor} />
              </Prose>
            </Box>
          </Box>
        </Flex>
      </Flex>

      <Modal
        // @ts-ignore
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                // @ts-ignore
                ref={initialRef}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                size="sm"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup size="sm" alignSelf="end">
              <Button variant="danger" onClick={removeLink}>
                Remove
              </Button>
              <Button variant="solid" onClick={saveLink}>
                Save
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TipTapEditor;
