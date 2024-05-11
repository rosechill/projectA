import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody} from '@nextui-org/react'
import EditProdukForm from '../EditResepForm'
import { DataResep } from '@/interfaces/ResepInterface'

interface EditResepModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  resepData: DataResep | null
  dataProduk: any
  dataBahanBaku: any
}

const EditResepModal: React.FC<EditResepModalProps> = ({ isOpen, onClose, title, resepData, dataProduk, dataBahanBaku }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <EditProdukForm resepData={resepData} dataProduk={dataProduk} dataBahanBaku={dataBahanBaku} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditResepModal
