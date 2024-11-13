import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
})
export class CheckoutFormComponent implements OnInit {
  fullName: string = '';
  address: string = '';
  cardNumber: string = '';

  @Output() submit: EventEmitter<User> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  submitForm(): void {
    const userInfo: User = {
      fullName: this.fullName,
      address: this.address,
      cardNumber: this.cardNumber,
    };

    this.submit.emit(userInfo);

    this.fullName = '';
    this.address = '';
    this.cardNumber = '';
  }
}
