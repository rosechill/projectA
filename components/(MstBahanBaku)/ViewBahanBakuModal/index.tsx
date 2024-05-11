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
import { DataBahanBaku } from "@/interfaces/BahanBakuInterface";
import Image from "next/image";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  bahanBakuData: any | null;
}

const ViewBahanBakuModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  title,
  bahanBakuData,
}) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          {bahanBakuData && (
            <div className="flex flex-col gap-2 pt-2 h-fit">
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">Id Bahan Baku</p>
                <p>: </p>
                <p>{bahanBakuData.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">Nama</p>
                <p>: </p>
                <p>{bahanBakuData.name}</p>
              </div>
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">Stok</p>
                <p>: </p>
                <p>{bahanBakuData.stok}</p>
              </div>
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">Satuan</p>
                <p>: </p>
                <p>{bahanBakuData.satuan}</p>
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

export default ViewBahanBakuModal;
