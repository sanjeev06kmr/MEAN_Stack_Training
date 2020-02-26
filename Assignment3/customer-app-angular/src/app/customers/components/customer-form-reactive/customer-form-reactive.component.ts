import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { NgForm, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form-reactive',
  templateUrl: './customer-form-reactive.component.html',
  styleUrls: ['./customer-form-reactive.component.css']
})
export class CustomerFormReactiveComponent implements OnInit {

  selectedFile: File = null;
  customer: Customer;
  isCricketActive: boolean = false;
  isFootballActive: boolean = false;
  customerForm: FormGroup;
  // Hobbies List for checkBox
  hobbies = [
    { id: 1, hobbie: 'Cricket' },
    { id: 2, hobbie: 'Football' }
  ];

  title: string = "Add Customer";

  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.customer = new Customer();    
  }

  ngOnInit() {
    this.generateCustomerFormBuilder() ;
  }

  generateCustomerFormBuilder() {
    console.log("generateCustomerFormBuilder");

    const hobbiesCheckBoxCOntrol = this.hobbies.map(control => new FormControl(false));

    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', ],
      city: ['', ],
      state: ['', ],
      country: ['', ],
      upload: ['', ],
      hobbies: new FormArray(hobbiesCheckBoxCOntrol)
    });
  }

  onSelectedFile($event) {
    this.selectedFile = <File>$event.target.files[0];
    console.log(this.selectedFile);
  }

  submitCustomerForm() {
    console.log(this.customerForm.value);

    this.createCustomer();
  }

  // Adds Customer with Image.
  createCustomer(): void {

    const newCustomer: Customer = Object.assign({}, this.customerForm.value);
    console.log(newCustomer);

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

  // Get Hobbies text based on CheckBox selected
  private getHobbies() {
    let hobbies = "";
    console.log(this.customerForm.value.hobbies[0])

    if (this.customerForm.value.hobbies[0]) {
      hobbies = hobbies.length > 0 ? hobbies + ', Cricket' : 'Cricket';
    }
    if (this.customerForm.value.hobbies[1]) {
      hobbies = hobbies.length > 0 ? hobbies + ', Football' : 'Football';
    }
    return hobbies;
  }
}
