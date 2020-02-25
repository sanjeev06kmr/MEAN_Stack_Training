import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { CustomerService } from './customer.service';
import { Customer } from '../models/customer.model';

describe('CustomerService', () => {
  let service: CustomerService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });

    afterEach(()=>{
      httpMock.verify
    });
	
service = TestBed.get(CustomerService);
    httpMock = TestBed.get(HttpTestingController);

    it('should be get data using GET', () => {
      const dummy: Customer[] = [
        {
          "_id": "5e51fc4f83e2914e0ca582dd",
          "name": "Mamta Kumari",
          "gender": "female",
          "email": "mamta.kumari@gmail.com",
          "address": "Baner",
          "city": "Pune",
          "state": "Maharashtra",
          "country": "India",
          "hobbies": "Football",
          "imageUrl": ""
        },
        {
          "_id": "5e51fc7283e2914e0ca582de",
          "name": "Mamta Kumari",
          "gender": "female",
          "email": "mamta.kumari@gmail.com",
          "address": "Baner",
          "city": "Pune",
          "state": "Maharashtra",
          "country": "India",
          "hobbies": "Football",
          "imageUrl": ""
        }
      ]

      service.getCustomer().subscribe(customers=>{
        expect(customers.length).toBe(2);
        expect(customers).toEqual(dummy);
      });

      const request = httpMock.expectOne ('http://localhost:3000/customer' );
      expect(request.request.method).toBe('GET');

      //request.flush(dummy);
    });

    it('should be get data using GET', () => {
      const dummy: Customer[] = [
        {
          "_id": "5e51fc4f83e2914e0ca582dd",
          "name": "Mamta Kumari",
          "gender": "female",
          "email": "mamta.kumari@gmail.com",
          "address": "Baner",
          "city": "Pune",
          "state": "Maharashtra",
          "country": "India",
          "hobbies": "Football",
          "imageUrl": ""
        },
        {
          "_id": "5e51fc7283e2914e0ca582de",
          "name": "Mamta Kumari",
          "gender": "female",
          "email": "mamta.kumari@gmail.com",
          "address": "Baner",
          "city": "Pune",
          "state": "Maharashtra",
          "country": "India",
          "hobbies": "Football",
          "imageUrl": ""
        }
      ]

      service.getCustomerById('5e51fc7283e2914e0ca582de').subscribe(customers=>{
        expect(customers.length).toBe(1);
        expect(customers).toEqual(dummy);
      });

      const request = httpMock.expectOne ('http://localhost:3000/customer' );
      expect(request.request.method).toBe('GET');

      request.flush(dummy);
    });


    
  });
})
