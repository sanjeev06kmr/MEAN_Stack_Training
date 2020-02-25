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

  selectedFile: File = null;
  formBuilder: any;
  customer: Customer;
  isCricketActive: boolean = false;
  isFootballActive: boolean = false;

  //Title coming from Parent Component where this Component will be rendered
  @Input('title') title: string;

  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) {
    this.customer = new Customer();
  }

  ngOnInit() {
    // IF this form is loaded to Edit Customer. get CustomerDetail by Id
    if (this.title == "Edit Csutomer") {
      let id = this.route.snapshot.paramMap.get('id');
      console.log(id);

      // FEtch Customer Detail based on id
      this.customerService.getCustomerById(id).subscribe(
        response => {
          console.log(response);
          this.customer = response.result;

          // Select Hobbies checkbox based on fetched result
          if (this.customer.hobbies != undefined &&
            this.customer.hobbies.toLowerCase().indexOf('football') != -1) {
            this.isFootballActive = true;
          }
          if (this.customer.hobbies != undefined &&
            this.customer.hobbies.toLowerCase().indexOf('cricket') != -1) {
            this.isCricketActive = true;
          }

          console.log(this.customer);
        },
        error => {
          console.log('Error from Service:', error)
        }
      );
    }
    else {
      // This Form id loaded to Addd CUstomer
      console.log("This Form id loaded to Add Customer");
    }
  }

  onSelectedFile($event) {
    this.selectedFile = <File>$event.target.files[0];
    console.log(this.selectedFile);
  }

  submitCustomerForm(customerData: NgForm) {
    if (this.title == "Add Customer") {
      // Add Customer
      this.createCustomer(customerData);
    } else {
      // Edit Customer
      this.updateCustomer(customerData);
    }
  }

  // Adds Customer with Image.
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
    formData.append('hobbies', this.getHobbies());

    // Calling service to Add New Customer.
    this.customerService.createCustomerWithImage(formData).subscribe(
      (data: Customer) => {
        console.log(data);
        alert("Customer Added.");
        // After Adding Customer , Navigate to Main Customer PAge to list Customer
        this.router.navigate(['customers']);
      },
      error => {
        console.log('Error from Service:', error)
      }
    )
  }

  // Updates Existing Customer.
  updateCustomer(customerData: NgForm): void {
    console.log(customerData.value);
    const tempCustomer: Customer = Object.assign({}, customerData.value);

    var newCustomer: Customer = new Customer();
    newCustomer._id = this.customer._id;
    newCustomer.name = tempCustomer.name;
    newCustomer.email = tempCustomer.email;
    newCustomer.gender = tempCustomer.gender;
    newCustomer.address = tempCustomer.address;
    newCustomer.city = tempCustomer.city;
    newCustomer.state = tempCustomer.state;
    newCustomer.country = tempCustomer.country;
    newCustomer.hobbies = this.getHobbies();

    // calling service to update EXisting Customer.
    this.customerService.editCustomer(this.customer._id, newCustomer).subscribe(
      (data: Customer) => {
        console.log(data);
        alert("Customer Updated.");
        // After Editing Customer , Navigate to Main Customer PAge to list Customer.
        this.router.navigate(['customers']);
      },
      error => {
        console.log('Error from Service:', error)
      }
    )
  }

  // Get Hobbies text based on CheckBox selected
  private getHobbies() {
    let hobbies = "";
    console.log('Cricket', this.isCricketActive);
    console.log('Football', this.isCricketActive);
    if (this.isCricketActive) {
      hobbies = hobbies.length > 0 ? hobbies + ', Cricket' : 'Cricket';
    }
    if (this.isFootballActive) {
      hobbies = hobbies.length > 0 ? hobbies + ', Football' : 'Football';
    }
    return hobbies;
  }
}
