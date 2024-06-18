import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/authentication.dto';
import { UserDevice, UserDeviceType } from 'src/common/decorators/UserDevice';

// User's can login with `one time code`
@ApiTags('Authentication Routes')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('/login/user')
  userLogin(@Body() body: LoginDTO, @UserDevice() userDevice: UserDeviceType) {
    return this.authenticationService.userLogin(
      body,
      userDevice.ip,
      userDevice.userAgent,
    );
  }

  @Post('/login/vendor')
  vendorLogin(
    @Body() body: LoginDTO,
    @UserDevice() userDevice: UserDeviceType,
  ) {
    return this.authenticationService.vendorLogin(
      body,
      userDevice.ip,
      userDevice.userAgent,
    );
  }

  @Post('/login/admin')
  adminLogin(@Body() body: LoginDTO, @UserDevice() userDevice: UserDeviceType) {
    return this.authenticationService.adminLogin(
      body,
      userDevice.ip,
      userDevice.userAgent,
    );
  }

  @Post('/register/user')
  registerUser() {
    return this.authenticationService.registerUser();
  }

  @Post('/register/ventor')
  registerVendor() {
    return this.authenticationService.registerVendor();
  }

  @Post('/recovery/user')
  reconveryUser() {
    return this.authenticationService.reconveryUser();
  }

  @Post('/recovery/ventor')
  reconveryVentor() {
    return this.authenticationService.reconveryVentor();
  }
}
