import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import PembelianBahanBakuForm from '../AddPembelianBahanBakuForm'

interface AddPembelianBahanBakuModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

const AddPembelianBahanBakuModal: React.FC<AddPembelianBahanBakuModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <PembelianBahanBakuForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddPembelianBahanBakuModal
