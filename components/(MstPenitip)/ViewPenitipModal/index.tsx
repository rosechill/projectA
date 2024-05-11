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
import { DataPenitip } from "@/interfaces/PenitipInterface";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  penitipData: DataPenitip | null;
}

const ViewPenitipModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  title,
  penitipData,
}) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          {penitipData && (
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Id Penitip</p>
                <p>: </p>
                <p>{penitipData.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Bonus Poin</p>
                <p>: </p>
                <p>{penitipData.name}</p>
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

export default ViewPenitipModal;
