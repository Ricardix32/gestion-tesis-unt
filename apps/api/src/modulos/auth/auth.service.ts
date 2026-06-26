import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RegistroDto } from './dtos/registro.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async registrarEstudiante(dto: RegistroDto) {
    const usuarioExistente = await this.usuariosService.buscarPorCorreo(dto.correo_institucional);
    if (usuarioExistente) throw new BadRequestException('El correo ya está registrado');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const nuevoUsuario = await this.usuariosService.crear({
      ...dto,
      password_hash: passwordHash,
      roles: ['estudiante'], // Rol por defecto (HU-001)
    });

    return this.generarTokens(nuevoUsuario);
  }

  async login(correo: string, pass: string) {
    const usuario = await this.usuariosService.buscarPorCorreo(correo);
    if (!usuario || !(await bcrypt.compare(pass, usuario.password_hash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.generarTokens(usuario);
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const usuario = await this.usuariosService.buscarPorCorreo(payload.correo);
      if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
      return this.generarTokens(usuario);
    } catch (e) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  private generarTokens(usuario: any) {
    const payload = { sub: usuario.id, correo: usuario.correo_institucional, roles: usuario.roles };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
