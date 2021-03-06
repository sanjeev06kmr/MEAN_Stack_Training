import { CustomerInterceptor } from './services/customer.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { MatSortModule, MatTableModule } from '@angular/material';
import { CustomerService } from './services/customer.service';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { customerFilter } from './pipes/customerFilter';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CustomerFormReactiveComponent } from './components/customer-form-reactive/customer-form-reactive.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    customerFilter,
    CustomerFormComponent,
    ErrorMessageDirective,
    CustomerListComponent,
    CustomerCardComponent,
    CustomerFormReactiveComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CustomerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomerInterceptor,
      multi: true
    }
  ]

  
})
export class CustomersModule { }
