import {
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
  SystemStyleObject,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import { Select } from "chakra-react-select";
import { FaChevronDown, FaChevronUp, FaDownload } from "react-icons/fa";
import { DOWNLOAD_OPTIONS } from "../constants";
import { useCallback, useState } from "react";

interface NavbarProps {
  editor: Editor;
}

const Navbar = ({ editor }: NavbarProps) => {
  const [selectedFormat, setSelectedFormat] = useState<{
    label: string;
    value: string;
  }>(DOWNLOAD_OPTIONS[0]);

  const handleDownload = useCallback(() => {
    if (!editor) return;

    switch (selectedFormat.value) {
      case "html":
        console.log(editor.getHTML());
        break;
      case "json":
        console.log(editor.getJSON());
        break;
      default:
        break;
    }
  }, [editor, selectedFormat]);

  return (
    <Flex h="48px" px={4} align="center" w="full" bgColor="base_level_3">
      <Spacer />
      <Menu isLazy>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
              size="sm"
            >
              Export
            </MenuButton>
            <MenuList zIndex="docked" p={2}>
              <VStack align="flex-start" w="full">
                <Text>Export as</Text>
                <Select
                  options={DOWNLOAD_OPTIONS}
                  defaultValue={DOWNLOAD_OPTIONS[0]}
                  // @ts-ignore
                  onChange={(selected) => setSelectedFormat(selected)}
                  size="sm"
                  chakraStyles={{
                    container: (provided: SystemStyleObject) => ({
                      ...provided,
                      w: "full",
                    }),
                    option: (provided: SystemStyleObject, state) => ({
                      ...provided,
                      color: state.isSelected
                        ? "common.primary_400"
                        : "inherit",
                    }),
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
                <Divider />
                <Button
                  w="full"
                  size="sm"
                  leftIcon={<FaDownload />}
                  variant="solid"
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </VStack>
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};

export default Navbar;
