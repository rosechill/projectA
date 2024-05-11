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
import { DataHampers } from "@/interfaces/HampersInterfaces";
import { apiDeleteHampers } from "@/service/api/apiHampers";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  hampersData: DataHampers | null;
}

const DeleteHampersModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  title,
  hampersData,
}) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    const hamperDataHandler = hampersData!;
    apiDeleteHampers(hamperDataHandler.id)
      .then(() => {
        toast("Delete success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error: any) => {
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
            {hampersData && (
              <div className="flex flex-col gap-2 pt-2">
                <h2>
                  Apakah ada yakin akan menghapus hampers dengan nama{" "}
                  <span className="font-semibold">{hampersData.name}</span> ?
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
              Delete Produk
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default DeleteHampersModal;
