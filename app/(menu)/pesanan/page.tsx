import { Maaf } from '@/assets/images';
import Image from 'next/image';
import React from 'react'

export const metadata = {
  title: "Pesanan",
};

export default function Pesanan() {
  return (
    <section className='px-24 flex flex-col gap-4 h-[70vh] justify-center items-center'>
      <Image src={Maaf} alt="maaf"/>
      <h1 className='text-xl text-[#B02525]'>Silahkan membuat pesanan terlebih dahulu ya</h1>
    </section>
  )
}
