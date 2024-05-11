
import React, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import { apiGetProdukTitipanPenitip } from '@/service/api/apiProdukTitipan'
import apiGetProduk from '@/service/api/apiProduk'
import ProdukTitipanForm from '../AddProdukTitipanForm'

interface AddProdukTitipanModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  dataPenitip : any
}

const AddProdukTitipanModal: React.FC<AddProdukTitipanModalProps> = ({ isOpen, onClose, title, dataPenitip }) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl' >
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">{title}</ModalHeader>
        <ModalBody>
            <ProdukTitipanForm dataPenitip={dataPenitip} onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddProdukTitipanModal

