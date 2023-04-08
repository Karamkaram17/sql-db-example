import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { BloodType } from './blood-type';
import { Country } from './country';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class Shared implements OnInit, OnDestroy {
  constructor(private _customerService: CustomerService) {}
  ngOnInit(): void {
    this._customerService
      .getAllBloodTypes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.count++;
          this.bloodTypes = data;
        },
        error: () => {
          this.errorMSG = 'Unexpected Error Occurred';
        },
      });

    this._customerService
      .getAllCountries()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.count++;
          this.countries = data;
        },
        error: () => {
          this.errorMSG = 'Unexpected Error Occurred2';
        },
      });
  }

  unsubscribe$ = new Subject<void>();
  count = 0;
  loading = false;
  errorMSG = '';
  bloodTypes: BloodType[] = [];
  countries: Country[] = [];

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
