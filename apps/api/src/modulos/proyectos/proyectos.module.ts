import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosService } from './proyectos.service';
import { ProyectoTesis } from './entidades/proyecto.entity';
import { Asesoria } from '../asesorias/entidades/asesoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoTesis, Asesoria])],
  providers: [ProyectosService],
  exports: [ProyectosService],
})
export class ProyectosModule {}
