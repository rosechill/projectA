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
import { DataAlamat } from "@/interfaces/AlamatInterface";
import { apiDeleteAlamat } from "@/service/api/apiAlamat";
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  AlamatData: DataAlamat | null;
}

const DeleteAlamatModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  title,
  AlamatData,
}) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    const AlamatDataHandler = AlamatData!;
    apiDeleteAlamat(AlamatDataHandler.id)
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
            {AlamatData && (
              <div className="flex flex-col gap-2 pt-2">
                <h2>
                  Apakah ada yakin akan menghapus Alamat
                  <span className="font-semibold"> {AlamatData.id}</span> ?
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
              Delete Alamat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default DeleteAlamatModal;
