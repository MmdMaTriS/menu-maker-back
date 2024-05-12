import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';
import { VentorsModule } from './ventors/ventors.module';

@Module({
  imports: [UsersModule, VentorsModule],
  providers: [PrismaService],
})
export class AppModule {}
