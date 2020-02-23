import { Customer } from './../models/customer.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import {catchError} from 'rxjs/operators';
//import 'rxjx/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url ="http://localhost:3000/customer";

  constructor(private http: HttpClient) {

   }

   // NOTE: For API calls, errors are being handled at interceptor level.

  getCustomer():Observable<any>{
    return this.http.get<any>(this.url)
  }

  getCustomerById(id):Observable<any>{
    return this.http.get<any>(this.url+'/'+id);
  }
  
  createCustomer(customer:Customer):Observable<any>{
    return this.http.post(this.url, customer);
  }

  createCustomerWithImage(formData):Observable<any>{
    return this.http.post(this.url, formData);
  }

  deleteCustomer(id):Observable<any>{
    return this.http.delete(this.url+'/'+id);
  }

  editCustomer(id, customer:Customer):Observable<any>{
    return this.http.put(this.url+'/'+id, customer)
  }

}
