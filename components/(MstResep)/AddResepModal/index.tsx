import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import ResepForm from '../AddResepForm'

interface AddResepModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  dataProduk: any
  dataBahanBaku: any
}

const AddResepModal: React.FC<AddResepModalProps> = ({ isOpen, onClose, title, dataBahanBaku, dataProduk }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <ResepForm dataBahanBaku={dataBahanBaku} dataProduk={dataProduk} onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddResepModal
