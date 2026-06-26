import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegistroDto {
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @Matches(/^[a-zA-Z0-9._%+-]+@unitru\.edu\.pe$/, {
    message: 'Solo se permiten correos institucionales de la UNT (@unitru.edu.pe)',
  })
  correo_institucional: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @IsNotEmpty()
  nombre_completo: string;
}
