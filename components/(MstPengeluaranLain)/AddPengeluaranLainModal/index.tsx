import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import PengeluaranLainForm from '../AddPengeluaranLainForm'

interface AddPengeluaranLainModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

const AddPengeluaranLainModal: React.FC<AddPengeluaranLainModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <PengeluaranLainForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddPengeluaranLainModal
