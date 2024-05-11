import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { DataProduk } from "@/interfaces/ProdukInterface";
import EditBahanBakuForm from "../EditBahanBakuForm";

interface EditBahanBakuModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  bahanBakuData: any | null;
}

const EditProdukModal: React.FC<EditBahanBakuModalProps> = ({
  isOpen,
  onClose,
  title,
  bahanBakuData,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          <EditBahanBakuForm bahanBakuData={bahanBakuData} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProdukModal;
