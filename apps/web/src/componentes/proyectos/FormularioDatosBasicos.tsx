'use client';
import * as React from 'react';
import { useState } from 'react';

interface FormularioDatosBasicosProps {
  onSubmit: (datos: { titulo: string; lineaInvestigacion: string }) => void;
}

export const FormularioDatosBasicos = ({ onSubmit }: FormularioDatosBasicosProps) => {
  const [titulo, setTitulo] = useState('');
  const [lineaInvestigacion, setLineaInvestigacion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ titulo, lineaInvestigacion });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700">Título del Proyecto</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700">Línea de Investigación</label>
        <input
          type="text"
          value={lineaInvestigacion}
          onChange={(e) => setLineaInvestigacion(e.target.value)}
          required
          className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Siguiente
      </button>
    </form>
  );
};
