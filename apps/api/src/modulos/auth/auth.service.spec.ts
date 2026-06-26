import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let usuariosService: any;

  beforeEach(async () => {
    const mockUsuariosService = {
      buscarPorCorreo: jest.fn(),
      crear: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(() => 'mockToken'),
      verify: jest.fn(() => ({ correo: 'test@unitru.edu.pe' })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuariosService, useValue: mockUsuariosService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usuariosService = module.get<UsuariosService>(UsuariosService);
  });

  it('debe registrar un estudiante exitosamente', async () => {
    usuariosService.buscarPorCorreo.mockResolvedValue(null); // No existe
    usuariosService.crear.mockResolvedValue({ id: '123', roles: ['estudiante'] });

    const dto = { correo_institucional: 'test@unitru.edu.pe', password: 'password123', nombre_completo: 'Juan Perez' };
    const result = await authService.registrarEstudiante(dto);

    expect(result).toHaveProperty('access_token');
    expect(usuariosService.crear).toHaveBeenCalled();
  });

  it('debe fallar si el correo ya existe', async () => {
    usuariosService.buscarPorCorreo.mockResolvedValue({ id: '123' }); // Ya existe

    const dto = { correo_institucional: 'test@unitru.edu.pe', password: 'password123', nombre_completo: 'Juan Perez' };

    await expect(authService.registrarEstudiante(dto)).rejects.toThrow('El correo ya está registrado');
  });
});
