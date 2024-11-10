import { IsInt, IsNumber, IsString } from "class-validator";

export class ProductDto {
    /**
     * @description "Ingresar el nombre del nuevo producto"
     * @example "Samsung A40"
     */
    @IsString()
    name: string;
    /**
     * @description "Ingresar la descripcion del nuevo producto"
     * @example "Camara frontal 40 px, trasera 80px, Memoria interna 120Gb"
     */
    @IsString()
    description: string;
    /**
     * @description "Ingresar precio nuevo producto"
     * @example "500"
     */
    @IsNumber()
    price: number;
    /**
    * @description "Ingresar el stock del nuevo producto"
    * @example "15"
    */
   @IsInt()
    stock: number;
    /**
     * @description "Ingresar la categoria existente del nuevo producto o el id de la categoria para actualizar el producto"
     * @example "smartphone o "a378046c-79df-4f12-9b04-59a7eae40cb4" "
     */
    @IsString()
    category: string

}