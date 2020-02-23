import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer.model';

@Pipe({
  name: 'customerFilter'
})
export class customerFilter implements PipeTransform {

  constructor() { }
  transform(customer:Customer[], searchTerm:string): Customer[] {
    if(!customer || !searchTerm)
    return customer;

    return customer.filter(customer=>
      customer.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }

}