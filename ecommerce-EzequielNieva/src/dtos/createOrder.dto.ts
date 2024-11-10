import { IsArray, IsNotEmpty, IsUUID, ArrayNotEmpty } from 'class-validator';

export class CreateOrderDto {
  /**
  * @description "Ingresar el id del usuario al cual le corresponde la orden de compra"
  * @example "7d1f0m4k-12a5-4171-b270-9047f509bg65"
  */
  @IsNotEmpty({ message: 'El userId es requerido.' })
  @IsUUID('4', { message: 'El userId debe ser un UUID válido.' })
  userId: string;

  /**
  * @description "Ingresar los id de los productos que desea comprar el usuario"
  *@example[{"id":"f06762ca-3107-4d49-b316-116410e661fa"} ,{"id":"d51a06d5-9b75-4b57-bac2-de4d10c72000" }]
  */
  @IsArray({ message: 'Products debe ser un array.' })
  @ArrayNotEmpty({ message: 'La orden debe contener al menos un producto' })
  products: { id: string }[];
}
