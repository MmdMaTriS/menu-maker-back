import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { VendorsModule } from 'src/vendors/vendors.module';

@Module({
  imports: [UsersModule,VendorsModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
