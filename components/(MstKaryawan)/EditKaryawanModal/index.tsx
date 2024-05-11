import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody} from '@nextui-org/react'
import EditKaryawanForm from '../EditKaryawanForm'
import { DataKaryawan } from '@/interfaces/KaryawanInterface'

interface EditKaryawanModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  karyawanData: DataKaryawan |null
}

const EditKaryawanModal: React.FC<EditKaryawanModalProps> = ({ isOpen, onClose, title, karyawanData }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <EditKaryawanForm karyawanData={karyawanData} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditKaryawanModal
