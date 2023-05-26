import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/env';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private url: string = env.url;
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    let user = {
      username: username,
      password: password,
    };
    console.log(user);
    return this.http.post(`${this.url}authentication/login`, user);
  }

  signup(user:any) {
    return this.http.post(`${this.url}authentication/signup`, user);
  }

  logout() {
    return this.http.post(`${this.url}authentication/logout`, {});
  }


}
