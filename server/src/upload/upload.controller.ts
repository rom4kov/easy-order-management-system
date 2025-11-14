import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
// import { HttpStatus } from '@nestjs/common';
import type { Express } from 'express';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { ParseFilePipeBuilder } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log(file);
    return this.uploadService.saveFile(file);
  }
}
