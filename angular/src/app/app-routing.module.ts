import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowCustomersComponent } from './show-customers/show-customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'show-customers',
    pathMatch: 'full',
  },
  {
    path: 'show-customers',
    component: ShowCustomersComponent,
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent,
  },
  {
    path: 'edit-customer',
    component: EditCustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
