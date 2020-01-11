import { Injectable, Post } from "@nestjs/common";
import { Product } from "./products.class";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const generateId = new Date().getTime().toString();
        this.products.push(
            new Product(
                generateId,
                title,
                desc,
                price,
            ),
        );
        return generateId;
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(prodId: string) {
        return this.products.find((prod: any) => prod.id === prodId );
    }
}
