import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  constructor(
    private authenticationService : AuthenticationService,
    private route:Router,
    private loadinService:LoadingService,
    private toast:ToastService

    ){}

  logout(){
    this.loadinService.show("LoginOut")
    this.authenticationService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.loadinService.close();
        this.route.navigate(['/login'])
        this.toast.show("cya :(","secondary")

      },
      error: (error) => {
        console.log(error);
        this.loadinService.close();

      }
    })
  }



}
