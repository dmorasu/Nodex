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

export const inicioSesionSchema = z.object({
        correoUsuario: z.string()
                .min(1, {message: 'El correo es Obligatorio'})
                .email( {message: 'correo  no válido'}),
        contrasena: z.string()
                .min(1, {message: 'La contraseña no puede ir vacia'})
})

export const CrearSolicitudSchema = z.object({
        detalleSolicitud: z.string()
                .min(1, {message: 'El detalle de la solicitud no puede estar vacio'}),
       /* amount: z.coerce. --> Me sirve para convertir de string a int para validacion 
                number({message: 'Cantidad no válida'})*/
        direccionTramite: z.string()
                .min(1, {message: 'La direccion de Diligencia no puede estar vacia'}),
        municipiosId:z.string()
        .min(1,{message:'El municipio no puede estar vacio'}),
        clienteId:z.string()
        .min(1,{message:'El cliente no puede estar vacio'})
})




export const SuccessSchema =z.string()
export const ErrorResponoseSchema =z.object({
    error:z.string()
})

export const UserSchema = z.object({
        id: z.number(),
        nombreUsuario: z.string(),
        correoUsuario: z.string().email()
})

export const ClienteSchema = z.object({
        id:z.number(),
        nombreCliente:z.string()
})

export const MunicipioSchema = z.object({
        id:z.number(),
        nombreMunicipio:z.string()
})


export const SolicitudAPIRespuestaSchema = z.object({
        id:z.number(),
        detalleSolicitud: z.string(),
        direccionTramite: z.string(),
        createdAt:z.string(),
        updatedAt:z.string(),
        clientes:ClienteSchema.optional(),
        municipios:MunicipioSchema.optional()
        
        
        //userId: z.number(),
       
})
 .passthrough()
 export const SolicitudesPaginadasSchema = z.object({
  data: z.array(SolicitudAPIRespuestaSchema),
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});

export const SolicitudesAPIRespuestaSchema =z.array(SolicitudAPIRespuestaSchema)

export type Usuario =z.infer<typeof UserSchema>
export type SolicitudTramites=z.infer<typeof SolicitudAPIRespuestaSchema>
export type SolicitudType = z.infer<typeof SolicitudAPIRespuestaSchema>