// @ts-nocheck
import Mention from "@tiptap/extension-mention";
import { getWorkspaceMembers } from "../../data-access";
import { PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { MentionChars } from "../../constants";

const AtMentionList = forwardRef((props, ref) => {
  const { items, command } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index) => {
    const item = items[index];

    if (item) {
      command({ id: `${item?.first_name} ${item?.last_name}` });
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
      {items.map((item, index) => (
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
          <Avatar size="xs" src={item?.profile_picture} name={item?.email} />
          <VStack align="start" spacing={0}>
            <Text>{`${item?.first_name} ${item?.last_name}`}</Text>
            <Text noOfLines={1} fontSize="xs" color="content_note">
              {item?.email}
            </Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
});

const MemberMention = Mention.extend({
  name: "MemberMention",
}).configure({
  HTMLAttributes: {
    class: "member-mention",
  },
  suggestion: {
    items: async ({ query }) => {
      try {
        const response = await getWorkspaceMembers();

        if (query.length === 0) {
          return response.data?.results;
        } else {
          return response.data?.results?.filter(
            (member) =>
              member?.email?.toLowerCase()?.startsWith(query.toLowerCase()) ||
              member?.first_name
                ?.toLowerCase()
                ?.startsWith(query.toLowerCase()) ||
              member?.last_name?.toLowerCase()?.startsWith(query.toLowerCase())
          );
        }
      } catch (error) {
        return [];
      }
    },
    char: MentionChars.AT,
    pluginKey: new PluginKey("atKey"),
    render: () => {
      let component;
      let popup;

      return {
        onStart: (props) => {
          component = new ReactRenderer(AtMentionList, {
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

          return component.ref?.onKeyDown(props);
        },
        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  },
});

export default MemberMention;
