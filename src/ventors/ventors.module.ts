import { Module } from '@nestjs/common';
import { VentorsService } from './ventors.service';
import { VentorsController } from './ventors.controller';

@Module({
  controllers: [VentorsController],
  providers: [VentorsService],
})
export class VentorsModule {}
