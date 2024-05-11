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
import { DataJabatan } from "@/interfaces/JabatanInterface";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  JabatanData: DataJabatan | null;
}

const ViewJabatanModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  title,
  JabatanData,
}) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          {JabatanData && (
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Id Jabatan</p>
                <p>: </p>
                <p>{JabatanData.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Jabatan</p>
                <p>: </p>
                <p>{JabatanData.name}</p>
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

export default ViewJabatanModal;
