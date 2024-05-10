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
import { DataPromo } from "@/interfaces/PromoInterface";
import { apiDeletePromo } from "@/service/api/apiPromo";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  promoData: DataPromo | null;
}

const DeletePromoModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  title,
  promoData,
}) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    const promoDataHandler = promoData!;
    apiDeletePromo(promoDataHandler.id)
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
      <ToastContainer />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
            {title}
          </ModalHeader>
          <ModalBody>
            {promoData && (
              <div className="flex flex-col gap-2 pt-2">
                <h2>
                  Apakah ada yakin akan menghapus promo dengan{" "}
                  <span className="font-semibold">{promoData.id}</span> ?
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
              Delete Promo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeletePromoModal;
