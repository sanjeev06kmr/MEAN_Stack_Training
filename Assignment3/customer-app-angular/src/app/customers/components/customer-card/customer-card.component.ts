import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent implements OnInit {

  @Output() notifyEdit: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyDelete: EventEmitter<string> = new EventEmitter<string>();
  @Input('customer') customer: Customer[] = [];
  constructor() { }

  ngOnInit() {
  }

  onEditChild($event): void {
    console.log($event.target);

    let customerId = $event.target.getAttribute('custId');

    // Calling EDIT in Parent Component as Parent component calls customer service
    // We can call customer service from here as well, 
    // but we have 2 views, CARD and VIEW
    // So, This EDIT method will be duplicated in both CARD and LIST component.
    // That is why kept EDIT Logic in Parent only and child will just pass data to parent.
    this.notifyEdit.emit(customerId);
  }

  // Deletes User by calling service and 
  // Updates Customer object to reflect the same on screen.
  onDeleteChild($event): void {
    console.log($event.target);

    let customerId = $event.target.getAttribute('custId');

    // Calling Delete in Parent Component as Parent component calls customer service
    // We can call customer service from here as well, 
    // but we have 2 views, CARD and VIEW
    // So, This DELETE method will be duplicated in both CARD and LIST component.
    // That is why kept delete Logic in Parent only and child will just pass data to parent.
    this.notifyDelete.emit(customerId);

  }

}
