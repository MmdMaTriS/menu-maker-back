import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { VentorsModule } from './ventors/ventors.module';
import { AdminsModule } from './admins/admins.module';
import { GlobalModule } from './global/global.module';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [UsersModule, VentorsModule, AdminsModule, GlobalModule, AuthenticationModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
