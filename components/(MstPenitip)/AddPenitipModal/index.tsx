import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import PenitipForm from "../AddPenitipForm";

interface AddPenitipModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const AddPenitipModal: React.FC<AddPenitipModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          <PenitipForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddPenitipModal;
