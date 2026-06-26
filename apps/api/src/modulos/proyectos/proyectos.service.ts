import { Injectable, BadRequestException } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { ProyectoTesis } from './entidades/proyecto.entity';
  import { Asesoria } from '../asesorias/entidades/asesoria.entity';

  @Injectable()
  export class ProyectosService {
    constructor(
      @InjectRepository(ProyectoTesis) private proyectosRepo: Repository<ProyectoTesis>,
      @InjectRepository(Asesoria) private asesoriasRepo: Repository<Asesoria>,
    ) {}

    async cambiarEstado(proyectoId: string, nuevoEstado: string, usuarioId: string) {
      const proyecto = await this.proyectosRepo.findOne({ where: { id: proyectoId } });
      if (!proyecto) throw new BadRequestException('Proyecto no encontrado');

      const transicionesValidas: Record<string, string[]> = {
        'borrador': ['en_revision'],
        'en_revision': ['observado', 'aprobado'],
        'observado': ['en_revision'],
        'aprobado': ['conformidad_asesor'],
      };

      if (!transicionesValidas[proyecto.estado]?.includes(nuevoEstado)) {
        throw new BadRequestException(`Transición inválida de ${proyecto.estado} a ${nuevoEstado}`);
      }

      proyecto.estado = nuevoEstado;
      return this.proyectosRepo.save(proyecto);
    }

    async emitirConformidad(proyectoId: string, asesorId: string) {
      const proyecto = await this.proyectosRepo.findOne({ where: { id: proyectoId } });
      if (!proyecto) throw new BadRequestException('Proyecto no encontrado');
      if (proyecto.asesor_id !== asesorId) throw new BadRequestException('No es el asesor asignado');
      if (proyecto.estado !== 'aprobado') throw new BadRequestException('El proyecto debe estar aprobado primero');

      const countAsesorias = await this.asesoriasRepo.count({ where: { proyecto_id: proyectoId } });
      if (countAsesorias < 6) {
        throw new BadRequestException(`Se requieren mínimo 6 asesorías. Actual: ${countAsesorias}`);
      }

      return this.cambiarEstado(proyectoId, 'conformidad_asesor', asesorId);
    }
  }
