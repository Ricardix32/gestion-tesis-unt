import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformesService } from './informes.service';
import { InformeTesis } from './entidades/informe.entity';
import { VersionDocumento } from './entidades/version.entity';
import { ProyectosModule } from '../proyectos/proyectos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InformeTesis, VersionDocumento]),
    ProyectosModule,
  ],
  providers: [InformesService],
  exports: [InformesService],
})
export class InformesModule {}
