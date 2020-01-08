import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {

    }

    @Post()
    addProduct(
        @Body() completeBody: (title: string),
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('title') price: number,
    ): any {
        this.productsService.insertProduct(
            title,
            description,
            price,
        );
    }
}
