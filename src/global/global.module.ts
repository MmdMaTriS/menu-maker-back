import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LoggerService } from 'src/logger/logger.service';

@Global()
@Module({
  providers: [PrismaService, LoggerService],
  exports: [PrismaService, LoggerService],
})
export class GlobalModule {}
