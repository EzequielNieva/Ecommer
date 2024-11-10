import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';



@Injectable()
export class FilesService {
  constructor(private readonly filesRepository:FilesRepository){}
  async uploadImage(file: Express.Multer.File, id: string) {
    return await this.filesRepository.uploadImage(file,id);
  }
}
