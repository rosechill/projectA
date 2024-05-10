import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody} from '@nextui-org/react'
import { DataPromo } from '@/interfaces/PromoInterface'
import EditPromoForm from '../EditPromoForm'

interface EditPromoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  promoData: DataPromo |null
}

const EditPromoModal: React.FC<EditPromoModalProps> = ({ isOpen, onClose, title, promoData }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <EditPromoForm promoData={promoData} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditPromoModal
