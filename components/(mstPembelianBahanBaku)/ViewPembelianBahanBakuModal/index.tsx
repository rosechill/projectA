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
import { DataKaryawan } from "@/interfaces/KaryawanInterface";
import { DataPembelianBahanBaku } from "@/interfaces/PembelianBahanBaku";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pembelianData: DataPembelianBahanBaku | null;
}

const ViewPembelianBahanBakuModal: React.FC<ViewModalProps> = ({
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
          {pembelianData && (
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Id Pembelian</p>
                <p>: </p>
                <p>{pembelianData.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Bahan Baku</p>
                <p>: </p>
                <p>{pembelianData.bahan_baku.name}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Jumlah</p>
                <p>: </p>
                <p>{pembelianData.jumlah}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Total Harga</p>
                <p>: </p>
                <p>{pembelianData.total_harga}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Waktu</p>
                <p>: </p>
                <p>{pembelianData.waktu.toDateString()}</p>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            className="border-1 border-[#0370C3] bg-primary min-w-[100px]"
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

export default ViewPembelianBahanBakuModal;
