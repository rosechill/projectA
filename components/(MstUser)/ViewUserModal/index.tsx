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
import { DataUser } from "@/interfaces/UserInterface";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  UserData: DataUser | null;
}

const ViewUserModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  title,
  UserData,
}) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          {UserData && (
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Id User</p>
                <p>: </p>
                <p>{UserData.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">User</p>
                <p>: </p>
                <p>{UserData.name}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Email</p>
                <p>: </p>
                <p>{UserData.email}</p>
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

export default ViewUserModal;
