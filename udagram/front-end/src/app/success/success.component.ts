import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { User } from '../models/User';
import { Product } from '../models/Product';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  fullName: string;
  totals: number;

  constructor(private cartService: CartService) {
    this.fullName = '';
    this.totals = 0;
  }

  ngOnInit(): void {
    const userInfo: User = this.cartService.getUserInfo();
    this.fullName = userInfo.fullName;

    const orderProducts: Product[] = this.cartService.getOrder();
    const prices = orderProducts.map(
      (product) => product.price * product.amount
    );
    this.totals = prices.reduce((totals, currentPrice) => {
      return totals + currentPrice;
    }, 0);

    this.cartService.clearOrder();
  }
}
