import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = new HomePageComponent(new FormBuilder());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 2 controls', () => {
    expect(component.registerForm.contains('firstName')).toBeTruthy();
    expect(component.registerForm.contains('lastName')).toBeTruthy();
  });

  // it('should make the Name control required.', () => {
  //   let control = component.registerForm.get('firstName');
  //   control.setValue('');
  //   expect(control.valid).toBeFalsy();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

});
