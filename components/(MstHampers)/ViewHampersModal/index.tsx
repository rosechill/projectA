"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { DataHampers } from "@/interfaces/HampersInterfaces";
import Image from "next/image";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  hampersData: DataHampers | null;
}

const ViewHampersModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  title,
  hampersData,
}) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          {hampersData && (
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Id Hampers</p>
                <p>: </p>
                <p>{hampersData.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Nama Hampers</p>
                <p>: </p>
                <p>{hampersData.name}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Harga Hampers</p>
                <p>: </p>
                <p>{hampersData.harga}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Kategori Hampers</p>
                <p>: </p>
                <p>{hampersData.kategori}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Gambar Hampers</p>
                <p>: </p>
                <Image
                  src={`http://127.0.0.1:8000/storage/${hampersData.gambar}`}
                  alt="Gambar"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <p className="w-[125px] font-semibold">
                    Detail Produk Hampers
                  </p>
                  <p>: </p>
                </div>
                <div className="flex flex-col gap-5 ms-10">
                  {hampersData.detail_hampers.map((detail, index) => (
                    <>
                      <div key={index} className="flex flex-col text-sm">
                        <div className="flex">
                          <p className="w-1/6 flex justify-start">
                            ID Produk
                          </p>
                          <p className="w-5/6">: {detail.produk.id}</p>
                        </div>
                        <div className="flex">
                          <p className="w-1/6 flex justify-start">
                            Nama Produk
                          </p>
                          <p className="w-5/6">: {detail.produk.name}</p>
                        </div>
                        <div className="flex">
                          <p className="w-1/6 flex justify-start">Harga</p>
                          <p className="w-5/6">: {detail.produk.harga}</p>
                        </div>
                      </div>
                      <Divider />
                    </>
                  ))}
                </div>
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

export default ViewHampersModal;
