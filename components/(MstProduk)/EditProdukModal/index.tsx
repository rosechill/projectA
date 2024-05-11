import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody} from '@nextui-org/react'
import { DataProduk } from '@/interfaces/ProdukInterface'
import EditProdukForm from '../EditProdukForm'

interface EditProdukModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  produkData: any |null
}

const EditProdukModal: React.FC<EditProdukModalProps> = ({ isOpen, onClose, title, produkData }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <EditProdukForm produkData={produkData} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditProdukModal
