import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { VersionDocumento } from './version.entity';

@Entity('informes_tesis')
export class InformeTesis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  proyecto_id: string;

  @Column({ type: 'uuid' })
  estudiante_id: string;

  @Column({ type: 'varchar', length: 50, default: 'en_desarrollo' })
  estado: string;

  @OneToMany(() => VersionDocumento, (version) => version.informe)
  versiones: VersionDocumento[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  creado_en: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  actualizado_en: Date;
}
