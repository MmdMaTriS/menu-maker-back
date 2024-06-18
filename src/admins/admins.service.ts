import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAdmin(mobile: string, password?: string) {
    const where: Prisma.AdminsWhereInput = {
      mobile,
    };
    if (password) where['password'] = password;
    return await this.prisma.admins.findFirst({ where });
  }
}
