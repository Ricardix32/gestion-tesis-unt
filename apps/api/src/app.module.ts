import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modulos/auth/auth.module';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { ProyectosModule } from './modulos/proyectos/proyectos.module';
import { DocumentosModule } from './modulos/documentos/documentos.module';

import { Usuario } from './modulos/usuarios/entidades/usuario.entity';
import { ProyectoTesis } from './modulos/proyectos/entidades/proyecto.entity';
import { Asesoria } from './modulos/asesorias/entidades/asesoria.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'gestion_tesis_db',
      entities: [Usuario, ProyectoTesis, Asesoria],
      synchronize: true,
    }),
    AuthModule,
    UsuariosModule,
    ProyectosModule,
    DocumentosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
