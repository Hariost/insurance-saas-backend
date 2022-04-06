import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import LocalFile from './entities/localFile.entity';
import LocalFilesService from './local-file.service';
import LocalFilesController from './local-file.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalFile]),
    ConfigModule,
  ],
  providers: [LocalFilesService],
  exports: [LocalFilesService],
  controllers: [LocalFilesController]
})
export class LocalFilesModule {}
