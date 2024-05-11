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
import { DataBahanBaku } from "@/interfaces/BahanBakuInterface";
import { apiDeleteBahanBaku } from "@/service/api/apiBahanBaku";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  bahanBakuData: DataBahanBaku | null;
}

const DeleteBahanBakuModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  title,
  bahanBakuData,
}) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    const bahanBakuHandler = bahanBakuData!;
    apiDeleteBahanBaku(bahanBakuHandler.id)
      .then(() => {
        toast("Delete success")
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error:any) => {
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
            {bahanBakuData && (
              <div className="flex flex-col gap-2 pt-2">
                <h2>
                  Apakah ada yakin akan menghapus bahan baku dengan nama {" "}
                  <span className="font-semibold">{bahanBakuData.name}</span> ?
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
              Delete Bahan Baku
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default DeleteBahanBakuModal;
