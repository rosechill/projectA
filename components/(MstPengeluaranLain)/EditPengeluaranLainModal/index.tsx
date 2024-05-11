import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody} from '@nextui-org/react'
import EditPengeluaranLainForm from '../EditPengeluaranLainForm'
import { DataPengeluaranLain } from '@/interfaces/PengeluaranLainInterface'

interface EditPengeluaranLainModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  pengeluaranLainData: DataPengeluaranLain |null
}

const EditPengeluaranLainModal: React.FC<EditPengeluaranLainModalProps> = ({ isOpen, onClose, title, pengeluaranLainData }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <EditPengeluaranLainForm pengeluaranLainData={pengeluaranLainData} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditPengeluaranLainModal
