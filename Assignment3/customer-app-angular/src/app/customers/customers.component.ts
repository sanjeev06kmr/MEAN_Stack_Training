import { CustomerService } from './services/customer.service';
import { Customer } from './models/customer.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {customerFilter} from './pipe/customerFilter'

@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [CustomerService]
})
export class CustomersComponent implements OnInit {
  displayMode:number = 1;
  customer: Customer[]=[];
  image:string ='http://localhost:3000/image/1582300745833pic1.png';
 
  constructor(private customerService: CustomerService, 
    private router :Router,
    private route: ActivatedRoute) {
    //this.customer = this.customerService.getCustomer();
  }

  ngOnInit() {
    this.customerService.getCustomer().subscribe(
      response =>{
        console.log(response);
        
        this.customer = response.result;
      }
    );     
  }

  checkIfCustomerExist(){
    console.log(this.customer);
    if (this.customer ! = undefined && this.customer.length>0)
    {
      console.log('>0');
      return true;
    }
    else{
      return false;
    }
  }

  onDisplayModeChange(mode: number): void {
        this.displayMode = mode;
  }

  onEdit($event): void {
    console.log($event.target.getAttribute('custId'));

    let customerId=$event.target.getAttribute('custId');
    this.router.navigate(['customers/editCustomer',customerId]);
  }

  onDelete($event): void {
    let customerId=$event.target.getAttribute('custId');
    console.log(customerId);

    this.customerService.deleteCustomer(customerId).subscribe(
      response =>{
        console.log(response);        
      }
    );

    // Refresh Customer object after deletion.
    const item = this.customer.find(item => item._id === customerId);    
    console.log(this.customer.length);
    this.customer.splice(this.customer.indexOf(item),1);
    console.log(this.customer.length);
  }
}
