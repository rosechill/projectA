import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody} from '@nextui-org/react'
import { DataPenitip } from '@/interfaces/PenitipInterface'
import EditPenitipForm from '../EditPenitipForm'

interface EditPenitipModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  penitipData: DataPenitip |null
}

const EditPenitipModal: React.FC<EditPenitipModalProps> = ({ isOpen, onClose, title, penitipData }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <EditPenitipForm penitipData={penitipData} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditPenitipModal
