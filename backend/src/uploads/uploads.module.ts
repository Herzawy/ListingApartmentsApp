import { Module } from '@nestjs/common';
import { ImageUploadService } from './uploads.service';
import { UploadsController } from './uploads.controller';

@Module({
  providers: [ImageUploadService],
  exports: [ImageUploadService],
  controllers: [UploadsController]
})
export class UploadsModule {}
