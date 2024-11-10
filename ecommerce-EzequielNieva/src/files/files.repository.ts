import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "src/products/products.respository";
import { v2 } from 'cloudinary'; 
import * as toStream from 'buffer-to-stream';

@Injectable()
export class FilesRepository{
    constructor(private readonly productRepository: ProductsRepository) {}
    async uploadImage(file: Express.Multer.File, productId: string): Promise<string> {
      try {
        return new Promise((resolve, reject) => {
          const upload = v2.uploader.upload_stream(
            { resource_type: 'auto' },
            async (error, result) => {
              if (error) {
                reject(new InternalServerErrorException('Error al subir la imagen a Cloudinary.'));
              } else {
                try {
                  await this.productRepository.updateProductImage(productId, result.secure_url);
                  resolve(result.secure_url);
                } catch (err) {
                  reject(err); 
                }
              }
            },
          );
          toStream(file.buffer).pipe(upload);
        });
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(`El producto con id ${productId} no fue encontrado.`);
        } else {
          throw new InternalServerErrorException('Error inesperado al subir la imagen.');
        }
      }
    }
  }