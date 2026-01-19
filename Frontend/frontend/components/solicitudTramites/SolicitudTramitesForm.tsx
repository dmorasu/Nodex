"use client";

import { useState } from "react";
import { SolicitudTramites } from "@/src/schemas";
import ClientesComboBox from "../clientes/clientesCombobox";
import MunicipiosComboBox from "../municipios/municipiosCombobox";
import OperacionesComboBox from "../operaciones/operacionesCombobox";
import { verificacionSesion } from "@/src/auth/dal";


export default function SolicitudTramitesForm({ solicitud }: { solicitud?: SolicitudTramites }) {

  const [tipoDocumento, setTipoDocumento] = useState("");

  return (
    <div>

      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Detalle Solicitud
        </label>
        <textarea
          id="detalleSolicitud"
          className="w-full p-3 border border-gray-100 bg-slate-100"
          rows={5}
          placeholder="Detalle de la Solicitud"
          name="detalleSolicitud"
          defaultValue={solicitud?.detalleSolicitud}
        />
      </div>

      <div className="space-y-3 mt-4">
        <label htmlFor="direccionTramite" className="text-sm uppercase font-bold">
          Dirección Trámite
        </label>
        <input
          type="text"
          id="direccionTramite"
          className="w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
          placeholder="Dirección a realizar el trámite"
          name="direccionTramite"
          defaultValue={solicitud?.direccionTramite}
        />
      </div>

      <div className="space-y-3 mt-4">
        <label htmlFor="municipioId" className="text-sm uppercase font-bold">
          Municipio
        </label>
        <MunicipiosComboBox
          name="municipioId"
          defaultValue={solicitud?.municipios?.id}
        />
      </div>

      <div className="space-y-3 mt-4">
        <label htmlFor="clienteId" className="text-sm uppercase font-bold">
          Cliente
        </label>
        <ClientesComboBox
          name="clienteId"
          defaultValue={solicitud?.clientes?.id}
        />
      </div>

      <div className="space-y-3 mt-4">
        <label htmlFor="fechaEntregaResultado" className="text-sm uppercase font-bold">
          Fecha de Entrega de Resultado
        </label>
        <input
          type="date"
          id="fechaEntregaResultado"
          className="w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
          name="fechaEntregaResultado"
          
        />
      </div>

      <div className="space-y-3 mt-4">
        <label htmlFor="operacionId" className="text-sm uppercase font-bold">
          Operación
        </label>
        <OperacionesComboBox
          name="operacionId"
          defaultValue={solicitud?.clientes?.nombreCliente}
        />
      </div>

      <div className="space-y-3 mt-4">
        <label htmlFor="tipoServicio" className="text-sm uppercase font-bold">
          Trámite
        </label>
        <select
          id="tipoServicio"
          name="tipoServicio"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        >
          <option value="" disabled>Tipo de Trámite:</option>
          <option value="Liquidación Impuesto Predial">Liquidación Impuesto Predial</option>
          <option value="Liquidación Valorización">Liquidación Valorización</option>
          <option value="Liquidación Predial y Valorización">Liquidación Predial y Valorización</option>
          <option value="Pago de Impuestos">Pago de Impuestos</option>
          <option value="Solicitud paz y salvo">Solicitud paz y salvo</option>
          <option value="Radicación Mutación Catastral">Radicación Mutación Catastral</option>
          <option value="Seguimiento a Mutación Catastra">Seguimiento a Mutación Catastral</option>
          <option value="Pago de mutación catastral">Pago de mutación catastral</option>
          <option value="Consecución escritura">Consecución escritura</option>
          <option value="Firma de escritura">Firma de escritura</option>
          <option value="Recuperación escritura">Recuperación escritura</option>
          <option value="Radicación en notaría">Radicación en notaría</option>
        </select>
      </div>

      {/* 🔹 NUEVO CAMPO: Selección de PLACA o MATRÍCULA + Input dinámico */}
      <div className="space-y-3 mt-4">
        <label className="text-sm uppercase font-bold">Identificación del Inmueble</label>
        <select
          name="tipoDocumento"
          value={tipoDocumento}
          onChange={(e) => setTipoDocumento(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        >
          <option value="">Seleccione una opción</option>
          <option value="placa">Placa</option>
          <option value="matricula">Matrícula inmobiliaria</option>
        </select>

        {tipoDocumento === "placa" && (
          <div>
            <label className="text-sm uppercase font-bold">Placa</label>
            <input
              type="text"
              id='placa'
              name="placa"
              placeholder="Ingrese la placa"
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {tipoDocumento === "matricula" && (
          <div>
            <label className="text-sm uppercase font-bold">Matrícula inmobiliaria</label>
            <input
              id='matricula'
              type="text"
              name="matricula"
              placeholder="Ingrese la matrícula inmobiliaria"
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}
      </div>
        <div className="space-y-3 mt-4">
        <label htmlFor="centroCostos" className="text-sm uppercase font-bold">
          Centro de Costos
        </label>
        <input
          type="text"
          id="centroCostos"
          className="w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
          placeholder="centro de costos unidad de negocios"
          name="centroCostos"
          defaultValue={solicitud?.direccionTramite}
        />
      </div>
      
        

    </div>
  );
}
