import { Component, OnInit } from '@angular/core';
import { Customer } from '../classes/customer';
import { CustomerService } from '../services/customer.service';
import { Shared } from '../classes/shared';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent extends Shared implements OnInit {
  constructor(private customerService: CustomerService) {
    super(customerService);
  }

  onSubmit(form: any) {
    this.customerService
      .addCustomer(this.customer)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          form.reset();
        },
        error: (err) => {
          this.errorMSG = 'Unexpected Error Occurred';
        },
      });
  }

  countNb = 2;
  customer: Customer = new Customer();
}
