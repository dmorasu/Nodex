import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

export default function RegisterPage() {
  return (
    <>
        
        <h1 className='font-black text-6xl  text-gray-900 '>Iniciar Sesión</h1>
        <p className='text-3xl font-bold'>Control  de Gestión <span className='text-sky-400'>GPA</span></p> 
        <LoginForm />
    </>
  )
}
