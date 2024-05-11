import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { DataPembelianBahanBaku } from "@/interfaces/PembelianBahanBaku";
import EditPembelianBahanBakuForm from "../EditPembelianBahanBakuForm";

interface EditPembelianBahanBakuModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pembelianData: DataPembelianBahanBaku | null;
}

const EditPembelianBahanBakuModal: React.FC<EditPembelianBahanBakuModalProps> = ({
  isOpen,
  onClose,
  title,
  pembelianData,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          <EditPembelianBahanBakuForm
            pembelianData={pembelianData}
            onClose={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditPembelianBahanBakuModal;
