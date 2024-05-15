import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(mobile: string, password?: string) {
    const where: Prisma.UsersWhereInput = {
      mobile,
    };
    if (password) where['password'] = password;
    return await this.prisma.users.findFirst({ where });
  }
}
