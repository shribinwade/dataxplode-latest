import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.authUrl;
  
  userStatus: Subject<String> = new Subject();

  constructor(private httpClient:HttpClient,private router:Router, private jwt: JwtHelperService) { }



  signup(data:any){   
    return this.httpClient.post(this.url+"/signup",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }

  forgotPassword(data:any){   
    return this.httpClient.post(this.url+"/forgotPassword",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }

  login(data:any){   
    return this.httpClient.post(this.url+"/login",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }
  
  update(data:any){
    return this.httpClient.post(this.url+"/update",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }

  changePassword(data:any){
    return this.httpClient.post(this.url+"/changePassword",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }

  checkToken(){
    return this.httpClient.get(this.url+"/checkToken");
  }

  resetPssword(data:any){    
    return this.httpClient.post(this.url+"/resetPassword",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }

  public isAuthenticated():boolean{
    const token = localStorage.getItem('token')
    if(!token){
      this.router.navigate(['home']);
      return false;
    }
    else{
      return true;
    }
  }

  public isLoggedIn():boolean{
    
    if(localStorage.getItem('token') !=null && !this.jwt.isTokenExpired()){
        return true
    }else{
      return false;
    }
  }

  public getUserInfo(): User |null{

      if(!this.isLoggedIn){
        return null;
      }else{
        let decodedToken = this.jwt.decodeToken();

        let user :User  = {
          id:decodedToken.id,
          email:decodedToken.email,
          role:decodedToken.role,
          contactNumber: decodedToken.contactNumber,
          name:decodedToken.name,
          status: decodedToken.status
        }
        return user;
      }
  }


}
