import { Body, Controller, Ip, Post, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/authentication.dto';
import { Request } from 'express';

// User's can login with `one time code`
@ApiTags('Authentication Routes')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('/login/user')
  userLogin(@Body() body: LoginDTO, @Ip() ip: string, @Req() req: Request) {
    const userAgent = req.headers['user-agent'];
    return this.authenticationService.userLogin(body, ip, userAgent);
  }

  @Post('/login/ventor')
  ventorLogin(@Body() body: LoginDTO) {
    return this.authenticationService.ventorLogin();
  }

  @Post('/login/admin')
  adminLogin(@Body() body: LoginDTO) {
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
