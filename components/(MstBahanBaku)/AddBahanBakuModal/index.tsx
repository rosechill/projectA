import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import BahanBakuForm from '../AddBahanBakuForm'

interface AddBahanBakuModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

const AddBahanBakuModal: React.FC<AddBahanBakuModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <BahanBakuForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddBahanBakuModal
