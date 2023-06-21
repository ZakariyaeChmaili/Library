import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private isShow = new BehaviorSubject(false);
  LoadingComponent$ = this.isShow.asObservable();
  message = new BehaviorSubject("");
  type = new BehaviorSubject("primary");
  type$ = this.type.asObservable();
  message$ = this.message.asObservable();
  constructor() {}

  show(message?:string,type?:string) {

    this.message.next(message||'');
    this.type.next(type||'primary');
    this.isShow.next(true)
  }
  close() {
    this.isShow.next(false)
  }
}
