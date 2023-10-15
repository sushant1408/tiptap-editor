import {
  ButtonGroup,
  Divider,
  Flex,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  SystemStyleObject,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import { Select, SingleValue } from "chakra-react-select";
import {
  FaAlignLeft,
  FaBold,
  FaCode,
  FaEllipsisV,
  FaHighlighter,
  FaItalic,
  FaLink,
  FaList,
  FaListOl,
  FaQuoteRight,
  FaRedo,
  FaRemoveFormat,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import { VscChecklist } from "react-icons/vsc";
import { TbBraces } from "react-icons/tb";
import { BiFontColor } from "react-icons/bi";
import {
  DEFAULT_COLOR_PRESETS,
  HEADING_OPTIONS,
  TEXT_ALIGN_OPTIONS,
} from "../constants";

interface TipTapMenuBarProps {
  editor: Editor;
  onEditLink: () => void;
}

const TipTapMenuBar = ({ editor, onEditLink }: TipTapMenuBarProps) => {
  // const { view, state } = editor;
  // const { from, to } = view.state.selection;
  // const text = state.doc.textBetween(from, to, "");

  return (
    <HStack
      bgColor="base_level_2"
      w="fit-content"
      align="center"
      justify="center"
      alignSelf="center"
      zIndex={1}
      position="sticky"
      px={3}
      py={2}
      borderRadius="lg"
      spacing={1}
      border="1px solid"
      borderColor="content_alpha_200"
      sx={{
        p: {
          marginY: "0 !important",
        },
      }}
    >
      <Select<{ label: string; value: number }>
        options={HEADING_OPTIONS}
        size="sm"
        onChange={(selected: SingleValue<{ label: string; value: number }>) => {
          // @ts-ignore
          editor.chain().focus().toggleHeading({ level: selected.value }).run();
        }}
        chakraStyles={{
          // @ts-ignore
          dropdownIndicator: (provided: SystemStyleObject) => ({
            ...provided,
            bg: null,
            color: "content_inactive",
            px: 2,
            fontSize: "xl",
            borderColor: "transparent",
            "> svg": {
              width: "1em",
              height: "1em",
            },
            "[data-disabled] > div > &": {
              cursor: "not-allowed",
              color: "content_disabled",
            },
          }),
          indicatorSeparator: (provided: SystemStyleObject) => ({
            ...provided,
            display: "none",
          }),
        }}
      />

      <Divider orientation="vertical" h="30px" ml={1} />

      <ButtonGroup size="sm" variant="ghost" spacing={1}>
        <IconButton
          aria-label="bold"
          icon={<FaBold />}
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
          isDisabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        />
        <IconButton
          aria-label="italic"
          icon={<FaItalic />}
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
          }}
          isDisabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        />
        <IconButton
          aria-label="underline"
          icon={<FaUnderline />}
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
          isDisabled={!editor.can().chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        />
        <IconButton
          aria-label="strike-through"
          icon={<FaStrikethrough />}
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
          }}
          isDisabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        />
      </ButtonGroup>

      <Divider orientation="vertical" h="30px" />

      <Menu isLazy placement="bottom">
        <MenuButton
          as={IconButton}
          icon={<FaListOl />}
          size="sm"
          variant="ghost"
        />
        <MenuList as={Flex} minW={0} p={1} gap={1}>
          <IconButton
            aria-label="ordered-list"
            icon={<FaListOl />}
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run();
            }}
            isDisabled={!editor.can().chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            size="sm"
            variant="ghost"
          />
          <IconButton
            aria-label="unordered-list"
            icon={<FaList />}
            onClick={() => {
              editor.chain().focus().toggleBulletList().run();
            }}
            isDisabled={!editor.can().chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            size="sm"
            variant="ghost"
          />

          <Divider orientation="vertical" h="30px" />

          <IconButton
            aria-label="tasks-list"
            icon={<VscChecklist />}
            onClick={() => {
              editor.chain().focus().toggleTaskList().run();
            }}
            isDisabled={!editor.can().chain().focus().toggleTaskList().run()}
            isActive={editor.isActive("taskList")}
            size="sm"
            variant="ghost"
          />
        </MenuList>
      </Menu>

      <Divider orientation="vertical" h="30px" />

      <Menu isLazy placement="bottom">
        <MenuButton
          as={IconButton}
          icon={<FaAlignLeft />}
          size="sm"
          variant="ghost"
        />
        <MenuList as={Flex} minW={0} p={1} gap={1}>
          {TEXT_ALIGN_OPTIONS.map((selected, index) => (
            <IconButton
              size="sm"
              variant="ghost"
              onClick={() => {
                editor.chain().focus().setTextAlign(selected.value).run();
              }}
              icon={<Icon as={selected.icon} />}
              aria-label={selected.label}
              key={index}
            />
          ))}
        </MenuList>
      </Menu>

      <Menu isLazy>
        <MenuButton
          as={IconButton}
          icon={<BiFontColor />}
          size="sm"
          variant="ghost"
        />
        <MenuList p={2}>
          <SimpleGrid columns={7} spacing={1}>
            {DEFAULT_COLOR_PRESETS.map((color, index) => (
              <Tooltip hasArrow label={color} key={index}>
                <MenuItem
                  as={GridItem}
                  bgColor={color}
                  h="25px"
                  w="25px"
                  borderRadius="md"
                  _hover={{ cursor: "pointer" }}
                  onClick={() => {
                    editor.chain().focus().setColor(color).run();
                  }}
                />
              </Tooltip>
            ))}
          </SimpleGrid>
        </MenuList>
      </Menu>

      <Menu isLazy>
        <MenuButton
          as={IconButton}
          icon={<FaHighlighter />}
          size="sm"
          variant="ghost"
        />
        <MenuList p={2}>
          <SimpleGrid columns={7} spacing={1}>
            {DEFAULT_COLOR_PRESETS.map((color, index) => (
              <Tooltip hasArrow label={color} key={index}>
                <MenuItem
                  as={GridItem}
                  bgColor={color}
                  h="25px"
                  w="25px"
                  borderRadius="md"
                  _hover={{ cursor: "pointer" }}
                  onClick={() => {
                    editor.chain().focus().toggleHighlight({ color }).run();
                  }}
                />
              </Tooltip>
            ))}
          </SimpleGrid>
        </MenuList>
      </Menu>

      <Divider orientation="vertical" h="30px" />

      <IconButton
        aria-label="link"
        icon={<FaLink />}
        onClick={onEditLink}
        isActive={editor.isActive("link")}
        size="sm"
        variant="ghost"
      />

      <Divider orientation="vertical" h="30px" />

      <ButtonGroup size="sm" variant="ghost" spacing={1}>
        <IconButton
          aria-label="undo"
          icon={<FaUndo />}
          onClick={() => {
            editor.chain().focus().undo().run();
          }}
          isDisabled={!editor.can().chain().focus().undo().run()}
        />
        <IconButton
          aria-label="redo"
          icon={<FaRedo />}
          onClick={() => {
            editor.chain().focus().redo().run();
          }}
          isDisabled={!editor.can().chain().focus().redo().run()}
        />
      </ButtonGroup>

      <Divider orientation="vertical" h="30px" />

      <Menu isLazy placement="bottom">
        <MenuButton
          as={IconButton}
          icon={<FaEllipsisV />}
          size="sm"
          variant="ghost"
        />
        <MenuList as={Flex} minW={0} p={1} gap={1}>
          <IconButton
            aria-label="code"
            icon={<FaCode />}
            onClick={() => {
              editor.chain().focus().toggleCode().run();
            }}
            isDisabled={!editor.can().chain().focus().toggleCode().run()}
            isActive={editor.isActive("code")}
            size="sm"
            variant="ghost"
          />
          <IconButton
            aria-label="block-code"
            icon={<TbBraces />}
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isDisabled={!editor.can().chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
            size="sm"
            variant="ghost"
          />

          <Divider orientation="vertical" h="30px" />

          <IconButton
            aria-label="block-quote"
            icon={<FaQuoteRight />}
            onClick={() => {
              editor.chain().focus().toggleBlockquote().run();
            }}
            isDisabled={!editor.can().chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            size="sm"
            variant="ghost"
          />

          <Divider orientation="vertical" h="30px" />

          <IconButton
            aria-label="superscript"
            icon={<FaSuperscript />}
            onClick={() => {
              editor.chain().focus().toggleSuperscript().run();
            }}
            isDisabled={!editor.can().chain().focus().toggleSuperscript().run()}
            isActive={editor.isActive("superscript")}
            size="sm"
            variant="ghost"
          />
          <IconButton
            aria-label="subscript"
            icon={<FaSubscript />}
            onClick={() => {
              editor.chain().focus().toggleSubscript().run();
            }}
            isDisabled={!editor.can().chain().focus().toggleSubscript().run()}
            isActive={editor.isActive("subscript")}
            size="sm"
            variant="ghost"
          />

          <Divider orientation="vertical" h="30px" />

          <IconButton
            aria-label="clear formatting"
            icon={<FaRemoveFormat />}
            onClick={() => {
              editor.chain().focus().unsetAllMarks().clearNodes().run();
            }}
            size="sm"
            variant="ghost"
          />
        </MenuList>
      </Menu>

      <Divider orientation="vertical" h="30px" />

      <Text ml={1}>{editor.storage.characterCount.words()} Words</Text>
    </HStack>
  );
};

export default TipTapMenuBar;
