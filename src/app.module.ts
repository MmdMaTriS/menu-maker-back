import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { VentorsModule } from './ventors/ventors.module';
import { AdminsModule } from './admins/admins.module';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { GlobalModule } from './global/global.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    UsersModule,
    VentorsModule,
    AdminsModule,
    GlobalModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
