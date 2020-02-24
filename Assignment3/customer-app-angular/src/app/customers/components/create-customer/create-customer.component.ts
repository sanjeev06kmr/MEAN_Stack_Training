import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  gender = 'male';
  country = 'india';
  selectedFile: File = null;
  formBuilder: any;
  customerId:string="0";
  title:string = "Add Customer";
  
  constructor(private customerService: CustomerService,
    private router: Router) {
  }

  ngOnInit() {
  }
  
}
