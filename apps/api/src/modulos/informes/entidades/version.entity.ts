import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InformeTesis } from './informe.entity';

@Entity('versiones_documento')
export class VersionDocumento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  informe_id: string;

  @Column({ type: 'varchar', length: 20 })
  version_label: string;

  @Column({ type: 'text' })
  url_almacenamiento: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  porcentaje_similitud: number;

  @Column({ type: 'uuid' })
  subido_por: string;

  @ManyToOne(() => InformeTesis, (informe) => informe.versiones)
  @JoinColumn({ name: 'informe_id' })
  informe: InformeTesis;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  creado_en: Date;
}
