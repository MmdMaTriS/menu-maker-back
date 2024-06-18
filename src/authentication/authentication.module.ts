import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { VendorsModule } from 'src/vendors/vendors.module';
import { AdminsModule } from 'src/admins/admins.module';

@Module({
  imports: [UsersModule, VendorsModule, AdminsModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
