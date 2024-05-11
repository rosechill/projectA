import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import EditJabatanForm from "../EditJabatanForm";
import { DataJabatan } from "@/interfaces/JabatanInterface";

interface EditJabatanModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  JabatanData: DataJabatan | null;
}

const EditJabatanModal: React.FC<EditJabatanModalProps> = ({
  isOpen,
  onClose,
  title,
  JabatanData,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          <EditJabatanForm JabatanData={JabatanData} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditJabatanModal;
