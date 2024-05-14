import { Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';

// User's can login with `one time code`
@ApiTags('Authentication Routes')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('/login/user')
  userLogin() {
    return this.authenticationService.userLogin();
  }

  @Post('/login/ventor')
  ventorLogin() {
    return this.authenticationService.ventorLogin();
  }

  @Post('/login/admin')
  adminLogin() {
    return this.authenticationService.adminLogin();
  }

  @Post('/register/user')
  registerUser() {
    return this.authenticationService.registerUser();
  }

  @Post('/register/ventor')
  registerVentor() {
    return this.authenticationService.registerVentor();
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
