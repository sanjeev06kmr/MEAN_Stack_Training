import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  gender = 'male';
  country = 'india';
  selectedFile: File = null;
  formBuilder: any;
  customer: Customer;

  //Title coming from Parent Component where this Component will be rendered
  @Input('title') title: string;

  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) {
    this.customer = new Customer();
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id != undefined) {
      console.log("AS there is Id present in Param, So it is rendered for editing Customer");

      this.customerService.getCustomerById(id).subscribe(
        response => {
          console.log(response);
          this.customer = response.result;
          console.log(this.customer);
        }
      );
    }
    else{
      console.log("AS there is No Id in Param, So it is rendered for Creating Customer");
    }
  }

  onSelectedFile($event) {
    this.selectedFile = <File>$event.target.files[0];
    console.log(this.selectedFile);
  }

  submitCustomerForm(customerData: NgForm){
    if(this.title=="Add Customer"){
      // Add Customer
      this.createCustomer(customerData);
    }else{
      // Edit Customer
      this.updateCustomer(customerData);
    }
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

  updateCustomer(customerData: NgForm): void{
    console.log(customerData.value);
    const tempCustomer : Customer = Object.assign({}, customerData.value);

    var newCustomer : Customer = new Customer();
    newCustomer._id=this.customer._id;
    newCustomer.name=tempCustomer.name;
    newCustomer.email=tempCustomer.email;
    newCustomer.gender = tempCustomer.gender;
    newCustomer.address = tempCustomer.address;
    newCustomer.city=tempCustomer.city;
    newCustomer.state=tempCustomer.state;
    newCustomer.country = tempCustomer.country;
    newCustomer.hobbies=tempCustomer.hobbies;    
    
    console.log(newCustomer);
    this.customerService.editCustomer(this.customer._id, newCustomer).subscribe(
      (data:Customer)=>{
        console.log(data);
        this.router.navigate(['customers']);
      }
    )
  }

  // Get Hobbies text based on CheckBox selected
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
