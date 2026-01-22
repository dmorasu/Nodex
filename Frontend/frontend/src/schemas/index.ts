import { array, z, ZodString } from 'zod'

export const RegistroSchema = z.object({
        correoUsuario: z.string().
                min(1, { message: 'El correo es obligatorio' })
                .email({ message: 'email no valido' }),
        nombreUsuario: z.string()
                .min(1, { message: 'El nombre no puede estar vacio' }),
        contrasena: z.string()
                .min(8, { message: 'La contraseña debe tener minimo 8 Caracteres' }),
        confirmacion_contrasena: z.string()


}).refine((data) => data.contrasena === data.confirmacion_contrasena, {
        message: 'Las contraseña no coincide',
        path: ['confirmacion_contrasena']


})

export const inicioSesionSchema = z.object({
        correoUsuario: z.string()
                .min(1, { message: 'El correo es Obligatorio' })
                .email({ message: 'correo  no válido' }),
        contrasena: z.string()
                .min(1, { message: 'La contraseña no puede ir vacia' })
})

export const CrearSolicitudSchema = z.object({
        detalleSolicitud: z.string()
                .min(1, { message: 'El detalle de la solicitud no puede estar vacio' }),
        /* amount: z.coerce. --> Me sirve para convertir de string a int para validacion 
                 number({message: 'Cantidad no válida'})*/
        direccionTramite: z.string()
                .min(1, { message: 'La direccion de Diligencia no puede estar vacia' }),
        municipiosId: z.string()
                .min(1, { message: 'El municipio no puede estar vacio' }),
        clienteId: z.string()
                .min(1, { message: 'El cliente no puede estar vacio' }),
        operacionesId: z.string()
                .min(1, { message: 'Debe Seleccionar la Operacion' }),
        fechaEntregaResultado: z.string()
                .min(1, "Debe seleccionar la fecha de entrega")
                .transform((value) => new Date(value)),
        tramiteId: z.string()
                .min(1, { message: 'El trámite no puede estar vacio.' }),
        placa: z.string().optional().nullable(),
        matriculaInmobiliaria: z.string().optional().nullable(),
        entidadId:z.string()
                  .min(1, { message: 'La Entidad no puede estar vacio' }),
        documentosAportados:z.string()
                  .min(1, { message: 'DocumentosAportados no puede estar vacio' }),
        usuarioId:z.string()
                  .min(1, { message: 'El Usuario no puede estar vacio' }),
        
        
       



})
export const EditarSolicitudSchema = z.object({
        detalleSolicitud: z.string()
                .min(1, { message: 'El detalle de la solicitud no puede estar vacio' }),
        /* amount: z.coerce. --> Me sirve para convertir de string a int para validacion 
                 number({message: 'Cantidad no válida'})*/
        direccionTramite: z.string()
                .min(1, { message: 'La direccion de Diligencia no puede estar vacia' }),
        municipiosId: z.string()
                .min(1, { message: 'El municipio no puede estar vacio' }),
        clienteId: z.string()
                .min(1, { message: 'El cliente no puede estar vacio' }),
        operacionesId: z.string()
                .min(1, { message: 'Debe Seleccionar la Operacion' }),
        fechaEntregaResultado: z.string()
                .min(1, "Debe seleccionar la fecha de entrega")
                .transform((value) => new Date(value)),
        tramiteId: z.string()
                .min(1, { message: 'El trámite no puede estar vacio.' }),
        placa: z.string().optional().nullable(),
        matriculaInmobiliaria: z.string().optional().nullable(),
        entidadId:z.string()
                  .min(1, { message: 'La Entidad no puede estar vacio' }),
        documentosAportados:z.string()
                  .min(1, { message: 'DocumentosAportados no puede estar vacio' }),
    
        
        
       



})

export const CrearClienteSchema = z.object({
        nombreCliente: z.string()
                .min(1, { message: 'El nombre del Cliente no puede estar vacio' }),
        identificacionCliente: z.string()
                .min(1, { message: 'La identificacion del Cliente no puede estar vacia' }),
        telefono: z.string()
                .min(1, { message: 'El telefono no puede estar vacio' }),
        telefonoMovil: z.string()
                .min(1, { message: 'El telefonoMovi no puede estar vacio' }),

})

export const ContrasenaValidacionSchema = z.string().min(1, { message: 'Ingrese una contraseña' })


export const SuccessSchema = z.string()
export const ErrorResponoseSchema = z.object({
        error: z.string()
})

export const UserSchema = z.object({
        id: z.number(),
        nombreUsuario: z.string(),
        correoUsuario: z.string().email()
})

export const ClienteSchema = z.object({
        id: z.number(),
        nombreCliente: z.string()
})

export const MunicipioSchema = z.object({
        id: z.number(),
        nombreMunicipio: z.string()
})


export const EstadosSchema = z.object({
        id: z.number(),
        nombreEstado: z.string()
})

export const estadosTramites = z.object({
        id: z.number(),
        estado: z.object({
                nombreEstado: z.string()
        })




})

export const Trazabilidad = z.object({
        id: z.number(),
        observacionTrazabilidad: z.string(),
        nombreUsuario: z.string(),
        createdAt: z.string()


})

export const Programacion = z.object({
        id: z.number(),
        fechaProbableEntrega: z.string().nullable().optional(),
        fechaFinalizacionServicio: z.string().nullable().optional(),
        fechaRealizacionDiligencia: z.string().nullable().optional(),
        valorTramite: z.string().nullable().optional(),
        valorViaticos: z.string().nullable().optional()


})

export const logistica = z.object({
        id: z.number(),
        numeroGuia: z.string().nullable().optional(),
        valorEnvio: z.string().nullable().optional(),
        horaProgramada: z.string().nullable().optional(),
        fechaProgramacionLogistica: z.string().nullable().optional(),
        fechaEntregaTransportadora: z.string().nullable().optional()


})

export const  cuentaCobro =z.object({
        solicitudTramiteId: z.number(),

        fechaRadicacionCuentaCobro: z.string(),
        fechaMaximaPagoCuentaCobro: z.string(),

        fechaRecibidaCuentaCobroTramitador: z.string().nullable().optional(),
        fechaPagoCuentaCobro: z.string().nullable().optional(),
        numeroCuentaCobro: z.string().nullable().optional(),
        valorCuentaCobro: z.coerce.number().nullable().optional()

})

export const Entidad =z.object({
        id: z.number(),
        nombreEntidad:z.string()

})

export const operaciones =z.object({
        id:z.number(),
        nombreOperacion:z.string(),
        centroDeCostos:z.string()
})

export const Tramites =z.object({
        id:z.number(),
        nombreTramite:z.string(),
       
})

export const TrazabilidadSchema = z.object({
        observacionTrazabilidad: z.string()
                .min(1, { message: "Debe registar alguna observacion" }),

})

export const CuentaCobroSchema = z.object({
        solicitudTramitesId: z.number(),

        fechaRadicacionCuentaCobro: z.string(),
        fechaMaximaPagoCuentaCobro: z.string(),

        fechaRecibidaCuentaCobroTramitador: z.string().nullable().optional(),
        fechaPagoCuentaCobro: z.string().nullable().optional(),
        numeroCuentaCobro: z.string().nullable().optional(),
        valorCuentaCobro: z.coerce.number().nullable().optional()
})
const emptyToNull = (val: unknown) => (val === "" ? null : val);
export const logisticaSchema = z.object({
        numeroGuia: z.preprocess(emptyToNull, z.string().nullable().optional()),
        valorEnvio: z.preprocess(emptyToNull, z.coerce.number().nullable().optional()),
        horaProgramda: z.preprocess(emptyToNull, z.string().nullable().optional()),
        fechaProgramacionLogistica: z.preprocess(emptyToNull, z.string().nullable().optional()),
        fechaEntregaTransportadora: z.preprocess(emptyToNull, z.string().nullable().optional()),


})


export const ProgramacionSchema = z.object({

        fechaProbableEntrega: z.string()
                .min(1, "Debe seleccionar la fecha de Entrega"),

})

export const OperacionSchema = z.object({
  id: z.number(),
  nombreOperacion: z.string(),
  centroDeCostos:z.string()
});
export const OperacionesSchema = z.array(OperacionSchema);

export const TramiteSchema= z.object({
        id:z.number(),
        nombreTramite:z.string()
});

export const TramitesSchema =z.array(TramiteSchema);

export const EntidadSchema = z.object({
  id: z.number(),
  nombreEntidad: z.string()
});
export const EntidadesSchema = z.array(EntidadSchema);




export const UsuarioSchema = z.object({
        id: z.number(),
        nombreUsuario: z.string(),
        correoUsuario: z.string()
})

export const SolicitudAPIRespuestaSchema = z.object({
        id: z.number(),
        detalleSolicitud: z.string(),
        direccionTramite: z.string(),
        fechaEntregaResultado: z.string().nullable(),
        matriculaInmobiliaria: z.string().nullable(),
        placa: z.string().nullable(),
        createdAt: z.string(),
        updatedAt: z.string(),
        clientes: ClienteSchema.optional(),
        usuario: UsuarioSchema.optional().nullable(),
        municipios: MunicipioSchema.optional(),
        estadosTramites: z.array(estadosTramites).optional(),
        trazabilidad: array(Trazabilidad).optional(),
        programacion: Programacion.optional().nullable(),
        logistica: logistica.optional().nullable(),
        cuentaCobro:cuentaCobro.optional().nullable(),
        operaciones:operaciones.optional().nullable(),
        entidad:Entidad.optional().nullable(),
        tramite:Tramites.optional().nullable()



        //userId: z.number(),

})
        .passthrough()
export const SolicitudesPaginadasSchema = z.object({
        data: z.array(SolicitudAPIRespuestaSchema),
        total: z.number(),
        totalPages: z.number(),
        currentPage: z.number(),
}).passthrough();

export const EstadoTramitesSchema = z.object({
        estadoId: z.coerce.number().
                min(1, { message: "Debe selecionar un Estado" }),


}

)

export const SolicitudesAPIRespuestaSchema = z.array(SolicitudAPIRespuestaSchema)

export type Usuario = z.infer<typeof UserSchema>
export type SolicitudTramites = z.infer<typeof SolicitudAPIRespuestaSchema>
export type SolicitudType = z.infer<typeof SolicitudAPIRespuestaSchema> 