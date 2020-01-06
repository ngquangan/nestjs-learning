import { Injectable } from '@nestjs/common';
import { IGetHelloResType } from './types';

@Injectable()
export class AppService {
  getHello(): IGetHelloResType {
    return {
      msg: 'Hello',
    };
  }
}
