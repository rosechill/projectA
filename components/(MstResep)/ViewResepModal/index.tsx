"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  resepData: any | null;
}

const ViewResepModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  title,
  resepData,
}) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          {resepData && (
            <div className="flex flex-col gap-2 pt-2 h-fit">
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">Id Resep</p>
                <p>: </p>
                <p>{resepData.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">produk</p>
                <p>: </p>
                <p>{resepData.produk.id} - {resepData.produk.name}</p>
              </div>
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">bahan baku</p>
                <p>: </p>
                <p>{resepData.bahan_baku.id} - {resepData.bahan_baku.name}</p>
              </div>
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">jumlah</p>
                <p>: </p>
                <p>{resepData.jumlah}</p>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            className="border-1 border-[#0370C3] bg-primary min-w-[100px] text-white"
            variant="flat"
            size="md"
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewResepModal;
