import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  orderProducts: Product[] = [];
  totalsPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.orderProducts = this.cartService.getOrder();
    const prices = this.orderProducts.map(
      (product) => product.price * product.amount
    );
    this.totalsPrice = prices.reduce((totals, currentPrice) => {
      return totals + currentPrice;
    }, 0);
  }

  changeAmmout(product: Product) {
    let updateProducts = this.orderProducts.map((pro) => {
      if (pro.id == product.id) {
        pro.amount = product.amount;
      }
      return pro;
    });
    updateProducts = updateProducts.filter((pro) => pro.amount > 0);
    this.cartService.updateProduct(updateProducts);

    this.getData();
  }

  submitForm(userInfo: User): void {
    this.cartService.addUserInfo(userInfo);
    this.router.navigate(['/success']);
  }
}
