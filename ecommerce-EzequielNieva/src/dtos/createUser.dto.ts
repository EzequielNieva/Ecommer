import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Length,
  Matches,
  IsNotEmpty,
  IsEmpty,
} from 'class-validator';


export class CreateUserDto {
  /**
    * @description "Ingresar el nombre del nuevo usuario"
    * @example "Juan Perez"
  */
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name: string;

  /**
    * @description "Ingresar el email del nuevo usuario"
    * @example "jperez@mail.com"
  */
  @IsEmail({}, { message: 'El correo debe tener un formato válido.' })
  email: string;

  /**
    * @description "Ingresa la contraseña del nuevo usuario, procura que cumpla con los requisitos de contraseña fuerte"
    * @example "Password12*"
  */
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;

  /**
    * @description "Ingresar en este campo nuevamente la contraseña para confirmarla"
    * @example "Password12*"
  */
  @IsString()
  @IsNotEmpty({ message: 'La confirmación de la contraseña es requerida.' })
  confirmPassword: string;

  /**
    * @description "Ingresa el domicilio del usuario"
    * @example "Calle Falsa 123"
  */
  @IsString()
  @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres.' })
  address: string;

   /**
    * @description "Ingresa el numero de telefono del usuario"
    * @example "111257898"
  */
  @IsString()
  @IsNotEmpty({ message: 'El número de teléfono es requerido.' })
  phone: string;

  /**
    * @description "Ingresa el pais donde reside el usuario, este campo es opcional"
    * @example "Argentina"
  */
  @IsString()
  @Length(4, 20, { message: 'El país debe tener entre 4 y 20 caracteres.' })
  country: string;

  /**
    * @description "Ingresa la ciudad donde se encuentra residiendo el usuario"
    * @example "Buenos Aires"
  */
  @IsString()
  @Length(4, 20, { message: 'La ciudad debe tener entre 4 y 20 caracteres.' })
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin:boolean;
}
