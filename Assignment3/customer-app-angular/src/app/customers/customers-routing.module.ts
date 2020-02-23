import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'createCustomer', component: CreateCustomerComponent },
  { path: 'editCustomer/:id', component: EditCustomerComponent },
];

// const routes: Routes = [
//   { path: '', component: CustomersComponent },
//   { path: 'customers1', component: CreateCustomerComponent },
//   { path: '', redirectTo: '/', pathMatch: 'full' }
// ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
