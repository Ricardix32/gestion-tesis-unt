'use client';
import * as React from 'react';

interface ResumenConfirmacionProps {
  datos: {
    titulo: string;
    lineaInvestigacion: string;
    asesorId: string | null;
  };
  onConfirm: () => void;
  onBack: () => void;
}

export const ResumenConfirmacion = ({ datos, onConfirm, onBack }: ResumenConfirmacionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800">Resumen y Confirmación</h3>
      <div className="bg-gray-50 p-4 rounded border border-gray-200">
        <p className="mb-2 text-sm text-gray-600"><strong>Título del Proyecto:</strong> {datos.titulo}</p>
        <p className="mb-2 text-sm text-gray-600"><strong>Línea de Investigación:</strong> {datos.lineaInvestigacion}</p>
        <p className="text-sm text-gray-600"><strong>ID Asesor Asignado:</strong> {datos.asesorId}</p>
      </div>
      <div className="flex gap-2 justify-between mt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Enviar Proyecto
        </button>
      </div>
    </div>
  );
};
