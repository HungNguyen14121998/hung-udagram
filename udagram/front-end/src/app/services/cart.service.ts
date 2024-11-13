import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  storage = window.localStorage;

  constructor() {}

  addProduct(product: Product): void {
    let orderProducts: Product[] = [];
    const orderData = this.storage.getItem('order');
    if (orderData != null) {
      orderProducts = JSON.parse(orderData) as Product[];
    }
    // handle same id
    let isSameProductId: boolean = false;
    orderProducts.forEach((productOrder) => {
      if (productOrder.id == product.id) {
        isSameProductId = true;
      }
    });
    if (isSameProductId) {
      orderProducts = orderProducts.map((productOrder) => {
        if (productOrder.id == product.id) {
          productOrder.amount += product.amount;
        }
        return productOrder;
      });
      this.updateProduct(orderProducts);
    } else {
      orderProducts.push(product);
      this.storage.setItem('order', JSON.stringify(orderProducts));
    }
    alert('Add product success');
  }

  updateProduct(products: Product[]): void {
    this.storage.setItem('order', JSON.stringify(products));
  }

  getOrder(): Product[] {
    let orderProducts: Product[] = [];
    const orderData = this.storage.getItem('order');
    if (orderData != null) {
      orderProducts = JSON.parse(orderData) as Product[];
    }
    return orderProducts;
  }

  addUserInfo(userInfo: User): void {
    this.storage.setItem('user', JSON.stringify(userInfo));
  }

  getUserInfo(): User {
    let userInfo: User = {
      fullName: '',
      address: '',
      cardNumber: '',
    };
    const userInfoData = this.storage.getItem('user');
    if (userInfoData != null) {
      userInfo = JSON.parse(userInfoData) as User;
    }
    return userInfo;
  }

  clearOrder(): void {
    this.storage.clear();
  }
}
