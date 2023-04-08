import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../classes/customer';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Country } from '../classes/country';
import { BloodType } from '../classes/blood-type';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  customer$ = new BehaviorSubject<Customer>(new Customer());

  url = 'http://localhost:3000/customers';

  getAllCustomers() {
    return this.http.get<Customer[]>(`${this.url}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  addCustomer(customer: Customer) {
    return this.http
      .post<Customer>(`${this.url}/customer`, {
        firstName: customer.first,
        lastName: customer.last,
        countryId: customer.country_id,
        bloodTypeId: customer.blood_type_id,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  editCustomer(customer: Customer) {
    return this.http
      .patch<Customer[]>(`${this.url}/customer/${customer.id}`, {
        firstName: customer.first,
        lastName: customer.last,
        countryId: customer.country_id,
        bloodTypeId: customer.blood_type_id,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.url}/customer/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  getAllCountries() {
    return this.http.get<Country[]>(`${this.url}/countries`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  getAllBloodTypes() {
    return this.http.get<BloodType[]>(`${this.url}/blood-types`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
