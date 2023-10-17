import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BubbleMenu, Editor } from "@tiptap/react";
import {
  FaCompressAlt,
  FaEllipsisV,
  FaExpandAlt,
  FaPen,
  FaRobot,
  FaShare,
  FaShieldAlt,
  FaSyncAlt,
} from "react-icons/fa";
import { countWords } from "../../utils";

interface AIBubbleMenuProps {
  editor: Editor;
}

const AIBubbleMenu = ({ editor }: AIBubbleMenuProps) => {
  const { view, state } = editor;
  const { from, to } = view.state.selection;
  const selectedText = state.doc.textBetween(from, to, "");

  if (!editor?.isEditable) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor, view, state, oldState, from, to }) => {
        // only show the bubble menu for links.
        return from !== to;
      }}
    >
      <Flex
        align="center"
        bgColor="base_level_3"
        px={2}
        py={1}
        borderRadius="lg"
        boxShadow="md"
        w="fit-content"
        gap={1}
        justify="center"
      >
        <Text pr={1} sx={{ margin: "0 !important" }}>
          {countWords(selectedText)}
        </Text>

        <Box h="20px" borderLeft="1px solid" borderColor="content_alpha_200" />

        <ButtonGroup alignItems="center" size="sm" variant="ghost" spacing={1}>
          <Button leftIcon={<FaSyncAlt />}>Improve</Button>
          <Box
            h="20px"
            borderLeft="1px solid"
            borderColor="content_alpha_200"
          />
          <Button leftIcon={<FaPen />}>Continue</Button>
          <Box
            h="20px"
            borderLeft="1px solid"
            borderColor="content_alpha_200"
          />
          <Button leftIcon={<FaCompressAlt />}>Shorten it</Button>
          <Box
            h="20px"
            borderLeft="1px solid"
            borderColor="content_alpha_200"
          />
          <Button leftIcon={<FaExpandAlt />}>Expand</Button>
        </ButtonGroup>

        <Box h="20px" borderLeft="1px solid" borderColor="content_alpha_200" />

        <Menu size="sm" isLazy placement="bottom">
          <MenuButton
            as={IconButton}
            icon={<FaEllipsisV />}
            size="sm"
            variant="ghost"
          />
          <MenuList minW={0} gap={1}>
            <MenuItem icon={<FaRobot />}>Run Command</MenuItem>
            <MenuItem icon={<FaShare />}>Publish on Social</MenuItem>
            <MenuItem icon={<FaShieldAlt />}>Plagiarism Check</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </BubbleMenu>
  );
};

export default AIBubbleMenu;
