import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RetriveDBDataURLService {

  constructor(private authService:AuthService) { }

  apiurl: string = environment.apiUrl;

 private storeUrls = [
  
    //competitorAnalyzer
    `${this.apiurl}/get_CompetitorAnalyzer`,  //0
    `${this.apiurl}/get_amazon_info_reviews`, //1
    //keyword
    `${this.apiurl}/get_amazon_keyword_details`,//2
    //Market Search
    `${this.apiurl}/get_brand_details`,//3
    `${this.apiurl}/get_search_brand_details`,//4
    `${this.apiurl}/get_data_IP`,//5
    `${this.apiurl}/get_amazon_info_details`,//6
    //Distributor
    `${this.apiurl}/get_supplier`,//7
    `${this.apiurl}/get_swot_analyzer`,//8
    `${this.apiurl}/get_porterforces`,//9
    `${this.apiurl}/get_reviewAnalyzer`,//10
  ];


  
    getDBURL(request:HttpRequest<any>) :string {
    debugger
    const userId = this.authService.getUserInfo()?.id;
    const formData: FormData = request.body as FormData;
    const searchQuery = formData.get('query1') as string;
    const countryQuery = formData.get('query2') as string;


    const userID =  userId || '';
    const country = countryQuery || '';
    const searchServiceQuery = searchQuery || '';

    for (let i = 0; i < this.storeUrls.length; i++) {
      if (request.url.includes(this.storeUrls[2])) {
        return `http://localhost:8081/keywordSearch/getKeywordData?UserID=${userID}&country=${country}&keyword=${searchServiceQuery}`;
      }
      //Distributor
      else if(request.url.includes(this.storeUrls[7])){
        return `http://localhost:8081/distributorSearch/getDistributorData?UserID=${userID}&country=${country}&Distributor=${searchServiceQuery}`;
      }
      //competitive stratergy
      else if(request.url.includes(this.storeUrls[9])){
        return `http://localhost:8081/competitiveSearch/getCompetitiveSearch?UserID=${userID}&country=${country}&competitive=${searchServiceQuery}`;
      }
      //competitor Analysis
      else if(request.url.includes(this.storeUrls[0])){
        const countryQuery = formData.get('query4') as string;
        return `http://localhost:8081/competititorAnalysisSearch/getCompetitorAnalysisSearch?UserID=${userID}&country=${countryQuery}&competitor=${searchServiceQuery}`;
      }
      //Market Search
      else if(request.url.includes(this.storeUrls[3])){
        return `http://localhost:8081/marketSearch/getMarketData?UserID=${userID}&country=${countryQuery}&market=${searchServiceQuery}`;
      }
    };
    return ""
  }



}
