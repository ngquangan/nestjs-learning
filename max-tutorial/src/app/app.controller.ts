import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('123')
  @Header('Content-type', 'text/html')
  getHello(): any {
    return {
      name: 'An',
    };
  }
}
