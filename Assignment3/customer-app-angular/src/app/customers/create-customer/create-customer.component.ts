import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { NgForm } from '@angular/forms';

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

  onSelectedFile($event) {
    this.selectedFile = <File>$event.target.files[0];
    console.log(this.selectedFile);
  }

  createCustomer(customerData: NgForm): void {
    console.log(customerData.value);
    const newCustomer: Customer = Object.assign({}, customerData.value);

    let formData = new FormData();
    if (this.selectedFile != null)
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    formData.append('name', newCustomer.name);
    formData.append('gender', newCustomer.gender);
    formData.append('email', newCustomer.email);
    formData.append('address', newCustomer.address);
    formData.append('city', newCustomer.city);
    formData.append('state', newCustomer.state);
    formData.append('country', newCustomer.country);
    formData.append('hobbies', this.getHobbies(customerData));

    this.customerService.createCustomerWithImage(formData).subscribe(
      (data: Customer) => {
        console.log(data);
        this.router.navigate(['customers']);
      }
    )
  }


  private getHobbies(customerData: NgForm) {
    let hobbies = "";
    if (customerData.controls['cricket'].value !== undefined &&
      customerData.controls['cricket'].value) {
      hobbies = hobbies.length > 0 ? hobbies + ', Cricket' : 'Cricket';
    }
    if (customerData.controls['football'].value !== undefined &&
      customerData.controls['football'].value == true) {
      hobbies = hobbies.length > 0 ? hobbies + ', Football' : 'Football';
    }
    return hobbies;
  }
}
