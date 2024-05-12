import { Controller } from '@nestjs/common';
import { VentorsService } from './ventors.service';

@Controller('ventors')
export class VentorsController {
  constructor(private readonly ventorsService: VentorsService) {}
}
