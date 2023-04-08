import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../classes/customer';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-show-customers',
  templateUrl: './show-customers.component.html',
  styleUrls: ['./show-customers.component.css'],
})
export class ShowCustomersComponent implements OnInit, OnDestroy {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.customerService
      .getAllCustomers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.count++;
          this.customers = data;
        },
        error: () => {
          this.errorMSG = 'Unexpected Error Occurred2';
        },
      });
  }
  unsubscribe$ = new Subject<void>();
  count = 0;
  countNb = 1;
  errorMSG = '';
  customers: Customer[] = [];

  edit(customer: Customer) {
    this.customerService.customer$.next(customer);
    this.router.navigateByUrl('/edit-customer');
  }

  deleteCustomer(id: number) {
    this.customerService
      .deleteCustomer(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.customers = this.customers.filter((c) => c.id !== id);
        },
        error: () => {
          this.errorMSG = 'Unexpected Error Occurred';
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
