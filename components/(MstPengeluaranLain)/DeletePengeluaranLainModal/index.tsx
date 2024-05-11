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
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DataPengeluaranLain } from "@/interfaces/PengeluaranLainInterface";
import { apiDeletePengeluaranLain } from "@/service/api/apiPengeluaranLain";
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pengeluaranLainData: DataPengeluaranLain| null;
}

const DeletePengeluaranLainModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  title,
  pengeluaranLainData,
}) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    const pengeluaranLainDataHandler = pengeluaranLainData!;
    apiDeletePengeluaranLain(pengeluaranLainDataHandler.id)
      .then(() => {
        toast("Delete success")
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast.error("Delete Failed");
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
            {title}
          </ModalHeader>
          <ModalBody>
            {pengeluaranLainData && (
              <div className="flex flex-col gap-2 pt-2">
                <h2>
                  Apakah ada yakin akan menghapus pengeluaran {" "}
                  <span className="font-semibold">{pengeluaranLainData.id}</span> ?
                </h2>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              className="border-1 border-[#0370C3] bg-primary text-white min-w-[100px]"
              variant="flat"
              size="md"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              color="danger"
              className="min-w-[100px]"
              variant="flat"
              size="md"
            >
              Delete Pengeluaran
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default DeletePengeluaranLainModal;
