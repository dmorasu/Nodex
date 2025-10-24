import React from 'react'
import Image from 'next/image'

export default function Logo() {
  return (
    <Image
  src="/logoblanconodex_.png"
  alt="Logo Nodex"
  width={150}
  height={400}
  className="h-auto w-36"  // agrega h-auto para mantener proporción
  priority
/>
  )
}
