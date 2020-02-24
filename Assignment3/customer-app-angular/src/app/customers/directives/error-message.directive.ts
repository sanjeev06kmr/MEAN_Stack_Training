import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appErrorMessage]'
})
export class ErrorMessageDirective {

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    // Using this directive in Form Validation Error MEssage in Customer-Form
    renderer.setStyle(
      elementRef.nativeElement,
      'color',
      "red"
    );

    renderer.setStyle(
      elementRef.nativeElement,
      'padding-left',
      '50px'
    );
  }

}
