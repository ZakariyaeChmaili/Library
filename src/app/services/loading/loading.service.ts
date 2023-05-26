import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
 private isLoading = new BehaviorSubject(false);
  LoadingComponent$ = this.isLoading.asObservable();
  message = new BehaviorSubject("");
  message$ = this.message.asObservable();
  constructor() {}

  show(message?:string) {

    this.message.next(message||'');
    this.isLoading.next(true)
  }
  close() {
    this.isLoading.next(false)
  }
}
