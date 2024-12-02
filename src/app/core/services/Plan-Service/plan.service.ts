import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  url = environment.planUrl;

  constructor(private httpClient:HttpClient,private router:Router, private jwt: JwtHelperService) { }
  
  getAllPlan(){   
    return this.httpClient.get(this.url+"/allplans");
  }
  
}
