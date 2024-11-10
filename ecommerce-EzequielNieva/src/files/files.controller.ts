import { Controller, Post, Param, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema:{
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseGuards(AuthGuard)
  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@Param('id',ParseUUIDPipe) id: string,    @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 200 * 1024, 
          message: "El archivo debe ser menor a 200KB", 
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/, 
        }),
      ],
    }),
  ) file: Express.Multer.File) {
    return this.filesService.uploadImage(file, id); 
  }
}
