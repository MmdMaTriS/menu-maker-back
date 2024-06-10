import { Controller } from '@nestjs/common';
import { VendorsService } from './vendors.service';

@Controller('ventors')
export class VendorsController {
  constructor(private readonly ventorsService: VendorsService) {}
}
