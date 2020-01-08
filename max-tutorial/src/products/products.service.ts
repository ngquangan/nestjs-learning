import { Injectable, Post } from "@nestjs/common";
import { Product } from "./products.module";

@Injectable()
export class ProductsService {
    products: Product[] = [];

    @Post()
    insertProduct(title: string, desc: string, price: number) {
        this.products.push(
            new Product(
                new Date().toString(),
                title,
                desc,
                price,
            ),
        );
    }
}
