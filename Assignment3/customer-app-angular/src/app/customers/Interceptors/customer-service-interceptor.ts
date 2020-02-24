import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceInterceptor
 implements HttpInterceptor{

    private handleError(errorResponse:HttpErrorResponse){
        if(errorResponse.error instanceof ErrorEvent)
        {
          console.error("Client Side Error: "+errorResponse.error);
        }
        else{
          console.error("Server Side Error: "+errorResponse);
        }
    
        return throwError('Error Occured. Captured in Intercepor!!');
      }
      
    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>
    {
        const headers= new Headers({'Content-Type':'application/json'});
        var clone;

        // Adding Header for all request with Interceptors.
        // As we are sending Post Request as FormBody, 
        // We dont have to set 'Content-Type' in that case.
        // ALos, For GET we are not sending any content-type.
        // So sending header fpr all but POST & GET.
        if(req.method.toString().toUpperCase()=="POST" || 
        req.method.toString().toUpperCase()=="GET"){
            clone = req.clone({});
        }
        else{
            clone = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
        }

        return next.handle(clone)
        .pipe(catchError(this.handleError));
    }

    
}