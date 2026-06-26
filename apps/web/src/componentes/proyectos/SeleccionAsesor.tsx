'use client';
import * as React from 'react';
import { useState } from 'react';

interface SeleccionAsesorProps {
  onSubmit: (datos: { asesorId: string }) => void;
}

export const SeleccionAsesor = ({ onSubmit }: SeleccionAsesorProps) => {
  const [asesorId, setAsesorId] = useState('asesor-uuid-1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ asesorId });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700">Seleccionar Asesor Asignado</label>
        <select
          value={asesorId}
          onChange={(e) => setAsesorId(e.target.value)}
          className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="asesor-uuid-1">Dr. Roberto Cerna (Ingeniería de Software)</option>
          <option value="asesor-uuid-2">Dra. María Cruz (Ciencia de la Computación)</option>
          <option value="asesor-uuid-3">Mag. Carlos Rojas (Sistemas de Información)</option>
        </select>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Siguiente
      </button>
    </form>
  );
};
