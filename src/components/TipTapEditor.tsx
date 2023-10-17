import { useCallback, useEffect, useState } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
import EditLinkModal from "./modals/EditLinkModal";
import Navbar from "./Navbar";
import { getDocumentDetails } from "../data-access";
var QuillDeltaToHtmlConverter =
  require("quill-delta-to-html").QuillDeltaToHtmlConverter;

const TipTapEditor = () => {
  const [content, setContent] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const editor = useEditor(
    {
      autofocus: true,
      editable: false, // toggles between editable and read-only mode
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
        Table.configure({
          resizable: true,
        }),
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
    },
    [content]
  );

  const saveLink = useCallback(
    (url: string) => {
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
    },
    [editor, onClose]
  );

  const fetchDocumentDetails = useCallback(async () => {
    try {
      const response = await getDocumentDetails();

      var deltaOps = response.data?.content?.ops;
      var cfg = {};
      var converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);
      var html = converter.convert();

      setContent(html);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchDocumentDetails();
  }, []);

  const openModal = useCallback(() => {
    if (!editor) return;
    onOpen();
  }, [editor, onOpen]);

  const removeLink = useCallback(() => {
    if (!editor) return;

    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onClose();
  }, [editor, onClose]);

  return (
    <>
      <Flex direction="column" flexGrow={1} w="full" maxW="full">
        {editor && (
          <>
            <Navbar editor={editor} />
            <TipTapMenuBar editor={editor} onEditLink={openModal} />
            <LinkBubbleMenu editor={editor} onEditLink={openModal} />
            <AIBubbleMenu editor={editor} />
          </>
        )}

        <Flex
          direction="row"
          justifyContent="center"
          id="scrolling-container"
          overflowY="auto"
          py={8}
          w="full"
        >
          <Box
            maxW="864px"
            height="max-content"
            bg="white"
            w="full"
            minH="1056px"
            position="relative"
            id="scrolling-bounds"
            p={["4", "4", "4", "16"]}
            borderRadius="md"
            mb={4}
            mt={8}
            mx={0}
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

      <EditLinkModal
        isOpen={isOpen}
        onClose={onClose}
        intialValue={editor ? editor.getAttributes("link").href : ""}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      />
    </>
  );
};

export default TipTapEditor;
