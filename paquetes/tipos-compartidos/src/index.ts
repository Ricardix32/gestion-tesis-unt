export type UsuarioRole = 'admin' | 'coordinador' | 'estudiante' | 'asesor' | 'jurado';

export interface Usuario {
  id: string; // UUID
  correo_institucional: string;
  nombre_completo: string;
  roles: UsuarioRole[];
  orcid_id?: string;
  activo: boolean;
  creado_en: Date;
  actualizado_en: Date;
  creado_por?: string;
  actualizado_por?: string;
}

export type EstadoProyectoTesis = 'borrador' | 'revision' | 'observado' | 'aprobado';

export interface ProyectoTesis {
  id: string; // UUID
  titulo: string;
  resumen?: string;
  estudiante_id: string; // FK to Usuario
  asesor_id?: string; // FK to Usuario
  estado: EstadoProyectoTesis;
  creado_en: Date;
  actualizado_en: Date;
}

export interface VersionesDocumento {
  id: string; // UUID
  documento_id: string; // UUID
  version_label: string; // e.g. "v1.0"
  url_almacenamiento: string;
  porcentaje_similitud: number;
  subido_por: string; // FK to Usuario
  creado_en: Date;
}

export interface Asesoria {
  id: string; // UUID
  proyecto_id: string; // FK to ProyectoTesis
  fecha_hora: Date;
  bitacora_notes: string;
  conformidad_asesor: boolean;
}

export interface Sustentacion {
  id: string; // UUID
  informe_id: string; // UUID
  fecha_programada: Date;
  lugar_o_link: string;
  nota_final?: number;
  estado_acta: 'Pendiente' | 'Aprobada';
}
