"use client"

export default function RegisterForm() {
  return (
    <div>
      <form
    className="mt-14 space-y-5"
    noValidate
>
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
            id="password_confirmation"
            type="password"
            placeholder="Repite Contraseña"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password_confirmation"
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
