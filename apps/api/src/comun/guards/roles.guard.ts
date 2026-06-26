import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequeridos = this.reflector.get<string[]>('roles', context.getHandler());
    if (!rolesRequeridos) return true;

    const request = context.switchToHttp().getRequest();
    const usuario = request.user; // Inyectado por JwtAuthGuard previo

    const tieneRol = rolesRequeridos.some((rol) => usuario.roles?.includes(rol));
    if (!tieneRol) throw new ForbiddenException('No tienes permisos (RBAC) para esta acción');

    return true;
  }
}
