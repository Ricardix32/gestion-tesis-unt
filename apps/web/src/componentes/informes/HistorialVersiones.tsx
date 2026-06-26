'use client';
import * as React from 'react';
import { useState } from 'react';
import { FiUploadCloud, FiFileText, FiAlertCircle } from 'react-icons/fi';
import api from '@/api/cliente';

interface HistorialVersionesProps {
  informeId: string;
  versionesActuales: Array<{
    id: string;
    version_label: string;
    porcentaje_similitud: number;
    url_almacenamiento: string;
  }>;
}

export const HistorialVersiones = ({ informeId, versionesActuales }: HistorialVersionesProps) => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);

  const manejarSubida = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo) return;

    setSubiendo(true);
    const formData = new FormData();
    formData.append('documento', archivo);

    try {
      await api.post(`/informes/${informeId}/versiones`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      window.location.reload();
    } catch (error) {
      alert('Error al subir la versión o límite excedido.');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Historial de Revisiones</h3>
      
      <div className="lista-versiones mb-6 space-y-3">
        {versionesActuales.map((v: any) => (
          <div key={v.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div className="flex items-center gap-2">
              <FiFileText className="text-blue-600" />
              <span className="font-semibold">{v.version_label}</span>
              <span className="text-sm text-gray-500">
                (Similitud: <span className={v.porcentaje_similitud > 15 ? 'text-red-500 font-bold' : 'text-green-500'}>
                  {v.porcentaje_similitud}%
                </span>)
              </span>
            </div>
            <a href={v.url_almacenamiento} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
              Descargar PDF
            </a>
          </div>
        ))}
      </div>

      {versionesActuales.length < 3 ? (
        <form onSubmit={manejarSubida} className="borde-punteado p-4 border-2 border-dashed border-gray-300 rounded text-center">
          <input 
            type="file" 
            accept="application/pdf" 
            onChange={(e) => setArchivo(e.target.files?.[0] || null)}
            className="mb-2"
          />
          <button 
            type="submit" 
            disabled={!archivo || subiendo}
            className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2 disabled:bg-gray-400 cursor-pointer"
          >
            <FiUploadCloud /> {subiendo ? 'Subiendo...' : 'Subir Nueva Versión'}
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-2 text-red-600 p-3 bg-red-50 rounded">
          <FiAlertCircle /> Límite de 3 revisiones alcanzado.
        </div>
      )}
    </div>
  );
};
