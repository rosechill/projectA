import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import HampersForm from "../AddHampersForm";

interface AddHampersModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const AddHampersModal: React.FC<AddHampersModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          <HampersForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddHampersModal;
