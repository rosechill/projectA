import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import EditAlamatForm from "../EditAlamatForm";
import { DataAlamat } from "@/interfaces/AlamatInterface";

interface EditAlamatModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  AlamatData: DataAlamat | null;
}

const EditAlamatModal: React.FC<EditAlamatModalProps> = ({
  isOpen,
  onClose,
  title,
  AlamatData,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          <EditAlamatForm AlamatData={AlamatData} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditAlamatModal;
