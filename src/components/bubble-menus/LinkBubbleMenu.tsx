import { Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { BubbleMenu, Editor } from "@tiptap/react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface LinkBubbleMenuProps {
  editor: Editor;
  onEditLink: () => void;
};

const LinkBubbleMenu = ({ editor, onEditLink }: LinkBubbleMenuProps) => {
  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor, view, state, oldState, from, to }) => {
        // only show the bubble menu for links.
        return from === to && editor.isActive("link");
      }}
    >
      <Flex
        bgColor="base_level_3"
        borderRadius="lg"
        boxShadow="md"
        p={2}
        direction="column"
        maxW="370px"
        w="300px"
      >
        <Text
          sx={{
            marginTop: "0 !important",
            marginBottom: "0.5rem !important"
          }}
          noOfLines={2}
        >
          {editor.getAttributes("link").href}
        </Text>
        <ButtonGroup size="sm" alignSelf="end">
          <Button variant="solid" onClick={onEditLink}>
            Edit
          </Button>
          <Button
            rightIcon={<FaExternalLinkAlt />}
            onClick={() =>
              window.open(editor.getAttributes("link").href, "_blank")
            }
          >
            Open
          </Button>
        </ButtonGroup>
      </Flex>
    </BubbleMenu>
  );
};

export default LinkBubbleMenu;
