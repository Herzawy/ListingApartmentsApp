import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentsModule } from './apartments/apartments.module';
import { UploadsModule } from './uploads/uploads.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { UploadsController } from './uploads/uploads.controller';


@Module({
    imports: [
        MongooseModule.forRoot('mongodb://mongo:27017/apartments'), 
        ApartmentsModule,
        UploadsModule,
        ServeStaticModule.forRoot({
          rootPath: path.join('/app/uploads'),
          serveRoot: '/uploads',
        }),
      ],
    controllers: [UploadsController],
})
export class AppModule {}