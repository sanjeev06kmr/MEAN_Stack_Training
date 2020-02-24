import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'createCustomer', component: CreateCustomerComponent },
  { path: 'editCustomer/:id', component: EditCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
