import ProdukTitipanTable from '@/components/(MstProdukTitipan)/ProdukTitipanTable'
import { read } from '@/store/cookies'
import React from 'react'

export default function mstProdukTitipan() {
  const token = read("__TOKEN__")
  return (
    <div>
      <ProdukTitipanTable />
    </div>
  )
}
