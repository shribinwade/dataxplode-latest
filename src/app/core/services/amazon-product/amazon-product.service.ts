import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HTTPService } from '../http-service/http.service';
import { API_ENDPOINTS } from '../../model/api-endpoints';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AmazonProductService {


  // constructor(private httpClient: HttpClient) { }

  constructor(private httpService:HTTPService){

  }


  contextUrl= environment.apiUrl;

// +++++++++++++++++++++++++++++++++++++++++++product ASIN Search +++++++++++++++++++++++++++++++++++++++++++++  

  amazon_product_asin_search(data: any): Observable<any> {
    const requestData = {
      country: data.country,
      productSearchQuery: data.productSearchQuery,
      keywordSearchQuery: "",
      marketSearchQuery: "",
      pincode: data.pincode
    };
    return this.httpService.post(this.contextUrl + API_ENDPOINTS.AMAZON_PRODUCT_ASIN_SEARCH, requestData );
  }

  amazon_product_reviews(data: any): Observable<any> {
    const requestData = {
      country: data.country,
      productSearchQuery: data.productSearchQuery,
      keywordSearchQuery: "",
      marketSearchQuery: "",
      pincode: ""
    };
    return this.httpService.post(this.contextUrl + API_ENDPOINTS.AMAZON_PRODUCT_REVIEWS, requestData);
  }


//+++++++++++++++++++++++++++++++++++++++++++++product keyword Search++++++++++++++++++++++++++++++++++++++++++++++++
  amazon_product_keyword_search(data: any): Observable<any> {
    const requestData = {
      country: data.country,
      productSearchQuery: "",
      keywordSearchQuery: data.keywordSearchQuery,
      marketSearchQuery: "",
      pincode: ""
    };
    return this.httpService.post(this.contextUrl + API_ENDPOINTS.AMAZON_PRODUCT_KEYWORD_SEARCH, requestData);
  }


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++market search++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
  market_search(data: any): Observable<any> {
    const requestData = {
      country: data.country,
      productSearchQuery: "",
      keywordSearchQuery: "",
      marketSearchQuery: data.marketSearchQuery,
      pincode: ""
    };
    return this.httpService.post(this.contextUrl + API_ENDPOINTS.MARKET_SEARCH, requestData);
  }

  //market news
  market_news_search(data: any): Observable<any> {
    return this.httpService.post(this.contextUrl + API_ENDPOINTS.MARKET_NEWS_SEARCH, data);
  }

  //market patent Search
  market_patent_search(data:any):Observable<any>{

  const requestData = {
    summary: data.patent_number,
    title:data.title,
    keyword: data.keyword
  };

    return this.httpService.post(this.contextUrl + API_ENDPOINTS.MARKET_PATENT_SEARCH,data)
  }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++distributor search++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
  distributor_search(data:any):Observable<any>{

    const requestData = {
      country: data.country,
      distributorSearchQuery: data.distributorSearchQuery,
    };
  
      return this.httpService.post(this.contextUrl + API_ENDPOINTS.DISTRIBUTOR_SEARCH,requestData)
  }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++competitve stratergy search +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  competitve_stratergy_search(data:any):Observable<any>{
    const requestData = {
      country: data.country,
      competitiveSearchQuery: data.competitiveSearchQuery,
    };
      return this.httpService.post(this.contextUrl + API_ENDPOINTS.COMPETITIVE_STRATERGY_SEARCH,requestData)
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
  competitor_analysis_search(data:any,country:string):Observable<any>{
    

    if(data.Keyword !=='' && data.Brand !=='' && data.features.length != 0 ){

      const requestData = {
        CompetitorAnalysisKeyword: data.Keyword,
        CompetitorAnalysisBrand: data.Brand,
        CompetitorAnalysisFeatures: data.features[0].feature,
        CompetitorAnalysisCountry: country,
      };
        return this.httpService.post(this.contextUrl + API_ENDPOINTS.COMPETITOR_ANALYZER_SEARCH,requestData)

    }
    return this.httpService.post(this.contextUrl + API_ENDPOINTS.COMPETITOR_ANALYZER_SEARCH,data);

  }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Post_get_swot_analyzer(data: any):Observable<any> {
    debugger
    const requestData = {
      product_owned: data[0],
      competitor_product: JSON.stringify(data[data.length - 1].Search_result),
    };
    
    // console.log(data);
    // console.log(requestData);
    // console.log(requestData.product_owned);
    // console.log(requestData.competitor_product);
    
    // console.log(JSON.stringify((requestData.competitor_product[0].Search_result)));
    // console.log(requestData.product_owned.Search_result);
    return this.httpService.post(this.contextUrl + API_ENDPOINTS.SWOT_ANALYZER,requestData);
  }

  Review_Analysis_Chart(data: any):Observable<any> {

    const requestData = {
        chartData: data 
    }
  
    
    return this.httpService.post(this.contextUrl + API_ENDPOINTS.REVIEW_ANALYZER,requestData);
  }
  
}
