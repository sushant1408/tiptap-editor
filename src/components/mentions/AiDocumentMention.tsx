// @ts-nocheck
import Mention from "@tiptap/extension-mention";
import { getAIDocuments } from "../../data-access";
import { PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { MentionChars } from "../../constants";

const HashMentionList = forwardRef((props, ref) => {
  const {items, command} = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index) => {
    const item = items[index];

    if (item) {
      command({ id: item?.title });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <VStack
      bgColor="base_level_3"
      borderRadius="lg"
      boxShadow="md"
      align="start"
      spacing={0}
      maxH="370px"
      maxW="300px"
      overflowY="auto"
      sx={{
        p: {
          marginY: "0 !important",
        },
      }}
    >
      {items?.map((item, index) => (
        <HStack
          key={index}
          onClick={() => selectItem(index)}
          bgColor={
            index === selectedIndex ? "content_alpha_200" : ""
          }
          w="full"
          py={1.5}
          px={3}
          _hover={{
            cursor: "pointer",
            backgroundColor: "content_alpha_200",
          }}
        >
          <Icon as={CgFileDocument} />
          <VStack align="start" spacing={0}>
            <Text noOfLines={1}>{item?.title}</Text>
            <Text noOfLines={1} fontSize="xs" color="content_note">
              {item?.prompt?.title}
            </Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
});

const DocumentMention = Mention.extend({
  name: "DocumentMention",
}).configure({
  HTMLAttributes: {
    class: "doc-mention",
  },
  suggestion: {
    items: async (query) => {
      try {
        const response = await getAIDocuments();

        return response.data?.results;
      } catch (error) {
        return [];
      }
    },
    char: MentionChars.HASH,
    pluginKey: new PluginKey("hashKey"),
    render: () => {
      let component;
      let popup;

      return {
        onStart: (props) => {
          component = new ReactRenderer(HashMentionList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          popup = tippy("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        },
        onUpdate(props) {
          component.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },
        onKeyDown(props) {
          if (props.event.key === "Escape") {
            popup[0].hide();

            return true;
          }

          return component?.ref?.onKeyDown(props);
        },
        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  },
});

export default DocumentMention;
