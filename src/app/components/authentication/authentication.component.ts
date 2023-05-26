import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component,OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  username:string="";
  password:string="";
  constructor(
    private authenticationService : AuthenticationService,
    private route:Router,
    private loadinService:LoadingService,
    private toastService:ToastService

    ){}
  ngOnInit(): void {

  }


  login(){
    console.log(this.username);
    this.loadinService.show("Login...")
    this.authenticationService.login(this.username,this.password).subscribe({
      next: (data:any) => {
        console.log(data);
        this.loadinService.close();
        if(data){
          localStorage.setItem("user",JSON.stringify(data))
          localStorage.setItem("sessionId",data.sessionId);
          this.route.navigate(["home"])
        }
      },
      error: (error) => {
        console.log("inside error in authentication");
        this.loadinService.close();

        this.toastService.show("test");


      }
    })
  }


signup(){
  this.loadinService.show("Creating Account...")

  this.authenticationService.signup({username:this.username,password:this.password}).subscribe({
    next:data=>{
      console.log(data)
      this.loadinService.close();

    },
    error:err=>{
      console.log(err)
      this.loadinService.close();


    }
  })
}
}
