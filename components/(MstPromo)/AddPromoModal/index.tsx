import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import PromoForm from '../AddPromoForm'

interface AddPromoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

const AddPromoModal: React.FC<AddPromoModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <PromoForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddPromoModal
