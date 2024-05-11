import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import EditHampersForm from "../EditHampersForm";
import { DataHampers } from "@/interfaces/HampersInterfaces";

interface EditHampersModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  hampersData: DataHampers | null
}

const AddHampersModal: React.FC<EditHampersModalProps> = ({
  isOpen,
  onClose,
  title,
  hampersData
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          <EditHampersForm hamperData={hampersData} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddHampersModal;
