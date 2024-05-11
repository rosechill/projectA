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
import { DataProduk } from "@/interfaces/ProdukInterface";
import Image from "next/image";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  produkData: any | null;
}

const ViewProdukModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  title,
  produkData,
}) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          {produkData && (
            <div className="flex flex-col gap-2 pt-2 h-fit">
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">Id Produk</p>
                <p>: </p>
                <p>{produkData.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">Nama</p>
                <p>: </p>
                <p>{produkData.name}</p>
              </div>
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">kategori</p>
                <p>: </p>
                <p>{produkData.kategori}</p>
              </div>
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">Kouta harian</p>
                <p>: </p>
                <p>{produkData.kuota_harian}</p>
              </div>
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">harga</p>
                <p>: </p>
                <p>{produkData.harga}</p>
              </div>
              <div className="flex gap-4">
                <p className="min-w-[150px] font-semibold">Path</p>
                <p>: </p>
                <p className="h-fit">{produkData.gambar}</p>
              </div>
              <Image
                src={`https://jurwawe.sga.dom.my.id/storage/${produkData?.gambar}`}
                alt="Gambar"
                width={300}
                height={300}
              />
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

export default ViewProdukModal;
