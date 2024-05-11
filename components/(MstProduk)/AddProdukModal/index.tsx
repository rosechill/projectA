import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import PromoForm from '../AddProdukForm'
import ProdukForm from '../AddProdukForm'

interface AddProdukModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

const AddProdukModal: React.FC<AddProdukModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <ProdukForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddProdukModal
