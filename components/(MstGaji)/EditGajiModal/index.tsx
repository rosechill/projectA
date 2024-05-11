
import React, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import { apiGetProdukTitipanPenitip } from '@/service/api/apiProdukTitipan'
import apiGetProduk from '@/service/api/apiProduk'
import ProdukTitipanForm from '../EditGajiForm'
import EditGajiForm from '../EditGajiForm'

interface EditGajiModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  gajiData : any
  jabatanData: any
}

const EditGajiModal: React.FC<EditGajiModalProps> = ({ isOpen, onClose, title, gajiData, jabatanData }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl' >
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
          <EditGajiForm onClose={onClose}  gajiData={gajiData} jabatanData={jabatanData}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditGajiModal

