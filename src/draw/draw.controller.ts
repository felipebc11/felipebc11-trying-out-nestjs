import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { DrawService } from './draw.service';
@Controller('draw')
export class DrawController {
  constructor(private readonly drawService: DrawService){}

  @UseGuards(JwtAuthGuard)
  @Get()
  async makeDraw(){
    return this.drawService.draw();
  }
}
