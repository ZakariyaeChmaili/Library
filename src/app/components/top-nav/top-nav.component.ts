import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  constructor(
    private authenticationService : AuthenticationService,
    private route:Router,
    private loadinService:LoadingService

    ){}

  logout(){
    this.loadinService.show("LoginOut")
    this.authenticationService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.loadinService.close();
        this.route.navigate(['/login'])

      },
      error: (error) => {
        console.log(error);
        this.loadinService.close();

      }
    })
  }



}
