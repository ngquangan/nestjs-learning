import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
