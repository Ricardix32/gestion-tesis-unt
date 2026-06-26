import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dtos/registro.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  @HttpCode(HttpStatus.CREATED)
  async registro(@Body() dto: RegistroDto) {
    return this.authService.registrarEstudiante(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('correo_institucional') correo: string,
    @Body('password') pass: string,
  ) {
    return this.authService.login(correo, pass);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('token') token: string) {
    return this.authService.refreshTokens(token);
  }
}
