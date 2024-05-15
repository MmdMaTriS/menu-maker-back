import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersSerivce: UsersService,
  ) {}
  async userLogin() {
    const user = await this.usersSerivce.findUser('');
  }

  async ventorLogin() {}

  async adminLogin() {}

  async registerUser() {}

  async registerVentor() {}

  async reconveryUser() {}

  async reconveryVentor() {}
}
