import { Controller, Get, Ip, Req } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from './database/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Main Routes')
@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/')
  home(@Req() req: Request, @Ip() userIp: string) {
    return `<h1>Hello my dear.</h1><br/><br/> your ip is: ${userIp} 
            <br/>  deivce: ${req.headers['user-agent']} <br/>
            referer: ${req.headers['referer'] ?? 'Self'}`;
  }
}
