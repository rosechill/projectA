import UbahPasswordBiasa from '@/components/UbahPasswordBiasaForm'
import React from 'react'

export default function mo() {
  return (
    <section className='h-[80vh] flex flex-col justify-center'>
      <div className='flex flex-col gap-8 justify-center items-center text-center'>
        <h1 className="text-5xl font-bold text-center">Welcome to Dashboard</h1>
        <h1 className="text-3xl font-bold text-center">Change your password?</h1>
        <UbahPasswordBiasa/>
      </div>
    </section>
  )
}
