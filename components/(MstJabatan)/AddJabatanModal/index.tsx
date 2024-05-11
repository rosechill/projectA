import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import JabatanForm from "../AddJabatanForm";

interface AddJabatanModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const AddJabatanModal: React.FC<AddJabatanModalProps> = ({
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
          <JabatanForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddJabatanModal;
