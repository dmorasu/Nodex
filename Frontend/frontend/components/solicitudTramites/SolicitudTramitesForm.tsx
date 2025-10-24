import { SolicitudTramites } from "@/src/schemas";
import ClientesComboBox from "../clientes/clientesCombobox";
import MunicipiosComboBox from "../municipios/municipiosCombobox";


export default function SolicitudTramitesForm({solicitud}:{solicitud?:SolicitudTramites}) {
  return (
    <div>
        <div className="space-y-3">
          <label htmlFor="name" className="text-sm uppercase font-bold">
              Detalle Solicitud
          </label>
          <textarea
              id="datelleSolicitud"
              className="w-full p-3  border border-gray-100 bg-slate-100" rows={5}
              
              placeholder="Detalle de la Solicitud"
              name="detalleSolicitud"
              defaultValue={solicitud?.detalleSolicitud}
         ></textarea>
      </div>
      <div className="space-y-3">
          <label htmlFor="direccionTramite" className="text-sm uppercase font-bold">
              Direccion Tramite
          </label>
          <input
              type="text"
              id="direccionTramite"
              className="w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
              placeholder="Direccion a realizar el trámite"
              name="direccionTramite"
              defaultValue={solicitud?.direccionTramite}
              
          />
      </div>
       <div className="space-y-3">

          <label htmlFor="municipioId" className="text-sm uppercase font-bold">
              Municipio
          </label>
         
            
                <MunicipiosComboBox name="municipioId" defaultValue={solicitud?.municipios?.nombreMunicipio}   />
         
          
      </div>
       <div className="space-y-3">
          <label htmlFor="clienteId" className="text-sm uppercase font-bold">
              Cliente
          </label>
          
          <ClientesComboBox name="clienteId" defaultValue={solicitud?.clientes?.nombreCliente} />
      </div>
      
    </div>
  )
}
