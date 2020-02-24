
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [CustomerService]
})
export class CustomersComponent implements OnInit {
  displayMode: number = 1;
  customer: Customer[] = [];
  defaultMessage: string = "Loading Customer List....";

  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  // Loads Customer List on INIT
  ngOnInit() {
    this.customerService.getCustomer().subscribe(
      response => {
        console.log(response);
        this.customer = response.result;
      },
      error => {
        this.defaultMessage ="Error Occured while fetching Customer List.";
        console.log('Error from Service:', error)
      }
    );
  }

  // Checks if any customer exists or not.
  checkIfCustomerExist() {
    console.log(this.customer);
    if (this.customer! = undefined && this.customer.length > 0) {
      console.log('customer>0');
      return true;
    }
    else {      
      this.defaultMessage ="No Customer exits. Please Add using Create Customer";
      return false;
    }
  }

  // Toggles between Card View and List View
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }

  // Navigate to Edit Customer Page.
  onEdit($event): void {
    console.log($event.target.getAttribute('custId'));

    let customerId = $event.target.getAttribute('custId');
    this.router.navigate(['customers/editCustomer', customerId]);
  }

  // Deletes User by calling service and 
  // Updates Customer object to reflect the same on screen.
  onDelete($event): void {
    let customerId = $event.target.getAttribute('custId');
    console.log(customerId);

    this.customerService.deleteCustomer(customerId).subscribe(
      response => {
        console.log(response);
      },
      error => console.log('Error from Service:', error)
    );

    // Refresh Customer object after deletion.
    const item = this.customer.find(item => item._id === customerId);
    console.log(this.customer.length);
    this.customer.splice(this.customer.indexOf(item), 1);
    console.log(this.customer.length);
  }
}
