import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly prisma: PrismaService) {}
  userLogin() {}

  ventorLogin() {}

  adminLogin() {}

  registerUser() {}

  registerVentor() {}

  reconveryUser() {}

  reconveryVentor() {}
}
