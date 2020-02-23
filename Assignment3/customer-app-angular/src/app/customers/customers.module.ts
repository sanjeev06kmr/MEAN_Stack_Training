import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';


///
import { MatSortModule, MatTableModule } from '@angular/material';
import { CustomerService } from './services/customer.service';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//import { AppComponent } from './app.component';
//import { CustomerComponent } from './customer/customer.component';
//import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
//import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { customerFilter } from './pipe/customerFilter';
import { AppInterceptorService } from './Interceptors/appInterceptorService';
import { CustomerFormComponent } from './customer-form/customer-form.component';
//import { AppInterceptorService } from './appInterceptorService';
///

@NgModule({
  declarations: [
    CustomersComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    customerFilter,
    CustomerFormComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CustomerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    }
  ]

  
})
export class CustomersModule { }
