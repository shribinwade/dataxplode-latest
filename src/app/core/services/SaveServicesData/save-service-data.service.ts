import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SaveServiceDataService {

  url = environment.keywordUrl;
  distributorUrl = environment.distributorUrl;
  keywordUrl = environment.keywordUrl;
  
  constructor(private httpClient:HttpClient) { }

  //Keyword
  addKeywordData(data:any){   
    return this.httpClient.post(this.keywordUrl+"/addkeywordSearch",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }

  //Product
  addProductData(data:any){   
    return this.httpClient.post(this.url+"/addproductSearch",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }


  //Distributor Url
  addDistributorData(data:any){
    return this.httpClient.post(this.distributorUrl+"/addDistributorSearch",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }

  //Market Url
  addMarketData(data:any){
    return this.httpClient.post(this.url+"/addmarketSearch",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }

  
}
