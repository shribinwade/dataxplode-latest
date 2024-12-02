import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SaveServiceDataService {

  url = environment.keywordUrl;
  
  constructor(private httpClient:HttpClient) { }

  addKeywordData(data:any){   
    return this.httpClient.post(this.url+"/addkeywordSearch",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }
  
}
