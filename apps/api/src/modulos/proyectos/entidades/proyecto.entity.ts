import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('proyectos_tesis')
export class ProyectoTesis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  resumen: string;

  @Column({ type: 'uuid' })
  estudiante_id: string;

  @Column({ type: 'uuid', nullable: true })
  asesor_id: string;

  @Column({ type: 'varchar', length: 50, default: 'borrador' })
  estado: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  creado_en: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  actualizado_en: Date;
}
