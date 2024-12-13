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
  productUrl = environment.productUrl;
  competitveStrategyUrl = environment.competitiveStrategyUrl;
  competitorAnalysisUrl = environment.competitorAnalysisUrl
  marketSearchUrl = environment.marketSearchUrl
  
  constructor(private httpClient:HttpClient) { }

  //Keyword
  addKeywordData(data:any){   
    return this.httpClient.post(this.keywordUrl+"/addkeywordSearch",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }

  //Product
  addProductData(data:any){   
    return this.httpClient.post(this.productUrl+"/addProductSearch",data,{
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
    return this.httpClient.post(this.marketSearchUrl+"/addMarketSearch",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }

  //CompetitiveStrategy Url
  addCompetitiveStrategyData(data:any){
    return this.httpClient.post(this.competitveStrategyUrl+"/addCompetitiveSearch",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }

  //CompetitorAnalysis Url
  addCompetitorAnalysisData(data:any){
    return this.httpClient.post(this.competitorAnalysisUrl+"/addCompetititorAnalysisSearch",data,{
      headers:new HttpHeaders().set('content-Type','application/json')
    })
  }




}
