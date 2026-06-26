import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('asesorias')
export class Asesoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  proyecto_id: string;

  @Column({ type: 'timestamp with time zone' })
  fecha_hora: Date;

  @Column({ type: 'text' })
  bitacora_notas: string;

  @Column({ type: 'boolean', default: false })
  conformidad_asesor: boolean;
}
