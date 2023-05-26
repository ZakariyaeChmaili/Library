import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  isLoading$!:Observable<boolean>; // Initialize the loading state flag
  message$!:Observable<string>;
  constructor(private loadingService:LoadingService){

    this.isLoading$=this.loadingService.LoadingComponent$;
    this.message$ = this.loadingService.message$;
  }



}
