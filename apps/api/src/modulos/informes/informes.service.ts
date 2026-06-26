import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InformeTesis } from './entidades/informe.entity';
import { VersionDocumento } from './entidades/version.entity';
import { ProyectosService } from '../proyectos/proyectos.service';

@Injectable()
export class InformesService {
  constructor(
    @InjectRepository(InformeTesis) private informesRepo: Repository<InformeTesis>,
    @InjectRepository(VersionDocumento) private versionesRepo: Repository<VersionDocumento>,
    private proyectosService: ProyectosService,
  ) {}

  async iniciarInforme(proyectoId: string, estudianteId: string) {
    const proyecto = await this.proyectosService.obtenerPorId(proyectoId);
    
    if (proyecto.estado !== 'conformidad_asesor') {
      throw new BadRequestException('El proyecto requiere conformidad del asesor para iniciar el informe');
    }

    const nuevoInforme = this.informesRepo.create({
      proyecto_id: proyectoId,
      estudiante_id: estudianteId,
      estado: 'en_desarrollo'
    });
    return this.informesRepo.save(nuevoInforme);
  }

  async agregarNuevaVersion(informeId: string, urlDocumento: string, usuarioId: string) {
    const versionesPrevias = await this.versionesRepo.count({ where: { informe_id: informeId } });
    
    // Regla de Negocio: Máximo 3 revisiones
    if (versionesPrevias >= 3) {
      throw new BadRequestException('Se ha alcanzado el límite máximo de 3 revisiones permitidas');
    }

    const nuevaVersion = this.versionesRepo.create({
      informe_id: informeId,
      version_label: `v${versionesPrevias + 1}.0`,
      url_almacenamiento: urlDocumento,
      subido_por: usuarioId,
      porcentaje_similitud: await this.simularVerificacionPlagio() 
    });

    return this.versionesRepo.save(nuevaVersion);
  }

  private async simularVerificacionPlagio(): Promise<number> {
    // Mock de integración con endpoint de Turnitin
    return Math.floor(Math.random() * 30); // Devuelve entre 0% y 29%
  }
}
