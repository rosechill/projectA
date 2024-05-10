'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import { DataKaryawan } from '@/interfaces/KaryawanInterface'

interface ViewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  karyawanData: DataKaryawan | null
}

const ViewKaryawanModal: React.FC<ViewModalProps> = ({ isOpen, onClose, title, karyawanData }) => {
  if (!isOpen) return null
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          {karyawanData && (
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Id Karyawan</p>
                <p>: </p>
                <p>{karyawanData.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Jabatan</p>
                <p>: </p>
                <p>{karyawanData.jabatan.name}</p>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button className="border-1 border-[#0370C3] bg-primary min-w-[100px]" variant="flat" size="md" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ViewKaryawanModal
