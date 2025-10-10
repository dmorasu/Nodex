"use client"

import { registrarUsuario } from "@/actions/crear-cuenta"
import { useActionState } from "react"

import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage"
import SuccessMessage from "../ui/SuccessMessage"

export default function RegisterForm() {
  const [state,dispatch]=useFormState(registrarUsuario,{
    errors:[],
    success:''
  })
  
  return (
    <div>
      <form
    className="mt-14 space-y-5"
    noValidate
    action={dispatch}

>   {state.errors.map(error=><ErrorMessage>{error}</ErrorMessage>)}

    {state.success && <SuccessMessage>{state.success}</SuccessMessage>}
    <div className="flex flex-col gap-2">
        <label
            className="font-bold text-2xl"
            htmlFor="correo"
        >Correo</label>
        <input
            id="correoUsuario"
            type="email"
            placeholder="Correo Electronico"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="correoUsuario"
        />
    </div>

    <div className="flex flex-col gap-2">
        <label
            className="font-bold text-2xl"
        >Nombre</label>
        <input
            type="name"
            placeholder="Nombre de Usuario"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="nombreUsuario"
        />
    </div>

    <div className="flex flex-col gap-2">
        <label
            className="font-bold text-2xl"
        >Contraseña</label>
        <input
            type="password"
            placeholder="Contraseña"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="contrasena"
        />
    </div>

    <div className="flex flex-col gap-2">
        <label
            className="font-bold text-2xl"
        >Repetir Contraseña</label>
        <input
            id="confirmacion_contrasena"
            type="password"
            placeholder="Repite Contraseña"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="confirmacion_contrasena"
        />
    </div>

    <input
        type="submit"
        value='Registrarme'
        className="bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
    />
</form>
    </div>
  )
}
