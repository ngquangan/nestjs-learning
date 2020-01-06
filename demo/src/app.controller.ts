import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IGetHelloResType } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IGetHelloResType {
    return this.appService.getHello();
  }
}
