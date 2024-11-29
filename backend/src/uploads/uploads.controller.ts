import { Controller, Post, Get, Param, Res, UploadedFile, UseInterceptors, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from './uploads.service';
import * as path from 'path';


@Controller('upload')
export class UploadsController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const filePath = await this.imageUploadService.uploadFile(file);
    
    return { imageUrl: `/uploads/${filePath}` };
  }

  // Endpoint for fetching the file
  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join('/app/uploads', filename);

    // Call service method to fetch the file
    const fileExists = await this.imageUploadService.fileExists(filePath);
    if (!fileExists) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    // Send the file to the response
    return this.imageUploadService.sendFile(filePath, res);
  }
}
