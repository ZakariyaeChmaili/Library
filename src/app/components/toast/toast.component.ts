import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {


  isShow$!:Observable<boolean>; // Initialize the loading state flag
  message$!:Observable<string>;
  constructor(private toastService:ToastService){

    this.isShow$=this.toastService.LoadingComponent$;
    this.message$ = this.toastService.message$;
  }
}
