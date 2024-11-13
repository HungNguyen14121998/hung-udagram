import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  selectedItem: number = 1;

  product: Product = {
    id: 1,
    name: '',
    price: 0,
    url: '',
    description: '',
    amount: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cardService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
    });

    this.productService.getProducts().subscribe((res) => {
      res.forEach((product) => {
        if (product.id == this.productId) {
          this.product = product;
          return;
        }
      });
    });
  }

  selectedItemChange(value: any) {
    this.selectedItem = Number(value);
  }

  addToCard(): void {
    this.product.amount = this.selectedItem;
    this.cardService.addProduct(this.product);
  }
}
