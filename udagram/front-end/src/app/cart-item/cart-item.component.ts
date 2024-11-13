import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() product: Product;
  @Output() changedAmmount: EventEmitter<Product> = new EventEmitter();

  constructor() {
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

  amountChange() {
    this.changedAmmount.emit(this.product);
  }
}
