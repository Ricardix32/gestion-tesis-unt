import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  correo_institucional: string;

  @Column({ type: 'text' })
  password_hash: string;

  @Column({ type: 'varchar', length: 255 })
  nombre_completo: string;

  @Column({ type: 'jsonb', default: ['estudiante'] })
  roles: string[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  orcid_id: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  creado_en: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  actualizado_en: Date;
}
