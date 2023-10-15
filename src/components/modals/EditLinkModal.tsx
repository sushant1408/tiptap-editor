// @ts-nocheck
import {
  Button,
  ButtonGroup,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

interface EditLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  intialValue: string;
  onSaveLink: (url: string) => void;
  onRemoveLink: () => void;
}

const EditLinkModal = ({
  isOpen,
  onClose,
  intialValue,
  onSaveLink,
  onRemoveLink,
}: EditLinkModalProps) => {
  const initialRef = useRef();
  const [url, setUrl] = useState("");

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Link</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input
              ref={initialRef}
              defaultValue={intialValue}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              size="sm"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup size="sm" alignSelf="end">
            <Button variant="danger" onClick={onRemoveLink}>
              Remove
            </Button>
            <Button variant="solid" onClick={() => onSaveLink(url)}>
              Save
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditLinkModal;
