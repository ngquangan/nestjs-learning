import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Post()
    addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number,
    ): any {
        const id = this.productsService.insertProduct(
            title,
            description,
            price,
        );
        return {
            id,
        };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        const productItem = this.productsService.getSingleProduct(prodId);
        if (!productItem) {
            throw new NotFoundException('Could not found product!');
        }
        return productItem;

    }
}
