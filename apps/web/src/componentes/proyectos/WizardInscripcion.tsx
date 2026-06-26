'use client';
import * as React from 'react';
import { useState } from 'react';
import { FormularioDatosBasicos } from './FormularioDatosBasicos';
import { SeleccionAsesor } from './SeleccionAsesor';
import { ResumenConfirmacion } from './ResumenConfirmacion';

export const WizardInscripcion = () => {
  const [paso, setPaso] = useState(1);
  const [datosProyecto, setDatosProyecto] = useState({
    titulo: '',
    lineaInvestigacion: '',
    asesorId: null as string | null,
  });

  const avanzar = (datos: any) => {
    setDatosProyecto({ ...datosProyecto, ...datos });
    setPaso(paso + 1);
  };

  const enviarProyecto = async () => {
    // Llamada a la API POST /proyectos
    console.log('Enviando proyecto:', datosProyecto);
  };

  return (
    <div className="contenedor-wizard p-6 bg-white rounded-lg shadow">
      <div className="indicador-pasos mb-4 flex gap-2">
        <span className={paso >= 1 ? 'font-bold text-blue-600' : 'text-gray-400'}>1. Datos</span> {'>'}
        <span className={paso >= 2 ? 'font-bold text-blue-600' : 'text-gray-400'}>2. Asesor</span> {'>'}
        <span className={paso >= 3 ? 'font-bold text-blue-600' : 'text-gray-400'}>3. Resumen</span>
      </div>

      {paso === 1 && <FormularioDatosBasicos onSubmit={avanzar} />}
      {paso === 2 && <SeleccionAsesor onSubmit={avanzar} />}
      {paso === 3 && <ResumenConfirmacion datos={datosProyecto} onConfirm={enviarProyecto} onBack={() => setPaso(2)} />}
    </div>
  );
};
