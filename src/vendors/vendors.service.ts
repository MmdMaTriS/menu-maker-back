import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService) {}
  async findVendor(mobile: string, password?: string) {
    const where: Prisma.VendorsWhereInput = {
      mobile,
    };
    if (password) where['password'] = password;
    return await this.prisma.vendors.findFirst({ where });
  }
}
