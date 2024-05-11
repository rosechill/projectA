import ProdukTable from '@/components/(MstProduk)/ProdukTable'
import { read } from '@/store/cookies'
import React from 'react'

export default function mstProduk() {
  const token = read("__TOKEN__")
  return (
    <div>
      <ProdukTable />
    </div>
  )
}
