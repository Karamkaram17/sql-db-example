import { Component, OnInit } from '@angular/core';
import { Customer } from '../classes/customer';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { Shared } from '../classes/shared';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent extends Shared implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {
    super(customerService);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.customerService.customer$.subscribe({
      next: (data) => {
        this.count++;
        this.customer = data;
      },
      error: () => {
        this.errorMSG = 'Unexpected Error Occurred';
      },
    });
  }

  onSubmit() {
    this.customerService.editCustomer(this.customer).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.errorMSG = 'Unexpected Error Occurred';
      },
    });
  }
  countNb = 3;
  customer: Customer = new Customer();
}
