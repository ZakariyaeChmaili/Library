import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let sessionId:string = localStorage.getItem("sessionId")||"";
    console.log("sessionID in the interceptor",sessionId)
    let headers = new HttpHeaders({"sessionId":sessionId})
    let newRequest = request.clone({headers:headers});
    return next.handle(newRequest);
  }
}
