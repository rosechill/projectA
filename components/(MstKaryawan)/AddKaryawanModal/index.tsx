import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import KaryawanForm from '../AddKaryawanForm'

interface AddKaryawanModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

const AddKaryawanModal: React.FC<AddKaryawanModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <KaryawanForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddKaryawanModal
