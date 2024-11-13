import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(private cartService: CartService) {
    this.product = {
      id: 1,
      name: '',
      price: 0,
      url: '',
      description: '',
      amount: 0,
    };
  }

  ngOnInit(): void {}

  selectedItemChange(value: any) {
    this.product.amount = Number(value);
  }

  getLink(): string {
    return `/product/${this.product.id}`;
  }

  addToCard(): void {
    this.cartService.addProduct(this.product);
  }
}
