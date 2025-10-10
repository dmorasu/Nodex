import {z} from 'zod'

export const RegistroSchema =z.object({
    correoUsuario: z.string().
    min(1,{message:'El correo es obligatorio'})
    .email({message:'email no valido'}),
    nombreUsuario:z.string()
        .min(1,{message:'El nombre no puede estar vacio'}),
    contrasena:z.string()
        .min(8,{message:'La contraseña debe tener minimo 8 Caracteres'}),
    confirmacion_contrasena:z.string()
    

}).refine((data)=>data.contrasena===data.confirmacion_contrasena,{
    message:'Las contraseña no coincide',
    path:['confirmacion_contrasena']


})

export const SuccessSchema =z.string().min(1,{message:'Valor no valido'})