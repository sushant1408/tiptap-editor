// @ts-nocheck
import Mention from "@tiptap/extension-mention";
import { MentionChars } from "../../../constants";
import { PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Button, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import items from "./QuickCommandItems";

const SlashMentionList = forwardRef((props, ref) => {
  const { items, editor } = props;
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const selectItem = (teamIndex, childIndex) => {
    const item = items?.[teamIndex]?.children?.[childIndex];

    if (!item) return false;

    switch (item?.id) {
      case "blockquote":
        editor.chain().focus().toggleBlockquote().run();
        break;
      case "divider":
        editor.chain().focus().setHorizontalRule().run();
        break;
      case `banner-${item?.extra?.color}`:
        editor.chain().focus().setBanner({ color: item?.extra?.color }).run();
        break;
      case `heading-${item?.extra?.level}`:
        editor
          .chain()
          .focus()
          .toggleHeading({ level: item?.extra?.level })
          .run();
        break;
      case "image":
        editor
          .chain()
          .focus()
          .setResizableImage({
            src: "https://source.unsplash.com/8xznAGy4HcY/800x400",
            isDraggable: true,
          })
          .run();
        break;
      case "table":
        editor.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: false }).run();
        break;
      default:
        break;
    }
  };

  const upHandler = () => {
    if (selectedItemIndex === 0) {
      setSelectedTeamIndex(
        (selectedTeamIndex + items?.length - 1) % items?.length
      );
      setSelectedItemIndex(
        (selectedItemIndex +
          items?.[selectedTeamIndex - 1]?.children?.length -
          1) %
          items?.[selectedTeamIndex - 1]?.children?.length
      );
    } else if (Number.isInteger(selectedItemIndex)) {
      setSelectedItemIndex(
        (selectedItemIndex + items?.[selectedTeamIndex]?.children?.length - 1) %
          items?.[selectedTeamIndex]?.children?.length
      );
    } else {
      setSelectedTeamIndex(items?.length - 1);
      setSelectedItemIndex(items?.[selectedTeamIndex]?.children?.length - 1);
    }
  };

  const downHandler = () => {
    if (selectedItemIndex >= items?.[selectedTeamIndex]?.children?.length - 1) {
      setSelectedTeamIndex((selectedTeamIndex + 1) % items?.length);
    }

    setSelectedItemIndex(
      (selectedItemIndex + 1) % items?.[selectedTeamIndex]?.children?.length
    );
  };

  const enterHandler = () => {
    selectItem(selectedTeamIndex, selectedItemIndex);
  };

  useEffect(() => {
    setSelectedTeamIndex(0);
    setSelectedItemIndex(0);
  }, [items]);

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
      overflowY="auto"
      sx={{
        p: {
          marginY: "0 !important",
        },
        paddingX: "0.75rem",
        paddingBottom: "0.75rem",
      }}
    >
      {items?.map((team, teamIndex) => {
        if (team?.children?.length === 0) {
          return null;
        }

        return (
          <React.Fragment key={teamIndex}>
            <Text
              textTransform="uppercase"
              fontSize="11px"
              color="content_disabled"
              py={1.5}
            >
              {team?.team_title}
            </Text>

            <SimpleGrid columns={2} w="full" spacing={2}>
              {team?.children?.map((child, childIndex) => {
                return (
                  <Button
                    key={childIndex}
                    size="sm"
                    leftIcon={
                      <Icon as={child?.leftIcon} color={child?.extra?.color} />
                    }
                    variant="ghost"
                    justifyContent="flex-start"
                    onClick={() => selectItem(teamIndex, childIndex)}
                    isTruncated
                    isActive={
                      teamIndex === selectedTeamIndex &&
                      childIndex === selectedItemIndex
                    }
                  >
                    {child?.title}
                  </Button>
                );
              })}
            </SimpleGrid>
          </React.Fragment>
        );
      })}
    </VStack>
  );
});

const QuickCommandMention = Mention.extend({
  name: "QuickCommandMention",
}).configure({
  suggestion: {
    items: ({ query }) => {
      if (query.length === 0) {
        return items;
      } else {
        let filteredItems = [];

        filteredItems = items.map((team) => {
          let newTeam = {
            ...team,
            children: team.children.filter((child) =>
              child?.title?.toLowerCase()?.startsWith(query.toLowerCase())
            ),
          };

          return newTeam;
        });

        return filteredItems;
      }
    },
    char: MentionChars.SLASH,
    pluginKey: new PluginKey("slashKey"),
    render: () => {
      let component;
      let popup;

      return {
        onStart: (props) => {
          component = new ReactRenderer(SlashMentionList, {
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

export default QuickCommandMention;
