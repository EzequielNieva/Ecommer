import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  /**
     * @description "Aca se debe ingresar el email del usuario"
     * @example "jperez@mail.com"
  */
  @IsString()
  @IsNotEmpty({ message: 'El email es requerido.' })
  email: string;

  /**
     * @description "Ingresa la contraseña del usuario"
     * @example "Password12*"
  */
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida.' })
  password: string;
}
