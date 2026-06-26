import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UsuariosService {
  // In-memory array pre-populated with seed data matching the SQL script
  private readonly usuarios: any[] = [
    {
      id: 'd9b736b4-6a84-4861-bf96-5be8848d56b0',
      correo_institucional: 'admin@unitru.edu.pe',
      password_hash: '$2b$10$ExampleHash',
      nombre_completo: 'Administrador Central UNT',
      roles: ['admin', 'coordinador'],
      activo: true,
      creado_en: new Date(),
      actualizado_en: new Date(),
    },
  ];

  async buscarPorCorreo(correo: string): Promise<any | null> {
    const usuario = this.usuarios.find((u) => u.correo_institucional === correo);
    return usuario || null;
  }

  async crear(dto: any): Promise<any> {
    const nuevoUsuario = {
      id: randomUUID(),
      correo_institucional: dto.correo_institucional,
      password_hash: dto.password_hash,
      nombre_completo: dto.nombre_completo,
      roles: dto.roles || ['estudiante'],
      activo: true,
      creado_en: new Date(),
      actualizado_en: new Date(),
    };
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }
}
