import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private isShow = new BehaviorSubject(false);
  LoadingComponent$ = this.isShow.asObservable();
  message = new BehaviorSubject("");
  message$ = this.message.asObservable();
  constructor() {}

  show(message?:string) {

    this.message.next(message||'');
    this.isShow.next(true)
  }
  close() {
    this.isShow.next(false)
  }
}
