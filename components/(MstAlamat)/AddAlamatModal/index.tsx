import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import AlamatForm from "../AddAlamatForm";

interface AddAlamatModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const AddAlamatModal: React.FC<AddAlamatModalProps> = ({
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
          <AlamatForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddAlamatModal;
