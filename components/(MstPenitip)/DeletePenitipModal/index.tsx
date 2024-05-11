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
import "react-toastify/dist/ReactToastify.css";
import { DataPenitip } from "@/interfaces/PenitipInterface";
import { apiDeletePenitip } from "@/service/api/apiPenitip";
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  penitipData: DataPenitip | null;
}

const DeletePenitipModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  title,
  penitipData,
}) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    const penitipDataHandler = penitipData!;
    apiDeletePenitip(penitipDataHandler.id)
      .then(() => {
        toast("Delete success");
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
            {penitipData && (
              <div className="flex flex-col gap-2 pt-2">
                <h2>
                  Apakah ada yakin akan menghapus penitip{" "}
                  <span className="font-semibold">{penitipData.id}</span> ?
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
              Delete Penitip
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default DeletePenitipModal;
